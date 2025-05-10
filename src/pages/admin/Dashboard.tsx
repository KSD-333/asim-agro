import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package, Users, ShoppingBag, DollarSign, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card, { CardContent } from '../../components/ui/Card';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { Order, SalesData } from '../../types';
import Papa from 'papaparse';

const AdminDashboard: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    // Redirect if not admin
    if (userData && userData.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // This is mock data for demonstration
        // In a real app, this would fetch from Firebase
        
        // Mock sales data
        const mockSalesData = [
          { date: 'Jan', revenue: 12000, orders: 45 },
          { date: 'Feb', revenue: 19000, orders: 55 },
          { date: 'Mar', revenue: 22000, orders: 70 },
          { date: 'Apr', revenue: 18000, orders: 60 },
          { date: 'May', revenue: 24000, orders: 78 },
          { date: 'Jun', revenue: 29000, orders: 90 },
        ];
        
        // Mock recent orders
        const mockRecentOrders = [
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
          }
        ] as Order[];

        setSalesData(mockSalesData);
        setRecentOrders(mockRecentOrders);
        setTotalOrders(145);
        setTotalProducts(67);
        setTotalUsers(210);
        setTotalRevenue(124000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleExportCSV = () => {
    // Filter orders for the selected month
    // In a real app, this would filter from the database
    const ordersToExport = recentOrders;
    
    const csvData = ordersToExport.map(order => ({
      'Order ID': order.id,
      'Customer': order.userName,
      'Email': order.userEmail,
      'Date': order.createdAt.toLocaleDateString(),
      'Status': order.status,
      'Total': `₹${order.total.toFixed(2)}`,
      'Items': order.products.map(p => `${p.quantity}x ${p.productName}`).join(', '),
      'Address': `${order.address.street}, ${order.address.city}, ${order.address.state}`
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `orders-${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-green-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <ShoppingBag className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          {/* Total Products */}
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Total Products</p>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Package className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          {/* Total Users */}
          <Card className="bg-gradient-to-br from-blue-500 to-sky-600 text-white">
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{totalUsers}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          {/* Total Revenue */}
          <Card className="bg-gradient-to-br from-orange-500 to-amber-600 text-white">
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <DollarSign className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sales Chart */}
        <Card className="mb-8">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Sales Overview</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                <Button 
                  onClick={handleExportCSV}
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#4CAF50" />
                  <YAxis yAxisId="right" orientation="right" stroke="#2196F3" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#4CAF50" />
                  <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Orders */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
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
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;