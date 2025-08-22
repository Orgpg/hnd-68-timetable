"use client";

import { useState, useEffect } from "react";
import { getCurrentDay, getTomorrowDay } from "@/lib/utils/date-utils";
import {
  Clock,
  Calendar,
  MapPin,
  Sunrise,
  GraduationCap,
  User,
} from "lucide-react";
import Image from "next/image";

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
    <div className="relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-3xl text-gray-800 dark:text-white p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-white/10 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-gray-100/10 dark:before:from-white/10 dark:before:via-transparent dark:before:to-white/5 before:rounded-3xl">
      <div className="absolute inset-0">
        <div className="absolute top-4 right-6 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/15 dark:from-cyan-400/30 dark:to-blue-500/20 rounded-full blur-2xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-6 left-4 w-28 h-28 bg-gradient-to-br from-purple-400/15 to-pink-500/10 dark:from-purple-400/25 dark:to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000 opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-20 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 dark:from-teal-400/15 dark:to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-500 opacity-40"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-gray-300/30 dark:border-white/20 shadow-lg mb-4">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/hero.png"
                alt="Gusto College"
                width={200}
                height={120}
                className="object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-teal-600 dark:text-teal-300" />
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                Year 1, Module 1
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Program Leader - Daw Yee Mon
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Your personalized class schedule with real-time updates.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3 bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-gray-300/30 dark:border-white/20 shadow-lg">
            <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-300 drop-shadow-sm" />
            <span className="text-sm font-bold text-gray-800 dark:text-white/90 tracking-wide">
              Myanmar Time
            </span>
            <Sunrise className="h-5 w-5 text-yellow-600 dark:text-yellow-300 drop-shadow-sm" />
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-gray-300/30 dark:border-white/10 shadow-inner">
            <div className="text-2xl xs:text-3xl md:text-6xl font-mono font-black mb-2 tracking-wider">
              <span className="bg-gradient-to-r from-teal-600 via-gray-800 to-cyan-600 dark:from-cyan-300 dark:via-white dark:to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
                {time.toLocaleTimeString("en-US", {
                  timeZone: "Asia/Yangon",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>

            <div className="absolute inset-0 text-2xl xs:text-3xl md:text-6xl font-mono font-black tracking-wider opacity-10 blur-lg bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center justify-center">
              {time.toLocaleTimeString("en-US", {
                timeZone: "Asia/Yangon",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <div className="bg-white/60 dark:bg-white/8 backdrop-blur-xl rounded-2xl px-6 py-3 border border-gray-300/30 dark:border-white/15 shadow-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300 drop-shadow-sm" />
                <span className="text-base font-semibold text-gray-800 dark:text-white/90 tracking-wide">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Today Card */}
          <div className="group relative overflow-hidden bg-white/60 dark:bg-white/8 backdrop-blur-xl rounded-2xl p-5 border border-gray-300/30 dark:border-white/15 hover:border-gray-400/40 dark:hover:border-white/25 transition-all duration-500 hover:scale-105 hover:bg-white/70 dark:hover:bg-white/12 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 to-teal-400/10 dark:from-emerald-400/10 dark:to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-300 uppercase tracking-wider">
                  Today
                </span>
              </div>
              <div className="text-xl font-black text-gray-800 dark:text-white mb-1">
                {currentDay}
              </div>
              <div className="text-sm text-gray-600 dark:text-white/70">
                Current Day
              </div>
            </div>
          </div>

          {/* Tomorrow Card */}
          <div className="group relative overflow-hidden bg-white/60 dark:bg-white/8 backdrop-blur-xl rounded-2xl p-5 border border-gray-300/30 dark:border-white/15 hover:border-gray-400/40 dark:hover:border-white/25 transition-all duration-500 hover:scale-105 hover:bg-white/70 dark:hover:bg-white/12 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/15 to-pink-400/10 dark:from-orange-400/10 dark:to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 rounded-full shadow-lg"></div>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-300 uppercase tracking-wider">
                  Tomorrow
                </span>
              </div>
              <div className="text-xl font-black text-gray-800 dark:text-white mb-1">
                {tomorrowDay}
              </div>
              <div className="text-sm text-gray-600 dark:text-white/70">
                Next Day
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-full px-4 py-2 border border-gray-300/30 dark:border-white/10">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Live Myanmar Time Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
