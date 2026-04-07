import { Form, Link, useActionData, useNavigation } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import LogoFullVertical from "@carveri/shared/components/logos/LogoFullVertical.tsx";
import { Activity } from "react";
import { Spinner } from "@carveri/shared/components/ui/spinner.tsx";

function Login() {
  const { t } = useTranslation("common");
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-screen">
      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Mobile brand badge */}
          <div className="mb-8 flex items-center justify-center">
            <LogoFullVertical className="h-auto w-full max-w-24" />
          </div>

          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">{t("auth.welcomeBack")}</h1>
            <p className="text-muted-foreground text-sm">
              {t("auth.enterCredentials")}
            </p>
          </div>

          <Form method="post" className="flex flex-col gap-4">
            {actionData?.error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {actionData.error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("auth.emailPlaceholder")}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={isSubmitting}
            >
              <Activity mode={isSubmitting ? "visible" : "hidden"}>
                <Spinner />
              </Activity>
              {t("auth.signIn")}
            </Button>
          </Form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            {t("auth.noAccount")}{" "}
            <Link
              to="/register"
              className="font-semibold text-[#042CD7] hover:underline"
            >
              {t("auth.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
