export default function AboutUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Global Shipping Solutions Since 1995
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              ShipTrack has been at the forefront of international logistics for over 25 years. 
              We combine cutting-edge technology with extensive global infrastructure to provide 
              reliable, efficient, and cost-effective shipping solutions for businesses and 
              individuals worldwide.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              With presence in over 150 countries and a dedicated team of logistics experts, 
              we ensure your packages reach their destination safely and on time.
            </p>
            <a 
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Global shipping operations"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}