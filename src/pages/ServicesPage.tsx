import React from 'react';
import { Leaf, FlaskRound as Flask, Tractor, Users } from 'lucide-react';
import Button from '../components/ui/Button';

const services = [
  {
    icon: Leaf,
    title: 'Agricultural Consultation',
    description: 'Expert guidance on crop selection, farming practices, and yield optimization',
    features: [
      'Personalized farming advice',
      'Crop planning assistance',
      'Pest management strategies',
      'Soil health recommendations'
    ]
  },
  {
    icon: Flask,
    title: 'Soil Testing',
    description: 'Comprehensive soil analysis to optimize your farming decisions',
    features: [
      'Detailed soil composition analysis',
      'pH level testing',
      'Nutrient content evaluation',
      'Fertilizer recommendations'
    ]
  },
  {
    icon: Tractor,
    title: 'Equipment Rental',
    description: 'Modern farming equipment available for rent at competitive prices',
    features: [
      'Wide range of equipment',
      'Flexible rental periods',
      'Maintenance included',
      'Operator training available'
    ]
  },
  {
    icon: Users,
    title: 'Farmer Training Programs',
    description: 'Educational programs to enhance farming knowledge and skills',
    features: [
      'Modern farming techniques',
      'Sustainable practices',
      'Crop management workshops',
      'Hands-on training sessions'
    ]
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive agricultural solutions to help your farming business grow
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6">Learn More</Button>
              </div>
            );
          })}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-16 bg-green-700 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Need Specialized Assistance?</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Our team of agricultural experts is ready to help you with customized solutions for your farming needs.
            </p>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-700"
            >
              Contact Our Experts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;