import React, { useState, useEffect } from 'react';
import { getMexicoTime } from '../utils/mexicoTime';

const InventoryStats = ({ products }) => {
  const [currentDate, setCurrentDate] = useState(getMexicoTime().fullDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getMexicoTime().fullDate);
    }, 60000); // Actualizar cada minuto
    
    return () => clearInterval(interval);
  }, []);

  const mexicoTime = getMexicoTime();

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, product) => sum + parseInt(product.quantity), 0);
  
  const totalValue = products.reduce((sum, product) => {
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price) 
      : product.price;
    return sum + (price * product.quantity);
  }, 0);
  
  const expiringSoon = products.filter(product => {
    const expDate = new Date(product.expiration);
    const diffTime = expDate - currentDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 30;
  }).length;

  const expiredProducts = products.filter(product => {
    const expDate = new Date(product.expiration);
    return expDate < currentDate;
  }).length;

  return (
    <div className="space-y-4 mb-6">
      <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-blue-400">Hora México</h3>
            <p className="text-xl font-bold text-blue-300">
              {mexicoTime.date} - {mexicoTime.time}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h3 className="text-sm font-medium text-purple-400">Productos</h3>
          <p className="text-2xl font-bold text-purple-300">{totalProducts}</p>
        </div>
         <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h3 className="text-sm font-medium text-green-400">Valor Total</h3>
          <p className="text-2xl font-bold text-green-300">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h3 className="text-sm font-medium text-yellow-400">Por Expirar</h3>
          <p className="text-2xl font-bold text-yellow-300">{expiringSoon}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h3 className="text-sm font-medium text-red-400">Expirados</h3>
          <p className="text-2xl font-bold text-red-300">{expiredProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryStats;


// DONE