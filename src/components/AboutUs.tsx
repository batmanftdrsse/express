import { CheckCircle } from 'lucide-react'

const benefits = [
  'Industry-leading delivery times',
  'Advanced tracking technology',
  'Professional handling & care',
  'Competitive shipping rates'
]

export default function AboutUs() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Global shipping operations"
                className="object-cover w-full h-full rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-xl -z-10"></div>
          </div>

          <div className="lg:pl-8">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
              About ShipTrack
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Delivering Excellence Since 1995
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              ShipTrack has revolutionized the shipping industry with innovative solutions 
              and unwavering commitment to customer satisfaction. Our global network and 
              cutting-edge technology ensure your packages reach their destination safely 
              and on time.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <button 
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium 
                       rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                       dark:hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}