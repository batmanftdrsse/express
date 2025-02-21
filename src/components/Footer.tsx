export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <p className="text-center text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} RastreioExpress. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
} 