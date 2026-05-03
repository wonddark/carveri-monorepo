import { Activity, useState } from "react";
import type { Control } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import {
  IconCheck,
  IconChevronLeft,
  IconCreditCard,
  IconLoader2,
  IconShoppingBag,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@carveri/shared/components/ui/field.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import type {
  CheckoutLoaderData,
  CheckoutPlan,
} from "@carveri/shared/types/dashboard.ts";

// ─── Form schema ──────────────────────────────────────────────────────────────

type CheckoutFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cardCvv: string;
};

const schema: yup.ObjectSchema<CheckoutFormValues> = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("ZIP code is required"),
  country: yup.string().required("Country is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .test("len", "Enter a valid 16-digit card number", (val) => {
      return (val ?? "").replaceAll(/\s/g, "").length === 16;
    }),
  cardHolder: yup.string().required("Cardholder name is required"),
  cardExpiry: yup
    .string()
    .required("Expiry date is required")
    .matches(/^\d{2}\/\d{2}$/, "Enter expiry as MM/YY"),
  cardCvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "Enter a 3 or 4 digit CVV"),
});

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  const { t } = useTranslation("common");
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
          <IconCheck className="size-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-xl font-bold">{t("checkout.success.title")}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t("checkout.success.description")}
        </p>
        <Button asChild className="mt-6">
          <Link to="/dashboard">{t("checkout.success.cta")}</Link>
        </Button>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

type SectionCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

