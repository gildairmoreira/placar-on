'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { LEAGUE_CATEGORIES, CATEGORIZED_LEAGUES, LEAGUES, LeagueCategory } from '../utils/api';
import { ImageWithFallback } from './ImageWithFallback';

function NavigationContent() {
  return (
    <div className="flex flex-col space-y-4">
      {(Object.keys(LEAGUE_CATEGORIES) as LeagueCategory[]).map((categoryKey) => {
        const leagues = CATEGORIZED_LEAGUES[categoryKey]
          .map(leagueId => LEAGUES[leagueId])
          .filter(Boolean);

        if (leagues.length === 0) return null;

        return (
          <div key={categoryKey} className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-200 px-4">
              {LEAGUE_CATEGORIES[categoryKey]}
            </h2>
            <div className="space-y-1">
              {leagues.map((league) => (
                <Link
                  key={league.id}
                  href={`/leagues/${Object.keys(LEAGUES).find(key => 
                    LEAGUES[key].id === league.id
                  )?.toLowerCase()}`}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-6 h-6">
                      <ImageWithFallback
                        src={league.logo}
                        alt={league.name}
                        fill
                        className="object-contain"
                        sizes="24px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">{league.name}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="relative w-3 h-3">
                          <ImageWithFallback
                            src={league.flag}
                            alt={league.country}
                            fill
                            className="object-contain rounded-sm"
                            sizes="12px"
                          />
                        </div>
                        <span className="text-xs text-gray-400">{league.country}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Navigation() {
  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-gray-800 p-0 pt-4">
            <NavigationContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
        <NavigationContent />
      </div>
    </>
  );
} 