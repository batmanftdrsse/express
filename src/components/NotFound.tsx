import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        404 - Página não encontrada
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  )
} 