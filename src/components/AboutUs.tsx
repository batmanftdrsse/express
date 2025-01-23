export default function AboutUs() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Global Shipping Solutions Since 1995
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              ShipTrack has been at the forefront of international logistics for over 25 years. 
              We combine cutting-edge technology with extensive global infrastructure to provide 
              reliable, efficient, and cost-effective shipping solutions for businesses and 
              individuals worldwide.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              With presence in over 150 countries and a dedicated team of logistics experts, 
              we ensure your packages reach their destination safely and on time.
            </p>
            <a 
              href="/about"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium 
                       rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                       dark:hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Learn More About Us
            </a>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Global shipping operations"
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  )
}