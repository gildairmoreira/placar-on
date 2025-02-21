'use client';

import Link from 'next/link';
import { Navigation } from './Navigation';
import { ImageWithFallback } from './ImageWithFallback';
import { TeamSearch } from './TeamSearch';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Navigation />
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <ImageWithFallback
                  src="/logo.jpeg"
                  alt="PLACAR ON"
                  fill
                  className="object-contain rounded-full"
                  sizes="32px"
                />
              </div>
              <span className="text-2xl font-bold text-white">PLACAR ON</span>
            </Link>
          </div>

          <div className="hidden md:block w-64">
            <TeamSearch />
          </div>
        </div>
      </div>
    </header>
  );
} 