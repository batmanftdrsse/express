import { Package } from 'lucide-react'
import { FC } from 'react'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = () => {
  return (
    <div className="flex items-center">
      <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
        Rastreio Express
      </span>
    </div>
  )
}

export default Logo 