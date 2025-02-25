'use client'

import type { Product } from '@/types/products'
import { PRODUCTS } from '@/constants/Products'

import { useState } from 'react'

interface ProductsProps extends Product {
  quantity: number
}

export default function Home() {
  /* const [products, setProducts] = useState<Product[]>(PRODUCTS) */
  const [cart, setCart] = useState<ProductsProps[]>([])

  const handleAddtoCard = (product: Product) => {
    if (cart.find((p) => p.id === product.id)) {
      setCart((prevState: ProductsProps[]) =>
        prevState.map((t: ProductsProps) => {
          if (t.id === product.id) {
            return {
              ...t,
              quantity: t.quantity + 1,
            }
          }
          return t
        })
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const calcTotal = () => {
    return `$ ${cart.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    )}`
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <h1 className='text-4xl font-bold'>Shooping Card</h1>
      <main className='flex w-full justify-center  gap-5 flex-col md:flex-row'>
        <section className='flex flex-col items-center justify-center w-full h-full bg-secondary rounded-lg  py-10'>
          <h1 className='text-2xl font-bold'>Shopping list</h1>
          <ul className='flex flex-col gap-1 w-[80%]'>
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className='flex flex-col  items-center justify-center bg-slate-100 py-5'
              >
                <li>{product.name}</li>
                <li>$ {product.price}</li>
                <button
                  className='bg-blue-300 text-black px-4 py-2 rounded-lg'
                  onClick={() => handleAddtoCard(product)}
                >
                  Add to card
                </button>
              </div>
            ))}
          </ul>
        </section>
        <section className='flex flex-col items-center justify-center w-full h-full bg-secondary rounded-lg py-2 md:py-10'>
          <h1 className='text-2xl font-bold'>Shopping cart</h1>
          <ul className='flex flex-col gap-1 w-[80%]'>
            {cart.map(
              (product) =>
                cart.includes(product) && (
                  <div
                    key={product.id}
                    className='flex flex-col items-center justify-center bg-slate-100 py-4'
                  >
                    <li>Quantity: {product.quantity}</li>
                    <li>Product: {product.name}</li>
                    <li>$ {product.price * product.quantity}</li>
                    <button
                      className='bg-red-300 text-black px-4 py-2 rounded-lg'
                      onClick={() => setCart(cart.filter((p) => p !== product))}
                    >
                      Remove from cart
                    </button>
                  </div>
                )
            )}
          </ul>
        </section>
      </main>
      {cart.length > 0 && (
        <section className='flex flex-col items-center justify-center w-full h-full bg-secondary rounded-lg py-10'>
          <h1 className='text-2xl font-bold'>Total</h1>
          <h1 className='text-4xl font-bold'>{calcTotal().toString()}</h1>
          <button
            className='bg-green-300 text-black px-4 py-2 rounded-lg'
            onClick={() =>
              console.log('Products', cart, calcTotal().toString())
            }
          >
            Buy
          </button>
        </section>
      )}
    </div>
  )
}
