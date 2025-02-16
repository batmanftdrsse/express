import { FC } from 'react'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = 'h-8 w-auto' }) => {
  return (
    <div className="flex items-center">
      <img 
        src="/images/logo.png" 
        alt="Rastreio Express" 
        className={className}
      />
      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
        Rastreio Express
      </span>
    </div>
  )
}

export default Logo 