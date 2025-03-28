import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';

const RecursosPage: React.FC = () => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Recursos do Rastreio Express
          </h1>

          {/* Restante do código... */}
        </div>
      </div>
    </>
  );
};

export default RecursosPage; 