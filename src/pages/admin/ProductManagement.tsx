import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card, { CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { db, storage } from '../../lib/firebase';
import { collection, query, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product } from '../../types';

interface ProductFormData {
  name: string;
  description: string;
  regularPrice: number;
  dealerPrice: number;
  category: string;
  stock: number;
  image: File | null;
}

const ProductManagement: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    regularPrice: 0,
    dealerPrice: 0,
    category: '',
    stock: 0,
    image: null
  });
  
  useEffect(() => {
    // Redirect if not admin
    if (userData && userData.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // This is mock data for demonstration
        // In a real app, this would fetch from Firebase
        const mockProducts = [
          {
            id: 'prod1',
            name: 'Organic Fertilizer',
            description: 'Premium organic fertilizer for enhanced crop yield',
            regularPrice: 1200,
            dealerPrice: 950,
            imageUrl: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Fertilizers',
            stock: 150,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'prod2',
            name: 'Pest Control Spray',
            description: 'Effective pest control solution for various crops',
            regularPrice: 850,
            dealerPrice: 680,
            imageUrl: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Pesticides',
            stock: 75,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'prod3',
            name: 'Premium Seeds Pack',
            description: 'High-yield vegetable seeds pack',
            regularPrice: 500,
            dealerPrice: 380,
            imageUrl: 'https://images.pexels.com/photos/9966987/pexels-photo-9966987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Seeds',
            stock: 200,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'prod4',
            name: 'Drip Irrigation Kit',
            description: 'Complete drip irrigation system for efficient water usage',
            regularPrice: 3000,
            dealerPrice: 2700,
            imageUrl: 'https://images.pexels.com/photos/2132780/pexels-photo-2132780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            category: 'Equipment',
            stock: 30,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ] as Product[];
        
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'regularPrice' || name === 'dealerPrice' || name === 'stock' 
        ? parseFloat(value) 
        : value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      image: file
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      regularPrice: 0,
      dealerPrice: 0,
      category: '',
      stock: 0,
      image: null
    });
    setIsEditing(false);
    setSelectedProduct(null);
    setShowForm(false);
  };

  const handleAddProduct = () => {
    setShowForm(true);
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      regularPrice: product.regularPrice,
      dealerPrice: product.dealerPrice,
      category: product.category,
      stock: product.stock,
      image: null
    });
    setIsEditing(true);
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    // In a real app, this would delete from Firebase
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || formData.regularPrice <= 0) {
      alert('Please fill all required fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would add/update in Firebase
      if (isEditing && selectedProduct) {
        // Update existing product
        const updatedProducts = products.map(product => 
          product.id === selectedProduct.id 
            ? { 
                ...product, 
                name: formData.name,
                description: formData.description,
                regularPrice: formData.regularPrice,
                dealerPrice: formData.dealerPrice,
                category: formData.category,
                stock: formData.stock,
                updatedAt: new Date()
              } 
            : product
        );
        setProducts(updatedProducts);
      } else {
        // Add new product
        const newProduct: Product = {
          id: `prod${products.length + 1}`,
          name: formData.name,
          description: formData.description,
          regularPrice: formData.regularPrice,
          dealerPrice: formData.dealerPrice,
          imageUrl: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          category: formData.category,
          stock: formData.stock,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        setProducts([...products, newProduct]);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-green-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <Button onClick={handleAddProduct} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Add/Edit Product Form */}
        {showForm && (
          <Card className="mb-8">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Fertilizers">Fertilizers</option>
                      <option value="Pesticides">Pesticides</option>
                      <option value="Seeds">Seeds</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="Regular Price (₹)"
                    name="regularPrice"
                    type="number"
                    value={formData.regularPrice.toString()}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Dealer Price (₹)"
                    name="dealerPrice"
                    type="number"
                    value={formData.dealerPrice.toString()}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    value={formData.stock.toString()}
                    onChange={handleInputChange}
                    min="0"
                    required
                    fullWidth
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    {!formData.image && isEditing && (
                      <p className="mt-2 text-sm text-gray-500">Current image will be retained if no new image is uploaded</p>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2 flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    isLoading={isLoading}
                  >
                    {isEditing ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Products List */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                  <div className="mt-3 flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Regular: <span className="text-green-600 font-medium">₹{product.regularPrice}</span></p>
                      <p className="text-sm text-gray-500">Dealer: <span className="text-green-600 font-medium">₹{product.dealerPrice}</span></p>
                    </div>
                    <p className="text-sm text-gray-500">Stock: <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>{product.stock}</span></p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">No products found. {searchTerm ? 'Try a different search term.' : 'Add your first product.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;