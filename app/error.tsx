'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-2xl font-bold text-white mb-4">Algo deu errado!</h2>
      <p className="text-gray-400 text-center mb-6">
        Desculpe, ocorreu um erro ao carregar esta página.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}