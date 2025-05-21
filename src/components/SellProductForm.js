import React, { useState, useEffect } from 'react';

const SellProductForm = ({ product, onSubmit, onCancel }) => {
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(product.quantity);

  useEffect(() => {
    setAvailableQuantity(product.quantity);
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...product,
      soldQuantity: parseInt(saleQuantity)
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Registrar Venta</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Producto</label>
          <p className="text-gray-200 text-lg font-medium">{product.name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Código</label>
          <p className="text-gray-200">{product.code}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Disponible</label>
          <p className="text-2xl font-bold text-green-400">{availableQuantity} unidades</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Cantidad a Vender</label>
          <input
            type="number"
            min="1"
            max={availableQuantity}
            value={saleQuantity}
            onChange={(e) => setSaleQuantity(Math.min(Number(e.target.value), availableQuantity))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            required
            autoFocus
          />
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
          >
            Confirmar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellProductForm;