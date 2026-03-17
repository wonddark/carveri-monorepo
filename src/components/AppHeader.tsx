import { useNavigate } from "react-router";
import { ArrowLeft, Globe, Share2 } from "lucide-react";

export default function AppHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
      <button
        onClick={() => navigate(-1)}
        className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-lg font-black tracking-tight text-indigo-600">
          CarVeri
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-semibold text-slate-500">
          <Globe size={13} />
          EN
        </button>
        <button
          className="rounded-lg bg-slate-100 p-1.5 text-slate-400 hover:text-slate-600"
          aria-label="Share"
        >
          <Share2 size={15} />
        </button>
      </div>
    </header>
  );
}
