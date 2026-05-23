
"use client";

import { useState } from 'react';
import { Heart, X, Info, MapPin, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  district: string;
  bio: string;
  imageUrl: string;
  interests?: string[];
  isPremium?: boolean;
  distance?: number;
  compatibility?: number;
}

export function SwipeCard({ user, onSwipeRight, onSwipeLeft }: { 
  user: UserProfile; 
  onSwipeRight: () => void; 
  onSwipeLeft: () => void;
}) {
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);

  const handleAction = (dir: 'left' | 'right') => {
    setSwipeDir(dir);
    setTimeout(() => {
      if (dir === 'left') onSwipeLeft();
      else onSwipeRight();
      setSwipeDir(null);
    }, 300);
  };

  return (
    <div className={cn(
      "absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white select-none transition-all duration-300 ease-out",
      swipeDir === 'left' && "-translate-x-full -rotate-12 opacity-0",
      swipeDir === 'right' && "translate-x-full rotate-12 opacity-0"
    )}>
      <Image 
        src={user.imageUrl || 'https://picsum.photos/seed/dating1/600/800'} 
        alt={user.name}
        fill
        className="object-cover"
        priority
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      {/* AI Compatibility Badge */}
      <div className="absolute top-6 left-6 z-10">
        <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-3 py-1.5 gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          {user.compatibility || 85}% AI Match
        </Badge>
      </div>

      {/* Like/Nope Overlays */}
      <div className={cn(
        "absolute top-20 left-10 border-4 border-green-500 rounded-xl px-5 py-2 transform -rotate-12 transition-opacity duration-150 z-20",
        swipeDir === 'right' ? "opacity-100" : "opacity-0"
      )}>
        <span className="text-green-500 text-5xl font-black italic uppercase">LIKE</span>
      </div>
      <div className={cn(
        "absolute top-20 right-10 border-4 border-red-500 rounded-xl px-5 py-2 transform rotate-12 transition-opacity duration-150 z-20",
        swipeDir === 'left' ? "opacity-100" : "opacity-0"
      )}>
        <span className="text-red-500 text-5xl font-black italic uppercase">NOPE</span>
      </div>

      {/* User Details */}
      <div className="absolute bottom-0 left-0 right-0 p-10 text-white space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-4xl font-headline font-bold">{user.name}, {user.age}</h3>
            {user.isPremium && <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />}
          </div>
          <div className="flex items-center text-white/80 gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold tracking-tight">
              {user.district}, JH {user.distance !== undefined ? `• ${user.distance} km away` : ''}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-base line-clamp-3 text-white/90 leading-relaxed font-medium italic drop-shadow-sm">
            "{user.bio}"
          </p>
          <div className="flex flex-wrap gap-2">
            {user.interests?.slice(0, 3).map(interest => (
              <Badge key={interest} variant="secondary" className="bg-white/10 text-white border-none backdrop-blur-md px-3 py-1">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Info Button Overlay */}
      <div className="absolute bottom-32 right-8">
        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
          <Info className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
