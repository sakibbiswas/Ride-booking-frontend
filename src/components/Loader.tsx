export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-10 space-y-3">
      {/* Gradient spinner */}
      <div className="relative w-10 h-10">
        <div className="animate-spin-slow rounded-full h-10 w-10 border-4 border-t-4 border-gray-200 border-t-transparent border-b-transparent border-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-indigo-500 animate-bounce">✨</span>
        </div>
      </div>
      <span className="text-base font-semibold text-indigo-600 animate-pulse">{label}</span>
    </div>
  );
}
