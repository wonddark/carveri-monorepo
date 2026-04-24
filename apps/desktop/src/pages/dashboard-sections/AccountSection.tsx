import { useState } from "react";
import { Form } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@carveri/shared/components/ui/dialog.tsx";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function AccountSection() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">
          {t("dashboard.account.title")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t("dashboard.account.subtitle")}
        </p>
      </div>

      <Card className="max-w-xl border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <IconAlertTriangle className="size-4" />
            {t("dashboard.account.deleteTitle")}
          </CardTitle>
          <CardDescription>
            {t("dashboard.account.deleteDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            {t("dashboard.account.deleteButton")}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{t("dashboard.account.confirmTitle")}</DialogTitle>
            <DialogDescription>
              {t("dashboard.account.confirmDescription")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton={false}>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("dashboard.account.cancel")}
            </Button>
            <Form method="post" action="/delete-account">
              <Button type="submit" variant="destructive">
                {t("dashboard.account.confirmButton")}
              </Button>
            </Form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
