import React from 'react';

const PharmaHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">PharmaStock</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
            Inventario Activo
          </span>
        </div>
      </div>
    </header>
  );
};

export default PharmaHeader;