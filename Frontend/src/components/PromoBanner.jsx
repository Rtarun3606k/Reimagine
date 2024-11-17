import React from 'react';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <div className="w-full bg-gray-900 text-white text-sm py-3">
      <div className="max-w-[980px] mx-auto px-4 text-center">
        <p>
          Get iPhone 15 from $29.12/mo. for 24 mo. or $699 before trade‑in
          <Link to="/shop/iphone" className="text-blue-500 hover:underline ml-2">
            Buy &gt;
          </Link>
        </p>
      </div>
    </div>
  );
}