export function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">🏠 {title}</div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-400">Contenido en desarrollo.</p>
    </div>
  );
}
