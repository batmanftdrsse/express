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
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Popular Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
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