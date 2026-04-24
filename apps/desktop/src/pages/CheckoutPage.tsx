import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { IconCheck, IconChevronLeft, IconShoppingBag } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import { Label } from "@carveri/shared/components/ui/label.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@carveri/shared/components/ui/card.tsx";
import type {
  BillingInfo,
  CardBrand,
  CheckoutLoaderData,
  CheckoutPlan,
  SavedCard,
} from "@carveri/shared/types/dashboard.ts";

// ─── Card brand display ───────────────────────────────────────────────────────

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: "VISA",
  mastercard: "MC",
  amex: "AMEX",
};

const BRAND_CLASS: Record<CardBrand, string> = {
  visa: "bg-blue-600 text-white",
  mastercard: "bg-gradient-to-r from-red-500 to-orange-400 text-white",
  amex: "bg-blue-700 text-white",
};

function CardBrandBadge({ brand }: { brand: CardBrand }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-black tracking-wider",
        BRAND_CLASS[brand],
      )}
    >
      {BRAND_LABEL[brand]}
    </span>
  );
}

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

// ─── Section wrapper ─────────────────────────────────────────────────────────

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
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

// ─── Plan picker ─────────────────────────────────────────────────────────────

function PlanPicker({
  plans,
  selected,
  onSelect,
}: {
  plans: CheckoutPlan[];
  selected: CheckoutPlan;
  onSelect: (p: CheckoutPlan) => void;
}) {
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

// ─── Billing form ────────────────────────────────────────────────────────────

function BillingForm({
  billing,
  onChange,
}: {
  billing: BillingInfo;
  onChange: (field: keyof BillingInfo, value: string) => void;
}) {
  const { t } = useTranslation("common");

  const field = (
    id: keyof BillingInfo,
    label: string,
    type = "text",
    readOnly = false,
    colSpan = "",
  ) => (
    <div className={cn("flex flex-col gap-1.5", colSpan)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={billing[id]}
        readOnly={readOnly}
        className={readOnly ? "cursor-not-allowed opacity-60" : ""}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );

  return (
    <SectionCard
      title={t("checkout.billing.title")}
      subtitle={t("checkout.billing.subtitle")}
    >
      <div className="grid grid-cols-2 gap-4">
        {field("name", t("checkout.billing.name"), "text", false, "col-span-2")}
        {field("email", t("checkout.billing.email"), "email", true)}
        {field("phone", t("checkout.billing.phone"), "tel")}
        {field(
          "address",
          t("checkout.billing.address"),
          "text",
          false,
          "col-span-2",
        )}
        {field("city", t("checkout.billing.city"))}
        {field("state", t("checkout.billing.state"))}
        {field("zip", t("checkout.billing.zip"))}
        {field("country", t("checkout.billing.country"))}
      </div>
    </SectionCard>
  );
}

// ─── Payment picker ───────────────────────────────────────────────────────────

function PaymentPicker({
  cards,
  selected,
  onSelect,
}: {
  cards: SavedCard[];
  selected: SavedCard;
  onSelect: (c: SavedCard) => void;
}) {
  const { t } = useTranslation("common");
  return (
    <SectionCard
      title={t("checkout.payment.title")}
      subtitle={t("checkout.payment.subtitle")}
    >
      <div className="space-y-2">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card)}
            className={cn(
              "flex w-full items-center gap-4 rounded-xl border-2 px-4 py-3 transition-all",
              selected.id === card.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40",
            )}
          >
            <CardBrandBadge brand={card.brand} />
            <div className="flex-1 text-left">
              <p className="text-[13px] font-semibold">
                •••• •••• •••• {card.last4}
              </p>
              <p className="text-muted-foreground text-xs">
                {card.holderName} · {t("checkout.payment.expires")} {card.expiry}
              </p>
            </div>
            {selected.id === card.id && (
              <IconCheck className="text-primary size-4 shrink-0" />
            )}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { plans, savedCards, billing } = useLoaderData<CheckoutLoaderData>();
  const { t } = useTranslation("common");

  const [selectedPlan, setSelectedPlan] = useState<CheckoutPlan>(plans[1]);
  const [selectedCard, setSelectedCard] = useState<SavedCard>(savedCards[0]);
  const [billingForm, setBillingForm] = useState<BillingInfo>(billing);
  const [submitted, setSubmitted] = useState(false);

  const updateBilling = (field: keyof BillingInfo, value: string) =>
    setBillingForm((prev) => ({ ...prev, [field]: value }));

  if (submitted) return <SuccessScreen />;

  return (
    <>
      {/* Header */}
      <header className="border-border/60 bg-card/95 fixed inset-x-0 top-0 z-20 h-14 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4 lg:px-5">
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-[13px] transition-colors"
          >
            <IconChevronLeft className="size-4" />
            <span className="hidden sm:inline">{t("checkout.header.back")}</span>
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

          <BillingForm billing={billingForm} onChange={updateBilling} />

          <PaymentPicker
            cards={savedCards}
            selected={selectedCard}
            onSelect={setSelectedCard}
          />

          {/* Order summary + submit */}
          <div className="flex items-center justify-between rounded-xl border bg-card px-5 py-4 ring-1 ring-foreground/10">
            <div>
              <p className="text-muted-foreground text-xs">
                {t("checkout.total")}
              </p>
              <p className="text-xl font-black">{selectedPlan.price}</p>
              <p className="text-muted-foreground text-xs">
                {selectedPlan.name}
              </p>
            </div>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => setSubmitted(true)}
            >
              <IconShoppingBag className="size-4" />
              {t("checkout.submit")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
