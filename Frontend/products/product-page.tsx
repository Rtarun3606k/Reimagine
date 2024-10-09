'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Circle } from 'lucide-react'

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState('Silver')

  const colors = [
    { name: 'Silver', class: 'bg-gray-200' },
    { name: 'Space Gray', class: 'bg-gray-700' },
    { name: 'Gold', class: 'bg-yellow-100' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="currentColor"/>
          </svg>
          <div className="hidden sm:flex space-x-8">
            <a href="#" className="text-sm font-medium hover:text-gray-600">Mac</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">iPad</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">iPhone</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">Watch</a>
          </div>
          <button className="text-sm font-medium hover:text-gray-600">
            <Circle className="w-5 h-5" />
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight">MacBook Air</h1>
            <p className="text-xl text-gray-500">Supercharged by M2</p>
            <p className="text-gray-700">
              The new MacBook Air is strikingly thin and brings exceptional speed and power efficiency within its durable all‑aluminum enclosure.
            </p>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Choose your finish</h2>
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.class} ${selectedColor === color.name ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Selected: {selectedColor}</p>
            </div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
              Add to Cart
            </button>
          </div>
          <div className="relative">
            <motion.img
              src="/placeholder.svg?height=600&width=800"
              alt="MacBook Air"
              className="w-full h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center">
            <Circle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All-Day Battery Life</h3>
            <p className="text-gray-600">Up to 18 hours of battery life so you can go longer than ever before.</p>
          </div>
          <div className="text-center">
            <Circle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Incredible Performance</h3>
            <p className="text-gray-600">8-core CPU delivers up to 3.5x faster performance than the previous generation.</p>
          </div>
          <div className="text-center">
            <Circle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Stunning Retina Display</h3>
            <p className="text-gray-600">13.3-inch Retina display with 500 nits of brightness and P3 wide color.</p>
          </div>
        </motion.div>

        <div className="mt-24 text-center">
          <a href="#" className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors">
            Learn more about MacBook Air
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      </main>
    </div>
  )
}