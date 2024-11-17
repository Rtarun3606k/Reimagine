import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { 
    id: 1,
    icon: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010535312",
    label: "iPhone 15 Pro",
    link: "/iphone-15-pro"
  },
  {
    id: 2,
    icon: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-storage-select-202309-6-7inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692924212680",
    label: "iPhone 15",
    link: "/iphone-15"
  },
  {
    id: 3,
    icon: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780078",
    label: "iPhone 15 Plus",
    link: "/iphone-15-plus"
  },
  {
    id: 4,
    icon: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096",
    label: "iPhone 15 Pro Max",
    link: "/iphone-15-pro-max"
  }
];

export default function IPhoneNav() {
  return (
    <nav className="w-full bg-black/90 backdrop-blur-md fixed top-0 z-50">
      <div className="max-w-[980px] mx-auto px-4">
        <div className="flex items-center justify-center py-4 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              to={item.link}
              className="flex flex-col items-center min-w-[120px] px-4 group"
            >
              <div className="w-[80px] h-[80px] rounded-2xl overflow-hidden mb-2">
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}