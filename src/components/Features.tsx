
import { Truck, Clock, Globe, Shield } from 'lucide-react'

const features = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Fast Delivery',
    description: 'Express shipping solutions for time-sensitive deliveries'
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to assist you'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Global Coverage',
    description: 'Shipping services available worldwide'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Secure Shipping',
    description: 'Your packages are protected and insured'
  }
]

export default function Features() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
