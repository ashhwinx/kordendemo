import React, { useState, useMemo } from 'react';
import { SectionTitle, Card, Button } from '../components/UI';
import { PRODUCTS } from '../constants';
import { ProductCategory } from '../types';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <SectionTitle title="Our Catalog" subtitle="Products" />

      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 justify-between items-center">
          
          {/* Categories */}
          <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                    ? 'bg-purple-600 border-purple-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.4)]' 
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-amber-500/50 hover:text-amber-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Search parts..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors shadow-sm placeholder-slate-600"
             />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group p-0 overflow-hidden flex flex-col h-full hover:border-amber-500/30">
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-black/70 backdrop-blur border border-white/10 text-amber-500 text-xs font-bold px-2 py-1 rounded shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.specs.map(spec => (
                     <span key={spec} className="text-xs text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                       {spec}
                     </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link to="/contact" className="w-full block">
                   <Button variant="secondary" className="w-full text-sm py-2 hover:text-amber-500 hover:border-amber-500/50">Get Quote</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="text-amber-500 mt-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;