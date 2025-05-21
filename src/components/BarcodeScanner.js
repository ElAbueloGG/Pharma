import React, { useState } from 'react';

const BarcodeScanner = ({ onScan }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue) {
      onScan(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Escáner de Códigos</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escanea o ingresa código de barras"
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
        autoFocus
      />
      <p className="mt-2 text-sm text-gray-400">
        Presiona Enter después de escanear
      </p>
    </div>
  );
};

export default BarcodeScanner;