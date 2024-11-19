import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="relative z-10 text-center space-y-4 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight [text-shadow:_0_1px_30px_rgb(255_255_255_/_60%)]">
            Revolutionizing Connections
          </h1>
          <p className="text-xl md:text-2xl text-white [text-shadow:_0_1px_15px_rgb(255_255_255_/_40%)]">
            Where Innovation Meets Mobile Excellence
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white [text-shadow:_0_1px_20px_rgb(255_255_255_/_40%)]">Our Story</h2>
              <p className="text-white leading-relaxed [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]">
                In the heart of a bustling city, amidst the hum of endless possibilities, Tarun Nayak envisioned a world where technology wasn't just a tool but an art that empowered lives. Frustrated with the monotony and lack of user-centric innovation in mobile technology, he dared to ask a bold question: What if a phone could truly reflect the soul of its user?
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white [text-shadow:_0_1px_20px_rgb(255_255_255_/_40%)]">Our Vision</h2>
              <p className="text-white leading-relaxed [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]">
                At Nayak Technologies, we believe that a mobile phone should be more than just a device — it should be an extension of who you are. Our vision is to lead the industry with groundbreaking innovations that transform the way people connect and interact with technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1d2b41] p-8 rounded-3xl space-y-4 group cursor-pointer hover:bg-[#2a3d5a] transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-white [text-shadow:_0_1px_15px_rgb(255_255_255_/_30%)]">Unmatched Innovation</h3>
              <p className="text-white [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]">Pioneering cutting-edge technologies that anticipate user needs and surpass expectations.</p>
              <div className="text-2xl text-white group-hover:rotate-45 transition-transform duration-300">+</div>
            </div>
            <div className="bg-zinc-800 p-8 rounded-3xl space-y-4 group cursor-pointer hover:bg-zinc-700 transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-white [text-shadow:_0_1px_15px_rgb(255_255_255_/_30%)]">Sustainability</h3>
              <p className="text-white [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]">Crafting phones with eco-conscious materials and processes, ensuring we give back to the planet.</p>
              <div className="text-2xl text-white group-hover:rotate-45 transition-transform duration-300">+</div>
            </div>
            <div className="bg-[#8B4000] p-8 rounded-3xl space-y-4 group cursor-pointer hover:bg-[#a04800] transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-white [text-shadow:_0_1px_15px_rgb(255_255_255_/_30%)]">Customization</h3>
              <p className="text-white [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]">Empowering users with phones that adapt to their preferences and lifestyles.</p>
              <div className="text-2xl text-white group-hover:rotate-45 transition-transform duration-300">+</div>
            </div>
            <div className="bg-purple-900 p-8 rounded-3xl space-y-4 group cursor-pointer hover:bg-purple-800 transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-white [text-shadow:_0_1px_15px_rgb(255_255_255_/_30%)]">Global Connectivity</h3>
              <p className="text-white [text-shadow:_0_1px_10px_rgb(255_255_255_/_20%)]">Breaking barriers to bring seamless communication to every corner of the world.</p>
              <div className="text-2xl text-white group-hover:rotate-45 transition-transform duration-300">+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white [text-shadow:_0_1px_20px_rgb(255_255_255_/_40%)]">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About