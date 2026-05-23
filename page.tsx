
"use client";

import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronRight,
  Flame,
  Zap,
  Loader2,
  Share2,
  Smartphone,
  Download
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { useAuth, useFirestore, useUser, useDoc } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch real profile from Firestore
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: profile, loading: profileLoading } = useDoc<any>(userDocRef);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Apna Partner',
          text: 'Find your life partner in Jharkhand on Apna Partner!',
          url: window.location.origin,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({ title: "Link Copied!", description: "Share it with your friends." });
    }
  };

  const displayName = profile?.name || user?.displayName || "User";
  const displayAge = profile?.age ? `, ${profile.age}` : "";
  const displayDistrict = profile?.district || "Location not set";
  const profileImage = profile?.imageUrl || PlaceHolderImages[1].imageUrl;

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* User Header Card */}
      <div className="bg-white p-6 pb-8 flex flex-col items-center shadow-sm">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-accent">
            <Avatar className="w-full h-full border-4 border-white">
              <AvatarImage src={profileImage} className="object-cover" />
              <AvatarFallback>{displayName[0]}</AvatarFallback>
            </Avatar>
            {profileLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
          </div>
          <Link href="/profile/create" className="absolute bottom-0 right-0 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary border">
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </div>
        <h2 className="text-2xl font-headline font-bold">{displayName}{displayAge}</h2>
        <p className="text-muted-foreground text-sm">{displayDistrict}</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Install Guide Action */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="w-full h-14 rounded-2xl tinder-gradient gap-3 font-bold shadow-lg shadow-primary/20"
            >
              <Download className="w-5 h-5" />
              Install App on Phone
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline text-primary">App Kaise Download Karein?</DialogTitle>
              <DialogDescription className="text-base pt-4">
                Yeh ek Web App hai, ise install karne ke liye:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Smartphone className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold">Android Users (Chrome)</h4>
                  <p className="text-sm text-muted-foreground">Upar right side mein <span className="font-bold">3 dots</span> par click karein aur <span className="text-primary font-bold">"Install app"</span> chunein.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Share2 className="text-pink-600" />
                </div>
                <div>
                  <h4 className="font-bold">iPhone Users (Safari)</h4>
                  <p className="text-sm text-muted-foreground">Niche <span className="font-bold">Share button</span> par click karein aur <span className="text-primary font-bold">"Add to Home Screen"</span> chunein.</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share App Action */}
        <Button 
          variant="outline" 
          className="w-full h-14 rounded-2xl bg-white border-2 border-primary/10 gap-3 font-bold shadow-sm"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5 text-primary" />
          Share with Friends
        </Button>

        {/* Premium Banner */}
        <Link href="/premium" className="block tinder-gradient rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Flame className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <h3 className="text-xl font-bold">Apna Partner Gold</h3>
            </div>
            <p className="text-white/80 text-sm mb-4">See who likes you & more!</p>
            <Button variant="secondary" className="rounded-full font-bold">UPGRADE NOW</Button>
          </div>
        </Link>

        {/* Discovery Settings */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-bold text-primary">Discovery Settings</h3>
          </div>
          <div className="p-4 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Maximum Distance</span>
                <span className="text-sm text-primary font-bold">80km</span>
              </div>
              <Slider defaultValue={[80]} max={160} step={5} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Age Range</span>
                <span className="text-sm text-primary font-bold">18 - 35</span>
              </div>
              <Slider defaultValue={[18, 35]} max={100} step={1} />
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Show Me on Apna Partner</p>
                <p className="text-xs text-muted-foreground">Turn this off to hide your profile</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Account Sections */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y">
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Privacy & Safety</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-destructive disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                {isLoggingOut ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium">Log Out</span>
            </div>
          </button>
        </div>

        <div className="text-center py-4">
          <Flame className="w-8 h-8 text-primary/20 mx-auto mb-2" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Version 1.1.0 (Jharkhand Edition)</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
