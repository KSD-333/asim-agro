import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600';
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <img
                className="h-10 w-auto"
                src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Asim Agro Logo"
              />
              <span className="ml-2 text-xl font-bold text-green-700">Asim Agro</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${isActive('/')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Home
            </Link>
            <Link to="/products" className={`${isActive('/products')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Products
            </Link>
            <Link to="/services" className={`${isActive('/services')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Services
            </Link>
            <Link to="/dealer" className={`${isActive('/dealer')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Become a Dealer
            </Link>
            <Link to="/about" className={`${isActive('/about')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              About
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Contact
            </Link>
            
            <Link to="/cart" className="relative text-gray-700 hover:text-green-600">
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Link 
              to="/login" 
              className={`${isActive('/login')} px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200`}
            >
              Login
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              to="/dealer"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              Become a Dealer
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              Cart
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;