import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products, Product } from '../data/products';
import { FaShoppingCart } from 'react-icons/fa';

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product: Product) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      setShowSuccess('Please select a size');
      setTimeout(() => setShowSuccess(null), 3000);
      return;
    }

    addToCart(product, selectedSize);
    setShowSuccess('Added to cart successfully!');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Size
                  </label>
                  <select
                    value={selectedSizes[product.id] || ''}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose a size</option>
                    {product.sizes.map((size) => (
                      <option key={size.size} value={size.size}>
                        {size.size} - ₹{size.price.toLocaleString('en-IN')}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>

                {showSuccess && (
                  <div className="mt-2 text-green-600 text-center">
                    {showSuccess}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;