import { useState } from "react";
import { toast } from "sonner";
import { Toaster as Sonner } from "sonner";
import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function Register() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    toast.success("Cuenta creada. ¡Bienvenido!");
    navigate("/");
  }

  return (
    <div className="flex min-h-screen">
      <Sonner theme="light" />

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
          {/* Mobile brand badge */}
          <div className="mb-8 flex md:hidden">
            <span className="rounded-full bg-[#042CD7]/8 px-3 py-1 text-[13px] font-bold text-[#042CD7]">
              CarVeri
            </span>
          </div>

          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Crear cuenta</h1>
            <p className="text-muted-foreground text-sm">
              Llena tus datos para comenzar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan García"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
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

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={!accepted}
            >
              Crear cuenta
            </Button>
          </form>

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
