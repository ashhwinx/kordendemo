import { Product, ProductCategory, ServiceItem, NavLink } from './types';
import { Cpu, Factory, Globe, Zap, Microchip, Layers, Wifi, Battery, Search } from 'lucide-react';

export const COMPANY_INFO = {
  name: "Korden Technologies",
  address: "1204, Tech Park, Andheri East, Mumbai, Maharashtra 400093",
  email: "connect@korden.tech",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  founded: "2024"
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Global Sourcing',
    description: 'We leverage a vast network of authorized distributors across Asia and Europe to procure hard-to-find electronic components.',
    icon: 'Globe'
  },
  {
    id: 's2',
    title: 'PCB Assembly',
    description: 'End-to-end manufacturing solutions from prototype to mass production with state-of-the-art SMT lines.',
    icon: 'Layers'
  },
  {
    id: 's3',
    title: 'Supply Chain Management',
    description: 'Just-in-time delivery systems designed to optimize your inventory costs and reduce production downtime.',
    icon: 'Factory'
  },
  {
    id: 's4',
    title: 'Quality Testing',
    description: 'Rigorous counterfeit detection and functional testing in our Mumbai lab ensuring 100% authentic components.',
    icon: 'Search'
  }
];

// Helper to generate products
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = Object.values(ProductCategory);
  
  for (let i = 1; i <= 30; i++) {
    const category = categories[i % categories.length];
    products.push({
      id: `prod-${i}`,
      name: `K-Tech ${category.split(' ')[0]} Series ${100 + i}`,
      category: category,
      description: `High-performance ${category.toLowerCase()} solution for industrial and consumer electronics. Designed for durability and efficiency.`,
      image: `https://picsum.photos/400/300?random=${i}`,
      specs: ['Industrial Grade', 'RoHS Compliant', 'High Efficiency']
    });
  }
  return products;
};

export const PRODUCTS = generateProducts();