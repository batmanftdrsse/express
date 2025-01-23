import { Truck, Package, Globe, Clock, Mail, Box } from 'lucide-react'

const features = [
  {
    icon: <Package className="h-12 w-12" />,
    title: 'Track a Package',
    description: 'Get real-time updates on your deliveries'
  },
  {
    icon: <Truck className="h-12 w-12" />,
    title: 'Ship Now',
    description: 'Send packages domestically or internationally'
  },
  {
    icon: <Mail className="h-12 w-12" />,
    title: 'Postal Services',
    description: 'Letters, postcards and mail services'
  },
  {
    icon: <Box className="h-12 w-12" />,
    title: 'Click & Collect',
    description: 'Collect your packages at your convenience'
  },
  {
    icon: <Globe className="h-12 w-12" />,
    title: 'International',
    description: 'Global shipping solutions'
  },
  {
    icon: <Clock className="h-12 w-12" />,
    title: 'Express Services',
    description: 'Fast and reliable delivery options'
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Popular Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}