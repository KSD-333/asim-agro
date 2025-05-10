export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'user' | 'dealer';
  createdAt: Date;
  deliveryInfo?: {
    address: string;
    pincode: string;
    mobileNo: string;
  };
  orders?: Order[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  regularPrice: number;
  dealerPrice: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  deliveryInfo: {
    address: string;
    pincode: string;
    mobileNo: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface DealerApplication {
  id: string;
  userId: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  address: Address;
  businessType: string;
  taxId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}