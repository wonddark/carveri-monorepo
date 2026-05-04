import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  IconCheck,
  IconLoader2,
  IconShoppingBag,
} from "@tabler/icons-react";
import { cn } from "@carveri/shared/lib/utils";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import type { CheckoutPlan } from "@carveri/shared/types/dashboard.ts";

// ─── Section card ─────────────────────────────────────────────────────────────

type SectionCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function SectionCard(props: Readonly<SectionCardProps>) {
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

export function PlanPicker(props: Readonly<PlanPickerProps>) {
  const { plans, selected, onSelect } = props;
  const { t } = useTranslation("common");
  return (
    <SectionCard
      title={t("checkout.plans.title")}
      subtitle={t("checkout.plans.subtitle")}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

// ─── Success screen ───────────────────────────────────────────────────────────

export function SuccessScreen() {
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

// ─── Order summary bar ────────────────────────────────────────────────────────

type OrderSummaryBarProps = {
  selectedPlan: CheckoutPlan;
  submitting: boolean;
  onCancel: string;
};

export function OrderSummaryBar(props: Readonly<OrderSummaryBarProps>) {
  const { selectedPlan, submitting, onCancel } = props;
  const { t } = useTranslation("common");

  return (
    <div className="bg-card ring-foreground/10 flex items-center justify-between rounded-xl border px-5 py-4 ring-1">
      <div>
        <p className="text-muted-foreground text-xs">{t("checkout.total")}</p>
        <p className="text-xl font-black">{selectedPlan.price}</p>
        <p className="text-muted-foreground text-xs">{selectedPlan.name}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="lg" asChild>
          <Link to={onCancel}>{t("checkout.cancel")}</Link>
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
  );
}
