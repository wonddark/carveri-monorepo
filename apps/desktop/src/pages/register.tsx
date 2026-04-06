// apps/desktop/src/pages/register.tsx

import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import { Checkbox } from "@carveri/shared/components/ui/checkbox";
import { auth } from "@carveri/shared/lib/auth.ts";
import { register } from "@carveri/shared/data/api.ts";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm = formData.get("confirm");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirm !== "string" ||
    !email ||
    !password
  ) {
    return { error: "Todos los campos son requeridos." };
  }

  if (password !== confirm) {
    return { error: "Las contraseñas no coinciden." };
  }

  try {
    const result = await register(email, password);
    auth.setToken(result.token);
    return redirect("/");
  } catch (err) {
    const isRegistrationError =
      err instanceof Error && err.message === "Registration failed";
    return {
      error: isRegistrationError
        ? "No se pudo crear la cuenta. Intenta con otro correo."
        : "Error de conexión. Intente nuevamente.",
    };
  }
}

function Register() {
  const actionData = useActionData() as { error?: string } | undefined;
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[38%] flex-col justify-between bg-[#042CD7] p-10 md:flex">
        <span className="text-sm font-extrabold tracking-tight text-white">
          CarVeri
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold leading-snug text-white">
            Empieza gratis hoy.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Tu primer reporte en minutos.
          </p>
        </div>
        <span className="text-[11px] text-white/30">© 2026 CarVeri</span>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Crear cuenta</h1>
            <p className="text-muted-foreground text-sm">
              Llena tus datos para comenzar
            </p>
          </div>

          <Form method="post" className="flex flex-col gap-4">
            {actionData?.error && (
              <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {actionData.error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Juan García"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirm">Confirmar contraseña</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center gap-2.5">
              <Checkbox
                id="terms"
                checked={accepted}
                onCheckedChange={(v) => setAccepted(v === true)}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                Acepto los{" "}
                <span className="font-semibold text-[#042CD7]">
                  términos y condiciones
                </span>
              </Label>
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={!accepted}>
              Crear cuenta
            </Button>
          </Form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
