import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Award, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { FaShoppingCart } from 'react-icons/fa';
import { products, Product } from '../data/products';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Agricultural field"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-3/5">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Premium Agricultural Products for Modern Farming
              </h1>
              <p className="mt-4 text-xl text-green-100 max-w-3xl">
                Asim Agro provides high-quality agricultural products and expert services to enhance your farming productivity and yield.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/products">
                  <Button size="lg">
                    Explore Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white hover:bg-white/20 text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Asim Agro</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We're committed to providing the best products and services for agricultural success.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Quality Products</h3>
              <p className="mt-2 text-gray-600">
                All our products meet rigorous quality standards to ensure optimal performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-gray-600">
                We ensure timely delivery of products to meet your farming schedule requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Expert Advice</h3>
              <p className="mt-2 text-gray-600">
                Our team of agricultural experts provides guidance to optimize your farming practices.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Dealer Network</h3>
              <p className="mt-2 text-gray-600">
                Join our growing network of dealers and benefit from exclusive pricing and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-green-600 hover:text-green-700 flex items-center"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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

                  <div className="mt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </button>

                    {showSuccess === product.id && (
                      <div className="mt-2 text-green-600 text-center">
                        {showSuccess}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Don't just take our word for it. Hear from the farmers who trust Asim Agro.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Rajesh Patel</h4>
                  <p className="text-gray-600">Farmer, Maharashtra</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The quality of seeds provided by Asim Agro has significantly improved my crop yield. Their expert advice has been invaluable for my farm's success."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Anita Sharma</h4>
                  <p className="text-gray-600">Dairy Farmer, Gujarat</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been using Asim Agro's feed supplements for my dairy farm, and the results have been exceptional. Highly recommend their products."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Sunil Verma</h4>
                  <p className="text-gray-600">Dealer, Karnataka</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Becoming an Asim Agro dealer was one of the best business decisions I've made. The support and product quality have helped me grow my customer base significantly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Improve Your Agricultural Yield?</h2>
          <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
            Join thousands of satisfied farmers who trust Asim Agro for their agricultural needs.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/products">
            <Button variant="outline" size="lg" className=" mr-4 border-white text-white hover:bg-white/20">                Explore Products
              </Button>
            </Link>
            <Link to="/dealer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                Become a Dealer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;