export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="h-80 animate-pulse bg-gray-100 rounded" />
      <div className="h-80 animate-pulse bg-gray-100 rounded" />
    </div>
  );
}
