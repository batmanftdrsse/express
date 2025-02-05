const Home = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Rastreie sua Encomenda
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Digite seu número de rastreio para obter atualizações em tempo real sobre a localização do seu pacote
          </p>
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Digite o código de rastreio"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Rastrear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 