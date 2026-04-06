import { Form, Link, useActionData, useNavigation } from "react-router";
import { Button } from "@carveri/shared/components/ui/button";
import { Input } from "@carveri/shared/components/ui/input";
import { Label } from "@carveri/shared/components/ui/label";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import { Activity } from "react";
import { Spinner } from "@carveri/shared/components/ui/spinner.tsx";

function Login() {
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[38%] flex-col justify-between bg-[#042CD7] p-10 md:flex">
        <LogoFullHorizontal className="h-10 w-auto" />
        <div className="flex flex-col gap-2">
          <p className="text-lg leading-snug font-bold text-white">
            Análisis vehicular inteligente.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Historial, valor y riesgo en 2 minutos.
          </p>
        </div>
        <span className="text-[11px] text-white/30">© 2026 CarVeri</span>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground text-sm">
              Ingresa tu correo y contraseña
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

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={isSubmitting}
            >
              <Activity mode={isSubmitting ? "visible" : "hidden"}>
                <Spinner />
              </Activity>
              Iniciar sesión
            </Button>
          </Form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
