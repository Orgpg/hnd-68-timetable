"use client";

import { useState, useEffect } from "react";
import { getCurrentDay, getTomorrowDay } from "@/lib/utils/date-utils";
import { Calendar, MapPin, Sunrise, GraduationCap, User } from "lucide-react";
import Image from "next/image";
import { tr } from "date-fns/locale";
import Link from "next/link";

export function MyanmarClock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentDay = getCurrentDay();
  const tomorrowDay = getTomorrowDay();

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4">
      {/* Floating liquid glass background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Main responsive container - desktop: side by side, mobile: stacked */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 lg:gap-12">
        {/* Clock Section - Left on desktop, Top on mobile */}
        <div className="flex-shrink-0">
          <div className="relative w-80 h-80 mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-3xl rounded-full border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
            {/* Enhanced liquid glass background with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-full"></div>
            <div className="absolute inset-2 bg-gradient-to-tl from-white/5 via-transparent to-white/10 rounded-full"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-sm animate-pulse"></div>
            <div className="absolute inset-1 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-3xl"></div>

            {/* Logo at top */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="p-2 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl border border-white/20 dark:border-white/10">
                <Image
                  src="/hero.png"
                  alt="Gusto College"
                  width={100}
                  height={36}
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Time Display - Center with enhanced glass effect */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center p-6 bg-white/10 dark:bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl">
                <div className="text-5xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 tracking-tight">
                  {time.toLocaleTimeString("en-US", {
                    timeZone: "Asia/Yangon",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className="text-xl font-medium text-cyan-400 dark:text-cyan-300">
                  {time
                    .toLocaleTimeString("en-US", {
                      timeZone: "Asia/Yangon",
                      hour12: true,
                    })
                    .slice(-2)}
                </div>

                {/* Enhanced seconds indicator */}
                <div className="mt-3 w-16 h-1.5 bg-white/20 dark:bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${(time.getSeconds() / 60) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Myanmar Time Badge - Bottom with enhanced glass */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 bg-white/15 dark:bg-black/25 backdrop-blur-2xl rounded-full px-4 py-2 border border-white/20 dark:border-white/10 shadow-lg">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Myanmar Time
                </span>
                <Sunrise className="h-4 w-4 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Information Section - Right on desktop, Bottom on mobile */}
        <div className="flex-1 max-w-md mx-auto lg:mx-0 space-y-6">
          {/* Program Info Card with liquid glass */}
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-3xl rounded-3xl border border-white/20 dark:border-white/10 p-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-400/20 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  Year 1, Module 2
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-400/20 rounded-xl backdrop-blur-sm">
                  <User className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  Program Leader - Daw Yee Mon
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">
                Your personalized class schedule with real-time updates.
              </p>
            </div>
          </div>

          {/* Date and Day Cards with enhanced glass */}
          <div className="grid grid-cols-2 gap-4">
            {/* Today */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-3xl rounded-3xl border border-white/20 dark:border-white/10 p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                  Today
                </span>
              </div>
              <div className="font-bold text-xl text-gray-800 dark:text-gray-100">
                {currentDay}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Current Day
              </div>
            </div>

            {/* Tomorrow */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-3xl rounded-3xl border border-white/20 dark:border-white/10 p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full shadow-lg"></div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  Tomorrow
                </span>
              </div>
              <div className="font-bold text-xl text-gray-800 dark:text-gray-100">
                {tomorrowDay}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Next Day
              </div>
            </div>
          </div>

          {/* Current Date with enhanced glass */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 dark:bg-black/20 backdrop-blur-3xl rounded-full px-6 py-3 border border-white/20 dark:border-white/10 shadow-xl">
              <div className="p-1.5 bg-purple-400/20 rounded-full backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {time.toLocaleDateString("en-US", {
                  timeZone: "Asia/Yangon",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
