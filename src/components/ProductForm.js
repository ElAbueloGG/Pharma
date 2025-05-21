import React, { useState } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(product || {
    code: '',
    name: '',
    quantity: 0,
    price: 0,
    expiration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSubmit = {
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price)
    };
    onSubmit(productToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        {product ? 'Editar Producto' : 'Nuevo Producto'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Código de Barras</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            required
            autoFocus
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Nombre del Producto</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Cantidad Inicial</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Precio Unitario</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            min="0"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Fecha de Expiración</label>
          <input
            type="date"
            name="expiration"
            value={formData.expiration}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Guardar Producto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;


// DONE