export interface ProductSize {
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: ProductSize[];
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Seeds',
    description: 'High-quality seeds for better yield',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'seeds',
    sizes: [
      { size: '1kg', price: 299, stock: 50 },
      { size: '5kg', price: 1299, stock: 20 },
      { size: '10kg', price: 2299, stock: 10 }
    ]
  },
  {
    id: '2',
    name: 'Organic Fertilizer',
    description: 'Natural fertilizer for healthy crops',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fertilizer',
    sizes: [
      { size: '5kg', price: 499, stock: 30 },
      { size: '10kg', price: 899, stock: 15 },
      { size: '25kg', price: 1999, stock: 8 }
    ]
  },
  {
    id: '3',
    name: 'Farm Tools',
    description: 'Essential tools for modern farming',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'tools',
    sizes: [
      { size: 'Basic Set', price: 999, stock: 20 },
      { size: 'Professional Set', price: 2499, stock: 10 }
    ]
  }
]; 