function SectionCard(props: Readonly<SectionCardProps>) {
  const { title, subtitle, children } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// ─── Plan picker ──────────────────────────────────────────────────────────────

type PlanPickerProps = {
  plans: CheckoutPlan[];
  selected: CheckoutPlan;
  onSelect: (p: CheckoutPlan) => void;
};

function PlanPicker(props: Readonly<PlanPickerProps>) {
  const { plans, selected, onSelect } = props;
  const { t } = useTranslation("common");
  return (
    <SectionCard
      title={t("checkout.plans.title")}
      subtitle={t("checkout.plans.subtitle")}
    >
      <div className="grid grid-cols-3 gap-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan)}
            className={cn(
              "rounded-xl border-2 p-4 text-left transition-all",
              selected.id === plan.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40",
            )}
          >
            <p className="text-muted-foreground text-[13px] font-semibold">
              {plan.name}
            </p>
            <p className="mt-1 text-2xl font-black">{plan.price}</p>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Shared field renderer ────────────────────────────────────────────────────

function renderField(
  control: Control<CheckoutFormValues>,
  name: keyof CheckoutFormValues,
  label: string,
  options?: { type?: string; colSpan?: boolean; readOnly?: boolean },
) {
  return (
    <Controller
      key={name}
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <Field
          data-invalid={invalid}
          className={options?.colSpan ? "col-span-2" : undefined}
        >
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            id={field.name}
            type={options?.type ?? "text"}
            aria-invalid={invalid}
            readOnly={options?.readOnly}
            className={
              options?.readOnly ? "cursor-not-allowed opacity-60" : undefined
            }
            {...field}
          />
          <Activity mode={invalid ? "visible" : "hidden"}>
            <FieldError errors={[error]} />
          </Activity>
        </Field>
      )}
    />
  );
}

// ─── Billing section ──────────────────────────────────────────────────────────

type FormSectionProps = { control: Control<CheckoutFormValues> };

function BillingSection(props: Readonly<FormSectionProps>) {
  const { control } = props;
  const { t } = useTranslation("common");

  return (
    <SectionCard
      title={t("checkout.billing.title")}
      subtitle={t("checkout.billing.subtitle")}
    >
      <div className="grid grid-cols-2 gap-4">
        {renderField(control, "name", t("checkout.billing.name"), {
          colSpan: true,
        })}
        {renderField(control, "email", t("checkout.billing.email"), {
          type: "email",
          readOnly: true,
        })}
        {renderField(control, "phone", t("checkout.billing.phone"), {
          type: "tel",
        })}
        {renderField(control, "address", t("checkout.billing.address"), {
          colSpan: true,
        })}
        {renderField(control, "city", t("checkout.billing.city"))}
        {renderField(control, "state", t("checkout.billing.state"))}
        {renderField(control, "zip", t("checkout.billing.zip"))}
        {renderField(control, "country", t("checkout.billing.country"))}
      </div>
    </SectionCard>
  );
}

// ─── Card input section ───────────────────────────────────────────────────────

function CardInputSection(props: Readonly<FormSectionProps>) {
  const { control } = props;
  const { t } = useTranslation("common");

  return (
    <SectionCard
      title={t("checkout.payment.title")}
      subtitle={t("checkout.payment.subtitle")}
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Card number */}
        <Controller
          control={control}
          name="cardNumber"
          render={({ field, fieldState: { invalid, error } }) => (
            <Field data-invalid={invalid} className="col-span-2">
              <FieldLabel htmlFor="cardNumber">
                {t("checkout.payment.cardNumber")}
              </FieldLabel>
              <div className="relative">
                <Input
                  id="cardNumber"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  aria-invalid={invalid}
                  value={field.value}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replaceAll(/\D/g, "")
                      .slice(0, 16);
                    field.onChange(digits.replaceAll(/(.{4})/g, "$1 ").trim());
                  }}
                />
                <IconCreditCard className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
              </div>
              <Activity mode={invalid ? "visible" : "hidden"}>
                <FieldError errors={[error]} />
              </Activity>
            </Field>
          )}
        />

        {/* Expiry */}
        <Controller
          control={control}
          name="cardExpiry"
          render={({ field, fieldState: { invalid, error } }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor="cardExpiry">
                {t("checkout.payment.expiry")}
              </FieldLabel>
              <Input
                id="cardExpiry"
                inputMode="numeric"
                placeholder="MM/YY"
                maxLength={5}
                aria-invalid={invalid}
                value={field.value}
                ref={field.ref}
                onBlur={field.onBlur}
                onChange={(e) => {
                  const raw = e.target.value;
                  const digits = raw.replaceAll(/\D/g, "").slice(0, 4);
                  let formatted: string;
                  if (digits.length > 2) {
                    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
                  } else if (digits.length === 2 && raw.endsWith("/")) {
                    formatted = raw;
                  } else {
                    formatted = digits;
                  }
                  field.onChange(formatted);
                }}
              />
              <Activity mode={invalid ? "visible" : "hidden"}>
                <FieldError errors={[error]} />
              </Activity>
            </Field>
          )}
        />

        {/* CVV */}
        {renderField(control, "cardCvv", t("checkout.payment.cvv"), {
          type: "password",
        })}
      </div>
    </SectionCard>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { plans, billing } = useLoaderData<CheckoutLoaderData>();
  const { t } = useTranslation("common");

  const [selectedPlan, setSelectedPlan] = useState<CheckoutPlan>(plans[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit } = useForm<CheckoutFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: billing.name,
      email: billing.email,
      phone: billing.phone,
      address: billing.address,
      city: billing.city,
      state: billing.state,
      zip: billing.zip,
      country: billing.country,
      cardNumber: "",
      cardHolder: "",
      cardExpiry: "",
      cardCvv: "",
    },
  });

  function onSubmit(_data: CheckoutFormValues) {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
    console.log(_data);
  }

  if (submitted) return <SuccessScreen />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Header */}
      <header className="border-border/60 bg-card/95 fixed inset-x-0 top-0 z-20 h-14 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4 lg:px-5">
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-[13px] transition-colors"
          >
            <IconChevronLeft className="size-4" />
            <span className="hidden sm:inline">
              {t("checkout.header.back")}
            </span>
          </Link>

          <LogoFullHorizontal className="h-7 w-auto" />

          <div className="flex items-center gap-1.5">
            <LanguageToggle variant="default" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="dark:bg-background min-h-screen bg-slate-50/70 pt-14">
        <div className="mx-auto max-w-3xl space-y-5 px-5 py-8">
          <PlanPicker
            plans={plans}
            selected={selectedPlan}
            onSelect={setSelectedPlan}
          />

          <BillingSection control={control} />

          <CardInputSection control={control} />

          {/* Order summary + actions */}
          <div className="bg-card ring-foreground/10 flex items-center justify-between rounded-xl border px-5 py-4 ring-1">
            <div>
              <p className="text-muted-foreground text-xs">
                {t("checkout.total")}
              </p>
              <p className="text-xl font-black">{selectedPlan.price}</p>
              <p className="text-muted-foreground text-xs">
                {selectedPlan.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" size="lg" asChild>
                <Link to="/dashboard">{t("checkout.cancel")}</Link>
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="gap-2"
              >
                {submitting ? (
                  <IconLoader2 className="size-4 animate-spin" />
                ) : (
                  <IconShoppingBag className="size-4" />
                )}
                {submitting ? t("checkout.processing") : t("checkout.submit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
