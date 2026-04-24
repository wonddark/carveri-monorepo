import { Activity } from "react";
import { Form, useActionData, useNavigation, useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import { Label } from "@carveri/shared/components/ui/label.tsx";
import { Spinner } from "@carveri/shared/components/ui/spinner.tsx";
import type { DashboardData } from "@carveri/shared/types/dashboard.ts";

type ActionResult = { success?: boolean; error?: string };

export default function ProfileSection() {
  const data = useRouteLoaderData("dashboard") as DashboardData;
  const actionData = useActionData() as ActionResult | undefined;
  const navigation = useNavigation();
  const { t } = useTranslation("common");
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">
          {t("dashboard.profile.title")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t("dashboard.profile.subtitle")}
        </p>
      </div>

      <Card className="max-w-xl">
        <CardContent>
          <Form method="post" className="flex flex-col gap-4">
            {actionData?.error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400"
              >
                {t(actionData.error)}
              </p>
            )}
            {actionData?.success && (
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
                {t("dashboard.profile.saved")}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">{t("dashboard.profile.name")}</Label>
              <Input
                id="name"
                name="name"
                defaultValue={data.account.name}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">{t("dashboard.profile.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={data.account.email}
                readOnly
                className="cursor-not-allowed opacity-60"
              />
              <p className="text-muted-foreground text-xs">
                {t("dashboard.profile.emailHint")}
              </p>
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-fit"
              disabled={isSubmitting}
            >
              <Activity mode={isSubmitting ? "visible" : "hidden"}>
                <Spinner />
              </Activity>
              {t("dashboard.profile.save")}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
