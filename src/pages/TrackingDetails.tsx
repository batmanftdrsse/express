import { Package, MapPin, Calendar, Clock, Truck, CheckCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'

// Mock tracking data - in a real app, this would come from an API
const mockTrackingData = {
  trackingNumber: 'RASTR123456789',
  status: 'Em trânsito',
  origin: 'São Paulo, SP',
  destination: 'Rio de Janeiro, RJ',
  estimatedDelivery: '15/03/2024',
  timeline: [
    {
      status: 'Pedido recebido',
      location: 'São Paulo, SP',
      date: '12/03/2024',
      time: '09:30',
      completed: true,
    },
    {
      status: 'Em trânsito',
      location: 'Campinas, SP',
      date: '13/03/2024',
      time: '14:45',
      completed: true,
    },
    {
      status: 'Em trânsito',
      location: 'Resende, RJ',
      date: '14/03/2024',
      time: '10:15',
      completed: true,
    },
    {
      status: 'Saiu para entrega',
      location: 'Rio de Janeiro, RJ',
      date: '15/03/2024',
      time: '08:00',
      completed: false,
    },
  ],
}

const StatusCard = ({ icon: Icon, title, value }: { icon: any, title: string, value: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex items-start space-x-4">
    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
)

export default function TrackingDetails() {
  const { trackingNumber } = useParams()
  const tracking = mockTrackingData // In real app, fetch based on trackingNumber

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Detalhes do Rastreamento
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Número de rastreio: {tracking.trackingNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatusCard
            icon={Package}
            title="Status"
            value={tracking.status}
          />
          <StatusCard
            icon={MapPin}
            title="Origem"
            value={tracking.origin}
          />
          <StatusCard
            icon={MapPin}
            title="Destino"
            value={tracking.destination}
          />
          <StatusCard
            icon={Calendar}
            title="Previsão de Entrega"
            value={tracking.estimatedDelivery}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Histórico de Rastreamento
            </h2>
            <div className="space-y-8">
              {tracking.timeline.map((event, index) => (
                <div key={index} className="relative">
                  {index !== tracking.timeline.length - 1 && (
                    <div className={`absolute left-[17px] top-[30px] w-[2px] h-[calc(100%+32px)] 
                      ${event.completed ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                    />
                  )}
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-full p-1 
                      ${event.completed 
                        ? 'bg-blue-600 dark:bg-blue-500' 
                        : 'bg-gray-200 dark:bg-gray-700'}`}
                    >
                      {event.completed ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <Truck className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {event.status}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {event.location}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Localização Atual
            </h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.8665322694!2d-43.18159348503453!3d-22.90626798501355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f251d85272f76f7!2sRio%20de%20Janeiro%2C%20RJ!5e0!3m2!1sen!2sbr!4v1647296138774!5m2!1sen!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}