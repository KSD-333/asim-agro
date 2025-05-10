import React from 'react';
import { Award, Users, Globe, Leaf } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Asim Agro</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading agricultural solutions provider committed to empowering farmers and enhancing agricultural productivity since 2010.
          </p>
        </div>
        
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To revolutionize agriculture in India by providing innovative solutions and empowering farmers with modern farming techniques and quality products.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To be the most trusted partner for farmers by delivering superior agricultural products and services while promoting sustainable farming practices.
            </p>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Quality Products',
                description: 'Premium agricultural products that meet international standards'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Experienced agricultural professionals providing expert guidance'
              },
              {
                icon: Globe,
                title: 'Wide Network',
                description: 'Extensive dealer network across Maharashtra and beyond'
              },
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'Commitment to promoting sustainable farming practices'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Company Stats */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: 'Years of Experience' },
              { number: '1000+', label: 'Happy Farmers' },
              { number: '50+', label: 'Products' },
              { number: '25+', label: 'Expert Staff' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                position: 'CEO & Founder',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                name: 'Priya Sharma',
                position: 'Agricultural Expert',
                image: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                name: 'Amit Patel',
                position: 'Operations Director',
                image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-green-700 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Farming?</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied farmers who trust Asim Agro for their agricultural needs.
            </p>
            <div className="flex justify-center space-x-4">
            <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-700"
              >
                Contact Us
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-700"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;