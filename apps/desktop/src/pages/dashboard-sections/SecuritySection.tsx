import { Activity } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import { Label } from "@carveri/shared/components/ui/label.tsx";
import { Spinner } from "@carveri/shared/components/ui/spinner.tsx";

type ActionResult = { success?: boolean; error?: string };

export default function SecuritySection() {
  const actionData = useActionData() as ActionResult | undefined;
  const navigation = useNavigation();
  const { t } = useTranslation("common");
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">
          {t("dashboard.security.title")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t("dashboard.security.subtitle")}
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
                {t("dashboard.security.changed")}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currentPassword">
                {t("dashboard.security.currentPassword")}
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="newPassword">
                {t("dashboard.security.newPassword")}
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">
                {t("dashboard.security.confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
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
              {t("dashboard.security.change")}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
