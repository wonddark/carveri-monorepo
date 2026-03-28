import { Separator } from "@carveri/shared/components/ui/separator.tsx";
import { Link } from "react-router";

function Footer() {
  const LOGO_URL =
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663263444526/KfakYGoXfipkejUs.png";

  return (
    <footer className="bg-[#0A1628] py-10">
      <div className="mx-auto max-w-300 px-5">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="La Subasta Cubana"
              className="h-6 brightness-200"
            />
            <Separator orientation="vertical" className="h-4 bg-gray-700" />
            <span className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} CarVeri
            </span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/terms" className="transition-colors hover:text-gray-300">
              Términos
            </Link>
            <Link
              to="/privacy"
              className="transition-colors hover:text-gray-300"
            >
              Privacidad
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-gray-300"
            >
              Contacto
            </Link>
          </div>
        </div>
        <Separator className="my-6 bg-gray-800" />
        <div className="text-center">
          <p className="mx-auto max-w-150 text-xs leading-relaxed text-gray-600">
            CarVeri es un servicio de análisis de datos vehiculares. No
            reemplaza una inspección mecánica profesional. Los resultados se
            basan en la información disponible en las fuentes consultadas al
            momento de generar el reporte.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
