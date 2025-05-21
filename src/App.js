import React, { useState, useEffect } from 'react';
import PharmaHeader from './components/PharmaHeader';
import BarcodeScanner from './components/BarcodeScanner';
import ProductForm from './components/ProductForm';
import SellProductForm from './components/SellProductForm';
import ProductList from './components/ProductList';
import InventoryStats from './components/InventoryStats';
import { initialProducts } from './mock/products';
import { getMexicoTime } from './utils/mexicoTime';

const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [currentDate, setCurrentDate] = useState(getMexicoTime().fullDate);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('pharmaProducts')) || initialProducts;
    setProducts(savedProducts);

    const dateInterval = setInterval(() => {
      setCurrentDate(getMexicoTime().fullDate);
    }, 60000); // Actualizar cada minuto
    
    return () => clearInterval(dateInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('pharmaProducts', JSON.stringify(products));
  }, [products]);

  const handleSaveProduct = (productData) => {
    const existingIndex = products.findIndex(p => p.code === productData.code);
    
    if (existingIndex >= 0) {
      const updatedProducts = [...products];
      updatedProducts[existingIndex] = productData;
      setProducts(updatedProducts);
    } else {
      setProducts([productData, ...products]);
    }
    
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSaleSubmit = (productData) => {
    const updatedProducts = products.map(p => 
      p.code === productData.code 
        ? {...p, quantity: p.quantity - productData.soldQuantity}
        : p
    );
    setProducts(updatedProducts);
    setShowSellForm(false);
  };

  const handleDeleteProduct = (code) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.code !== code));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <PharmaHeader />
      
      <div className="container mx-auto p-4">
        <InventoryStats products={products} />
        
        {showForm ? (
          <div className="mb-6">
            <ProductForm 
              product={editingProduct}
              onSubmit={handleSaveProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        ) : showSellForm ? (
          <div className="mb-6">
            <SellProductForm
              product={editingProduct}
              onSubmit={handleSaleSubmit}
              onCancel={() => {
                setShowSellForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <BarcodeScanner onScan={(code) => {
                const product = products.find(p => p.code === code);
                if (product) {
                  setEditingProduct(product);
                  setShowSellForm(true); // Si existe, abre el formulario de venta
                } else {
                   // Si no encuentra el producto, abre el formulario para agregarlo
                   setEditingProduct({
                    code: code, // Precargar el código escaneado
                    name: '',
                    quantity: 0,
                    price: 0,
                    expiration: ''
                  });
                  setShowForm(true); // Abre el formulario de agregar
                }
              }} />
            </div>
            
            <button
              onClick={() => {
                setEditingProduct({
                  code: '',
                  name: '',
                  quantity: 0,
                  price: 0,
                  expiration: ''
                });
                setShowForm(true);
              }}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Agregar Producto Manualmente
            </button>
          </>
        )}
        
        <ProductList 
          products={products}
          currentDate={currentDate}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(true);
          }}
          onSell={(product) => {
            setEditingProduct(product);
            setShowSellForm(true);
          }}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default App;