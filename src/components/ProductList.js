import React from 'react';

const ProductList = ({ products, onEdit, onSell, onDelete, currentDate }) => {
  const isExpired = (expirationDate) => {
    const expDate = new Date(expirationDate);
    return expDate < currentDate;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Inventario Actual</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Expiración</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {products.map((product) => {
              const price = typeof product.price === 'string' 
                ? parseFloat(product.price) 
                : product.price;
              const expired = isExpired(product.expiration);
                
              return (
                <tr key={product.code} className={`hover:bg-gray-700 ${expired ? 'bg-red-900 bg-opacity-20' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{product.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    ${Number(price).toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${expired ? 'text-red-400' : 'text-gray-200'}`}>
                    {product.expiration}
                    {expired && <span className="ml-2 text-xs text-red-400">(Expirado)</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => !expired && onSell(product)}
                      disabled={expired}
                      className={`${expired ? 'text-gray-500 cursor-not-allowed' : 'text-green-400 hover:text-green-300'} transition-colors`}
                    >
                      Vender
                    </button>
                    <button
                      onClick={() => onDelete(product.code)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;