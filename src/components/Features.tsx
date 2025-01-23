import { Truck, Package, Globe, Clock, Mail, Box, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: <Package className="h-8 w-8" />,
    title: 'Package Tracking',
    description: 'Real-time tracking with detailed shipment updates and notifications'
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Express Shipping',
    description: 'Next-day and same-day delivery options for urgent packages'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Global Coverage',
    description: 'International shipping to over 150 countries worldwide'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Secure Shipping',
    description: 'Package protection and insurance for peace of mind'
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer service and assistance'
  },
  {
    icon: <Box className="h-8 w-8" />,
    title: 'Flexible Options',
    description: 'Multiple shipping speeds and service levels to choose from'
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose ShipTrack?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Experience world-class shipping services with features designed to make your logistics simple and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 
                       transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 
                              dark:group-hover:bg-blue-800/50 transition-colors">
                    <div className="text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}