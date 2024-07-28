"use client";

import React from 'react'
import Navbar from './components/Navbar'
// ****************************************

import { useState } from "react";
import ProductCard from "./components/ProductCard";
import db from "../db.json";

interface Product {
  name: string;
  price: number;
  imageSrc: string;
  quantity: number;
}

interface CartItem extends Product {
  id: number;
}

// ****************************************

export default function Home() {

  // ********************************************************
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [nextItemId, setNextItemId] = useState(1);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, { ...product, id: nextItemId }]);
    setNextItemId(nextItemId + 1);
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  // *********************************************************** 
  return (
    <>
      <Navbar />
      <div className='flex'>
        <div>

          <div className='text-3xl font-bold '>รายการรถยนต์</div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-2 gap-4'>
            {db.menu.map((item, index) => (
              <ProductCard
                key={index}
                imageSrc={item.image}
                name={item.name}
                price={item.price}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
        {/* -------------------ตะกร้าสินค้า-----------------------------------  */}
        <section className="w-1/3 pl-2">
          <h2 className="text-3xl font-bold">รายการรถยนต์ที่ต้องการจอง</h2>
          <table className="w-full table-auto bg-gray-800 border">
            <thead>
              <tr className="bg-gray-800 text-white border">
                <th className="px-4 py-2">รายการ</th>
                <th className="px-4 py-2">ราคา</th>
                <th className="px-4 py-2">จำนวน</th>
                <th className="px-4 py-2 text-right">เป็นเงิน</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="flex  px-4 py-2">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="w-16 h-16"
                    />
                    <span className="ml-2">{item.name}</span>
                  </td>
                  <td className="px-4 py-2 text-center">{item.price}</td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 text-end"
                    />
                  </td>
                  <td className="px-4 py-2 text-right ">
                    $ {(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-700 hover:scale-110 text-white font-bold py-2 px-4 rounded"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <section className="flex justify-end items-center bg-slate-600 border">
            <div className="py-2 text-right font-bold text-lg text-white">
              รวมเงิน:
            </div>
            <div className="px-4 py-2 font-bold text-2xl text-white">
              {" "}
              {calculateTotal().toFixed(2)}
            </div>
          </section>
          {/* -------------------ตะกร้าสินค้า-----------------------------------  */}
        </section>

      </div>



    </>
  );
}