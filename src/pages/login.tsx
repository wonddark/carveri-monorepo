import { toast } from "sonner";
import { Toaster as Sonner } from "sonner";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Sesión iniciada.");
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
          {/* Mobile brand badge */}
          <div className="mb-8 flex md:hidden">
            <span className="rounded-full bg-[#042CD7]/8 px-3 py-1 text-[13px] font-bold text-[#042CD7]">
              CarVeri
            </span>
          </div>

          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-xl font-extrabold">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground text-sm">
              Ingresa tu correo y contraseña
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="mt-2 w-full">
              Iniciar sesión
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-[#042CD7] hover:underline"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
