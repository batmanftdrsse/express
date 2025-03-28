import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useTheme } from '../contexts/ThemeContext';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeText: string;
  amount: number;
}

export function PixModal({ isOpen, onClose, qrCodeText, amount }: PixModalProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isVisible) return null;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-300 ${
        isVisible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pagamento PIX</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-300 mb-2">Valor a pagar:</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(amount)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
          <QRCodeCanvas
            value={qrCodeText}
            size={256}
            level="H"
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Código PIX copia e cola:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={qrCodeText}
              readOnly
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded flex-1 text-sm border border-gray-200 dark:border-gray-600"
            />
            <button
              onClick={handleCopyClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>1. Abra o app do seu banco</p>
          <p>2. Escolha pagar via PIX</p>
          <p>3. Escaneie o QR Code ou cole o código</p>
          <p>4. Confirme o pagamento</p>
        </div>
      </div>
    </div>
  );
} 