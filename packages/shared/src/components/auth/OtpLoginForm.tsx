import {
  Activity,
  type ChangeEventHandler,
  type SubmitEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import { Spinner } from "@carveri/shared/components/ui/spinner";
import { auth } from "@carveri/shared/lib/auth.ts";
import { mockRequestOtp } from "@carveri/shared/data/mockAuth.ts";
import { cn } from "@carveri/shared/lib/utils.ts";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@carveri/shared/components/ui/field.tsx";
import { register, sendOTP, verifyOTP } from "@carveri/shared/data/api.ts";

const RESEND_COOLDOWN_SECONDS = 180;
const MAX_RESEND_ATTEMPTS = 5;
const EMPTY_DIGITS = new Array(8).fill("") as string[];

type OtpMethod = "email" | "phone";
type Stage = "method" | "contact" | "code";

function formatUsPhone(raw: string): string {
  const digits = raw.replace(/(\+1)/, "").replaceAll(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `+1 (${digits}`;
  if (digits.length <= 6)
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function OtpLoginForm() {
  const { t, i18n } = useTranslation("common");
  const lang = i18n.resolvedLanguage ?? "en";
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("method");
  const [method, setMethod] = useState<OtpMethod>("email");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [digits, setDigits] = useState<string[]>([...EMPTY_DIGITS]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendSecondsLeft, setResendSecondsLeft] = useState(0);
  const [resendAttemptsUsed, setResendAttemptsUsed] = useState(0);

  const digitRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(8).fill(null),
  );

  // Countdown timer — setState inside setInterval callback, not synchronously
  useEffect(() => {
    if (resendSecondsLeft <= 0) return;
    const id = setInterval(() => {
      setResendSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [resendSecondsLeft]);

  function goToMethod() {
    setStage("method");
    setContact("");
    setDigits([...EMPTY_DIGITS]);
    setError(null);
    setResendSecondsLeft(0);
    setResendAttemptsUsed(0);
  }

  async function handleVerify(code: string) {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);
    try {
      const result = await verifyOTP({
        code,
        ...(method === "email" ? { email: contact } : { phoneNumber: contact }),
      });
      if (!result.succeeded || !result.data.isSuccess) {
        const msg = t("auth.otpErrorInvalidCode");
        setError(msg);
        setDigits([...EMPTY_DIGITS]);
        digitRefs.current[0]?.focus();
        return;
      }
      auth.setToken(result.data.token);
      navigate("/dashboard");
    } catch {
      setError(t("auth.otpErrorConnection"));
      setDigits([...EMPTY_DIGITS]);
      digitRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    const nextAttempts = resendAttemptsUsed + 1;
    if (nextAttempts > MAX_RESEND_ATTEMPTS) {
      goToMethod();
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await mockRequestOtp(method, contact);
      setResendAttemptsUsed(nextAttempts);
      setResendSecondsLeft(RESEND_COOLDOWN_SECONDS);
      setDigits([...EMPTY_DIGITS]);
      digitRefs.current[0]?.focus();
    } catch {
      setError(t("auth.otpErrorConnection"));
    } finally {
      setIsLoading(false);
    }
  }

  function handleDigitInput(index: number, value: string) {
    const digit = value.replaceAll(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < 7) {
      digitRefs.current[index + 1]?.focus();
    }
    if (digit && index === 7) {
      void handleVerify(next.join(""));
    }
  }

  function handleDigitKeyDown(index: number, key: string) {
    if (key === "Backspace" && digits[index] === "" && index > 0) {
      digitRefs.current[index - 1]?.focus();
    }
  }

  function handleDigitPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replaceAll(/\D/g, "")
      .slice(0, 8);
    if (!pasted) return;
    const next = [...EMPTY_DIGITS];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);
    const focusIndex = Math.min(pasted.length, 7);
    digitRefs.current[focusIndex]?.focus();
    if (pasted.length === 8) {
      void handleVerify(next.join(""));
    }
  }

  // ── Method stage ──────────────────────────────────────────────────────────

  if (stage === "method") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-extrabold">{t("auth.otpMethodTitle")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("auth.otpMethodSubtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setMethod("email");
              setStage("contact");
            }}
            className="border-border flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-colors hover:border-[#042CD7]"
          >
            <span className="text-2xl">✉️</span>
            <div>
              <p className="font-semibold">{t("auth.otpMethodEmail")}</p>
              <p className="text-muted-foreground text-xs">
                {t("auth.otpContactSubtitleEmail")}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setMethod("phone");
              setStage("contact");
            }}
            className="border-border flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-colors hover:border-[#042CD7]"
          >
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-semibold">{t("auth.otpMethodPhone")}</p>
              <p className="text-muted-foreground text-xs">
                {t("auth.otpContactSubtitlePhone")}
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ── Contact stage ─────────────────────────────────────────────────────────

  if (stage === "contact") {
    const isEmail = method === "email";
    const title = isEmail
      ? t("auth.otpContactTitleEmail")
      : t("auth.otpContactTitlePhone");
    const subtitle = isEmail
      ? t("auth.otpContactSubtitleEmail")
      : t("auth.otpContactSubtitlePhone");
    const placeholder = isEmail
      ? t("auth.otpContactPlaceholderEmail")
      : t("auth.otpContactPlaceholderPhone");

    const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = ({
      currentTarget: { value },
    }) => {
      setFirstName(value);
    };

    const handleMiddleNameChange: ChangeEventHandler<HTMLInputElement> = ({
      currentTarget: { value },
    }) => {
      setMiddleName(value);
    };

    const handleLastNameChange: ChangeEventHandler<HTMLInputElement> = ({
      currentTarget: { value },
    }) => {
      setLastName(value);
    };

    function handleContactChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (isEmail) {
        setContact(e.target.value);
      } else {
        setContact(formatUsPhone(e.target.value));
      }
    }

    const handleContactSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      if (!contact.trim()) return;

      setIsLoading(true);
      (async () => {
        const resp = await register({
          name: firstName,
          lastName,
          middleName,
          ...(isEmail ? { email: contact } : { phoneNumber: contact }),
        });
        if (resp.succeeded) {
          const otpSent = await sendOTP({
            language: lang,
            ...(isEmail ? { email: contact } : { phoneNumber: contact }),
          });
          if (!otpSent.data.isSuccess) {
            setStage("code");
          }
        }
        setIsLoading(false);
      })();
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-extrabold">{title}</h1>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>

        <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
          {error && (
            <p
              role="alert"
              className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="auth.first_name">
                  {t("auth.first_name")}
                </FieldLabel>
                <Input
                  id="auth.first_name"
                  name="name"
                  placeholder="John"
                  type="text"
                  autoFocus
                  autoComplete="given-name name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="auth.middle_name">
                  {t("auth.middle_name")}
                </FieldLabel>
                <Input
                  id="auth.middle_name"
                  name="middleName"
                  placeholder="John"
                  type="text"
                  autoFocus
                  autoComplete="additional-name name"
                  value={middleName}
                  onChange={handleMiddleNameChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="auth.last_name">
                  {t("auth.last_name")}
                </FieldLabel>
                <Input
                  id="auth.last_name"
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  autoFocus
                  autoComplete="family-name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact">
              {isEmail ? t("auth.otpMethodEmail") : t("auth.otpMethodPhone")}
            </Label>
            <Input
              id="contact"
              name="contact"
              type={isEmail ? "email" : "tel"}
              placeholder={placeholder}
              value={contact}
              onChange={handleContactChange}
              autoComplete={isEmail ? "email" : "tel"}
              required
            />
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
            <Activity mode={isLoading ? "visible" : "hidden"}>
              <Spinner />
            </Activity>
            {t("auth.otpContactSend")}
          </Button>
        </form>

        <button
          type="button"
          onClick={goToMethod}
          className="text-muted-foreground hover:text-foreground text-center text-sm transition-colors"
        >
          ← {t("auth.back")}
        </button>
      </div>
    );
  }

  // ── Code stage ────────────────────────────────────────────────────────────

  const canResend = resendSecondsLeft === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold">{t("auth.otpCodeTitle")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("auth.otpCodeSubtitle", { contact })}
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <div className="flex gap-2">
        {digits.map((digit, i) => (
          <input
            key={`${digit}::${i}`}
            ref={(el) => {
              digitRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={isLoading}
            onChange={(e) => handleDigitInput(i, e.target.value)}
            onKeyDown={(e) => handleDigitKeyDown(i, e.key)}
            onPaste={i === 0 ? handleDigitPaste : undefined}
            className={cn(
              "h-12 w-full rounded-lg border text-center text-lg font-bold transition-colors",
              "focus:border-[#042CD7] focus:ring-2 focus:ring-[#042CD7]/20 focus:outline-none",
              digit ? "border-[#042CD7]" : "border-border",
              isLoading && "opacity-50",
            )}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {isLoading && (
        <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
          <Spinner />
          <span>{t("auth.otpVerifying")}</span>
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        {canResend ? (
          <button
            type="button"
            onClick={() => void handleResend()}
            disabled={isLoading}
            className="text-sm font-semibold text-[#042CD7] hover:underline disabled:opacity-50"
          >
            {t("auth.otpCodeResend")}
          </button>
        ) : (
          <p className="text-muted-foreground text-sm">
            {t("auth.otpCodeResendIn", { seconds: resendSecondsLeft })}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setStage("contact")}
        className="text-muted-foreground hover:text-foreground text-center text-sm transition-colors"
      >
        ← {t("auth.back")}
      </button>
    </div>
  );
}
