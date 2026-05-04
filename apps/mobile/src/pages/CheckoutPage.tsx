import { Activity, useState } from "react";
import type { Control } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { IconCreditCard } from "@tabler/icons-react";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@carveri/shared/components/ui/field.tsx";
import {
  OrderSummaryBar,
  PlanPicker,
  SectionCard,
  SuccessScreen,
} from "@carveri/shared/components/checkout/index.tsx";
import type {
  CheckoutLoaderData,
  CheckoutPlan,
} from "@carveri/shared/types/dashboard.ts";
import AppHeader from "@/components/AppHeader";

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

        {/* Cardholder name */}
        {renderField(control, "cardHolder", t("checkout.payment.cardHolder"), {
          colSpan: true,
        })}

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
      <AppHeader
        title={t("checkout.header.title")}
        backTo="/dashboard"
        showAppName={false}
      />

      <div className="dark:bg-background min-h-screen bg-slate-50/70 pt-14">
        <div className="mx-auto max-w-2xl space-y-5 px-4 py-6">
          <PlanPicker
            plans={plans}
            selected={selectedPlan}
            onSelect={setSelectedPlan}
          />

          <BillingSection control={control} />

          <CardInputSection control={control} />

          <OrderSummaryBar
            selectedPlan={selectedPlan}
            submitting={submitting}
            onCancel="/dashboard"
          />
        </div>
      </div>
    </form>
  );
}
