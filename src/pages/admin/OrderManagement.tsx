import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Eye, Check, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card, { CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, doc, updateDoc, where, orderBy, limit } from 'firebase/firestore';
import { Order } from '../../types';

const OrderManagement: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    // Redirect if not admin
    if (userData && userData.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // This is mock data for demonstration
        // In a real app, this would fetch from Firebase
        const mockOrders = [
          {
            id: 'order1',
            userId: 'user1',
            userEmail: 'customer1@example.com',
            userName: 'Rajesh Patel',
            products: [{ productId: 'prod1', productName: 'Organic Fertilizer', quantity: 2, price: 1200 }],
            status: 'pending',
            total: 2400,
            createdAt: new Date(),
            updatedAt: new Date(),
            address: {
              street: '123 Farm Road',
              city: 'Kadegaon',
              state: 'Maharashtra',
              postalCode: '415304',
              country: 'India'
            }
          },
          {
            id: 'order2',
            userId: 'user2',
            userEmail: 'customer2@example.com',
            userName: 'Anita Sharma',
            products: [{ productId: 'prod2', productName: 'Pest Control Spray', quantity: 1, price: 850 }],
            status: 'processing',
            total: 850,
            createdAt: new Date(),
            updatedAt: new Date(),
            address: {
              street: '456 Agriculture Lane',
              city: 'Kolhapur',
              state: 'Maharashtra',
              postalCode: '416012',
              country: 'India'
            }
          },
          {
            id: 'order3',
            userId: 'user3',
            userEmail: 'customer3@example.com',
            userName: 'Sunil Verma',
            products: [
              { productId: 'prod3', productName: 'Premium Seeds Pack', quantity: 3, price: 500 },
              { productId: 'prod4', productName: 'Drip Irrigation Kit', quantity: 1, price: 3000 }
            ],
            status: 'completed',
            total: 4500,
            createdAt: new Date(Date.now() - 86400000), // 1 day ago
            updatedAt: new Date(Date.now() - 43200000), // 12 hours ago
            address: {
              street: '789 Harvest Avenue',
              city: 'Pune',
              state: 'Maharashtra',
              postalCode: '411001',
              country: 'India'
            }
          },
          {
            id: 'order4',
            userId: 'user4',
            userEmail: 'customer4@example.com',
            userName: 'Vikram Singh',
            products: [
              { productId: 'prod2', productName: 'Pest Control Spray', quantity: 2, price: 850 }
            ],
            status: 'cancelled',
            total: 1700,
            createdAt: new Date(Date.now() - 172800000), // 2 days ago
            updatedAt: new Date(Date.now() - 172000000),
            address: {
              street: '45 Farming Colony',
              city: 'Satara',
              state: 'Maharashtra',
              postalCode: '415001',
              country: 'India'
            }
          },
          {
            id: 'order5',
            userId: 'user5',
            userEmail: 'customer5@example.com',
            userName: 'Priya Desai',
            products: [
              { productId: 'prod1', productName: 'Organic Fertilizer', quantity: 1, price: 1200 },
              { productId: 'prod3', productName: 'Premium Seeds Pack', quantity: 2, price: 500 }
            ],
            status: 'pending',
            total: 2200,
            createdAt: new Date(Date.now() - 43200000), // 12 hours ago
            updatedAt: new Date(Date.now() - 43200000),
            address: {
              street: '22 Green Gardens',
              city: 'Sangli',
              state: 'Maharashtra',
              postalCode: '416416',
              country: 'India'
            }
          }
        ] as Order[];

        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let result = orders;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(search) ||
        order.userName.toLowerCase().includes(search) ||
        order.userEmail.toLowerCase().includes(search) ||
        order.products.some(p => p.productName.toLowerCase().includes(search))
      );
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [orders, statusFilter, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: 'processing' | 'completed' | 'cancelled') => {
    try {
      // In a real app, this would update in Firebase
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date() } 
          : order
      );
      
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (isLoading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-green-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h1>
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  placeholder="Search by order ID, customer, or product..."
                  value={searchTerm}
                  onChange={handleSearch}
                  fullWidth
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Orders Table */}
        {currentOrders.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.userName}</div>
                          <div className="text-sm text-gray-500">{order.userEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.createdAt.toLocaleDateString()}<br />
                          {order.createdAt.toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          ₹{order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewOrder(order.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {order.status === 'pending' && (
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, 'processing')}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {order.status === 'processing' && (
                              <Button 
                                size="sm"
                                variant="outline"
                                className="border-green-500 text-green-600 hover:bg-green-50"
                                onClick={() => handleUpdateStatus(order.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                            
                            {(order.status === 'pending' || order.status === 'processing') && (
                              <Button 
                                size="sm"
                                variant="danger"
                                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(indexOfLastOrder, filteredOrders.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredOrders.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-green-50 border-green-500 text-green-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">
              No orders found. {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters.' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;