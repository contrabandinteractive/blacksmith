"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Marketplace() {
  const [category, setCategory] = useState('All');

  const nfts = [
    { id: 1, category: 'Characters', name: 'Hero', price: 10, image: '/images/hero.webp' },
    { id: 2, category: 'Items', name: 'Magic Wand', price: 5, image: '/images/wand.webp' },
    { id: 3, category: 'Weapons', name: 'Sword', price: 20, image: '/images/sword.webp' },
    { id: 4, category: 'Accessories', name: 'Shield', price: 15, image: '/images/shield.webp' },
    { id: 5, category: 'Backgrounds', name: 'Castle', price: 8, image: '/images/castle.webp' },
    { id: 6, category: 'Special effects', name: 'Fireball', price: 12, image: '/images/fireball.webp' },
    // Add more NFTs here
  ];

  const categories = ['All', 'Characters', 'Items', 'Weapons', 'Accessories', 'Backgrounds', 'Special effects'];

  const filteredNfts = category === 'All' ? nfts : nfts.filter(nft => nft.category === category);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <Head>
        <title>Blacksmith - NFT Marketplace</title>
      </Head>
      <header className="mb-8">
        <div className="flex justify-center items-center pb-[20px] pt-[60px]">
        <img src="logo.png" className="max-w-[500px] w-[100%]" />
        </div>
      </header>
      <nav className="mb-8">
        <ul className="flex justify-center space-x-4">
          {categories.map(cat => (
            <li key={cat}>
              <button
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full ${category === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredNfts.map(nft => (
            <motion.div
              key={nft.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900">{nft.name}</h2>
                <p className="text-gray-600">{nft.category}</p>
                <p className="text-gray-800 font-semibold mt-2">{nft.price} TFUEL</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}