import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">Asim Agro</h3>
            <p className="text-gray-300">
              Providing quality agricultural products and services to farmers and businesses since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#consultation" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Agricultural Consultation
                </Link>
              </li>
              <li>
                <Link to="/services#soil-testing" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Soil Testing
                </Link>
              </li>
              <li>
                <Link to="/services#equipment" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Equipment Rental
                </Link>
              </li>
              <li>
                <Link to="/dealer" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Dealership Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Agriculture Road, Kadegaon, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" />
                <a href="mailto:info@asimagro.com" className="text-gray-300 hover:text-white">
                  info@asimagro.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Asim Agro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;