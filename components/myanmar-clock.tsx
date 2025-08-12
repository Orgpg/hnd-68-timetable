"use client";

import { useState, useEffect } from "react";
import { getCurrentDay, getTomorrowDay } from "@/lib/utils/date-utils";
import { Clock, Calendar, MapPin, Sunrise } from "lucide-react";

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
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-purple-500/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-3 right-3 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-3 left-3 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-100">
              Myanmar Time
            </span>
            <Sunrise className="h-4 w-4 text-yellow-400" />
          </div>
        </div>

        {/* Main Time Display */}
        <div className="text-center mb-5">
          <div className="relative">
            <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-black mb-3 tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                {time.toLocaleTimeString("en-US", {
                  timeZone: "Asia/Yangon",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>

            {/* Glowing effect */}
            <div className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl font-mono font-black tracking-wider opacity-20 blur-sm">
              {time.toLocaleTimeString("en-US", {
                timeZone: "Asia/Yangon",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </div>
          </div>

          {/* Date Display */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-300" />
                <span className="text-sm sm:text-base font-medium text-purple-100">
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

        {/* Day Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Today Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
                  Today
                </span>
              </div>
              <div className="text-lg font-bold text-emerald-100">
                {currentDay}
              </div>
              <div className="text-xs text-emerald-200/80 mt-1">
                Current Day
              </div>
            </div>
          </div>

          {/* Tomorrow Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-xs font-semibold text-orange-300 uppercase tracking-wide">
                  Tomorrow
                </span>
              </div>
              <div className="text-lg font-bold text-orange-100">
                {tomorrowDay}
              </div>
              <div className="text-xs text-orange-200/80 mt-1">Next Day</div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Clock className="h-3 w-3" />
            <span>Live Myanmar Time Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
