import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <header className="w-full max-w-7xl flex justify-between items-center mb-12">
        <Link href="/" className="text-2xl font-bold">Reimagined Apple</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/products" className="hover:text-gray-600">Products</Link></li>
            <li><Link href="#" className="hover:text-gray-600">Services</Link></li>
            <li><Link href="#" className="hover:text-gray-600">Support</Link></li>
          </ul>
        </nav>
      </header>

      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Reimagined Apple Store</h1>
        <p className="text-xl text-gray-600 mb-8">Discover innovative products that enrich your digital life.</p>
        <Link href="/products" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
          Explore Our Products
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">MacBook Air</h2>
          <p className="mb-4">Supercharged by M2</p>
          <Link href="/products" className="text-blue-500 hover:text-blue-600">Learn more &gt;</Link>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">iPhone 13</h2>
          <p className="mb-4">Your new superpower</p>
          <Link href="#" className="text-blue-500 hover:text-blue-600">Learn more &gt;</Link>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">iPad Pro</h2>
          <p className="mb-4">Supercharged by M1</p>
          <Link href="#" className="text-blue-500 hover:text-blue-600">Learn more &gt;</Link>
        </div>
      </section>

      <footer className="w-full max-w-7xl text-center text-gray-600">
        <p>&copy; 2024 Reimagined Apple. All rights reserved.</p>
      </footer>
    </main>
  )
}