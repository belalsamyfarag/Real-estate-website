import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Landmark, Shield, AlertCircle, Play, 
  Check, Clock, Download, Video, Award, Sliders, PlayCircle
} from 'lucide-react';
import { Project, TransparencyLog } from '../types';
import { Language, translations } from '../translations';
import { motion } from 'motion/react';

interface OverviewTabProps {
  lang: Language;
  projects: Project[];
  logs: TransparencyLog[];
  onSelectProject: (p: Project) => void;
  investedTotal: number;
}

export default function OverviewTab({ lang, projects, logs, onSelectProject, investedTotal }: OverviewTabProps) {
  const t = translations[lang];
  const [selectedCam, setSelectedCam] = useState<'cam1' | 'cam2'>('cam1');
  const [isPlayingStream, setIsPlayingStream] = useState(false);

  // Active highlighted development tracking (Al-Waha or Crystal Tower)
  const mainDev = projects.find(p => p.id === 'p6') || projects[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* 1. Summary Metrics Dashboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 - Total Investment */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <p className="text-slate-400 text-xs font-semibold font-kufi">{t.totalInvestment}</p>
            <h3 className="text-2xl font-black text-[#0B73DF] mt-1 font-mono tracking-wide">
              {investedTotal.toLocaleString()} ر.س
            </h3>
            <p className="text-emerald-600 text-[11px] font-bold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.monthGrowth}</span>
            </p>
          </div>
          <div className="bg-[#eff4ff] p-4 rounded-xl text-[#0B73DF] shrink-0">
            <Landmark className="w-7 h-7" />
          </div>
        </div>

        {/* Metric 2 - Current ROI */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <p className="text-slate-400 text-xs font-semibold font-kufi">{t.annualReturn}</p>
            <h3 className="text-2xl font-black text-[#0B73DF] mt-1 font-mono tracking-wide">14.2%</h3>
            <p className="text-emerald-600 text-[11px] font-bold mt-2 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>{t.overMarket}</span>
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600 shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
        </div>

        {/* Metric 3 - Active Projects */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <p className="text-slate-400 text-xs font-semibold font-kufi">{t.activeProjects}</p>
            <h3 className="text-2xl font-black text-[#0B73DF] mt-1 font-mono tracking-wide">12</h3>
            <p className="text-slate-400 text-[11px] font-medium mt-2">
              {t.citiesDistribution.replace('{count}', '3')}
            </p>
          </div>
          <div className="bg-[#eff4ff] p-4 rounded-xl text-[#0B73DF] shrink-0">
            <Shield className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 2. Main Bento Grid: Progress Metrics & Webcam vs. Timeline Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Area - 8 columns - Progress bar + Live camera stream */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Construction Progress widget */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8
              ${lang === 'ar' ? 'sm:flex-row' : 'sm:flex-row-reverse'}
            `}>
              <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <h2 className="text-lg font-bold text-[#0A73DF] font-kufi select-none">
                  {lang === 'ar' ? 'تطور أعمال الإنشاء: أبراج ريزيدنس ٧' : `Construction Progress: Residence Towers 7`}
                </h2>
                <p className="text-slate-400 text-xs mt-1 font-body-md">{t.lastUpdated}</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 select-none">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                <span>{lang === 'ar' ? 'جاري التنفيذ' : 'In Progress'}</span>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center
              ${lang === 'ar' ? 'md:grid-flow-row' : 'md:grid-flow-row-reverse'}
            `}>
              {/* Circular SVG Progress gauge with dynamic countdown */}
              <div className="relative flex flex-col items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                  {/* Outer circle */}
                  <circle 
                    className="text-slate-100" 
                    cx="96" 
                    cy="96" 
                    r="84" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="12"
                  />
                  {/* Gauge indicator */}
                  <circle 
                    className="text-emerald-500 transition-all duration-1000" 
                    cx="96" 
                    cy="96" 
                    r="84" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="12"
                    strokeDasharray="527" 
                    strokeDashoffset="158" // Represents 70% complete
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center select-none">
                  <span className="text-4xl font-black text-[#0B73DF] font-mono">70%</span>
                  <span className="text-[11px] text-slate-400 font-bold font-kufi mt-1 max-w-[120px]">
                    {t.totalCompletion}
                  </span>
                </div>
              </div>

              {/* Progress Breakdown bar stack details */}
              <div className="space-y-5">
                {/* 1. Structure foundations */}
                <div>
                  <div className={`flex justify-between mb-1.5 text-xs font-bold text-slate-700
                    ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                  `}>
                    <span>{t.foundation}</span>
                    <span className="font-mono">100%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                  </div>
                </div>

                {/* 2. Concrete Structure */}
                <div>
                  <div className={`flex justify-between mb-1.5 text-xs font-bold text-slate-700
                    ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                  `}>
                    <span>{t.concreteStructure}</span>
                    <span className="font-mono">65%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65%] rounded-full"></div>
                  </div>
                </div>

                {/* 3. External Finishing */}
                <div>
                  <div className={`flex justify-between mb-1.5 text-xs font-bold text-slate-700
                    ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                  `}>
                    <span>{t.finishing}</span>
                    <span className="font-mono">42%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[42%] rounded-full"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Live Webcams Feed display */}
          <div className="space-y-4">
            <div className={`flex items-center justify-between
              ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
            `}>
              <h2 className="text-base font-bold text-[#0A73DF] font-kufi flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-500 animate-pulse" />
                <span>{t.liveFeeds}</span>
              </h2>
              {/* Cam Selection Toggles */}
              <div className="flex gap-2">
                <button 
                  onClick={() => { setSelectedCam('cam1'); setIsPlayingStream(true); }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all border
                    ${selectedCam === 'cam1' 
                      ? 'bg-[#0A73DF]/10 text-[#0A73DF] border-[#0A73DF]/20' 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }
                  `}
                >
                  {lang === 'ar' ? 'كاميرا ١' : 'Cam 01'}
                </button>
                <button 
                  onClick={() => { setSelectedCam('cam2'); setIsPlayingStream(true); }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all border
                    ${selectedCam === 'cam2' 
                      ? 'bg-[#0A73DF]/10 text-[#0A73DF] border-[#0A73DF]/20' 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }
                  `}
                >
                  {lang === 'ar' ? 'كاميرا ٢' : 'Cam 02'}
                </button>
              </div>
            </div>

            {/* Webcam video box overlay mockup */}
            <div className="relative group rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-200 shadow-md">
              <img 
                alt="Webcam feed" 
                className={`w-full h-full object-cover transition-transform duration-700 
                  ${isPlayingStream ? 'scale-100' : 'scale-105 filter blur-[1px] brightness-75'}
                `}
                referrerPolicy="no-referrer"
                src={selectedCam === 'cam1' 
                  ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnSACXiS_fbc7QKTMkmDm-kJGBWZRF9-6UfJynDcKc72eLjRrHJM2jtbUgN_QPp0b0aJT8l3hK95K7GxE-i7zmVIOAQOpqqnJnC1pmf9MTOVlT20RsDyVMT2ME1X7lwOtYhhhwgMMpVsjDvNZmhMSehqcCqHenwgHKOk7ZYYAUaOGPSosZfiv7g5s7pWjwWecc0rtfXXnOZdNKPjSBq2haqz3VSlqVhwBBapDFXpQo0s3sxtWv2p6wwklBVXHtGMN8a1fab3ZNAbo'
                  : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkzypV_G91tkxaPRSxWIwzoSqahlrE1hBDoNanmCCtXNVolzan3045MwmhCadBp2i8TCoGjsjPnzHade1hguvyJU0VhCp4yI1CtgeX_TsL35oLxrVu6uEhn-LTHpbT62b9GYcPhC_b5i5EDnioHMBV-KF1PIV_7G2x_auEGfGyILmG7T7OkF4eUKrVdbojVGf8ssG-7SP4UJiKpx56WTE-XAe6WSuUjW1emx5g1bjN3fVBWL-HXarxd_o5KJ2cVpB-MlM82JHcJ_4'
                }
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors"></div>
              
              {/* Simulated video playback button overlay if paused */}
              {!isPlayingStream && (
                <button 
                  onClick={() => setIsPlayingStream(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-950/50 hover:bg-slate-950/40 transition-all gap-2"
                >
                  <PlayCircle className="w-16 h-16 text-emerald-400 drop-shadow-lg shrink-0 animate-bounce" />
                  <span className="text-xs font-bold bg-slate-950/80 px-4 py-1.5 rounded-full select-none font-kufi">
                    {lang === 'ar' ? 'اضغط لتشغيل البث الحي للموقع' : 'Click to stream live site video'}
                  </span>
                </button>
              )}

              {/* LIVE blinking badge red color */}
              {isPlayingStream && (
                <div className={`absolute top-4 bg-rose-600 border border-rose-500/10 text-white font-mono text-[10px] font-black tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1.5 uppercase select-none shadow-md
                  ${lang === 'ar' ? 'right-4' : 'left-4'}
                `}>
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  <span>{t.liveLabel}</span>
                </div>
              )}

              {/* Bottom camera descriptor overlay */}
              <div className={`absolute bottom-4 text-white text-xs font-semibold bg-slate-900/80 backdrop-blur-md px-4 py-2 border border-slate-700/25 rounded-lg
                ${lang === 'ar' ? 'right-4 text-right font-kufi' : 'left-4 text-left'}
              `}>
                {selectedCam === 'cam1' 
                  ? (lang === 'ar' ? 'كاميرا ٠١ - الهيكل والرافعات' : 'Camera 01 - Main structural skeleton')
                  : (lang === 'ar' ? 'كاميرا ٠٢ - التشطيب والتجهيز' : 'Camera 02 - Internal dry fitout & floor')
                }
              </div>

              {isPlayingStream && (
                <button 
                  onClick={() => setIsPlayingStream(false)}
                  className={`absolute top-4 text-xs font-bold text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-950/90 border border-slate-800 px-3 py-1 rounded-md transition-colors
                    ${lang === 'ar' ? 'left-4' : 'right-4'}
                  `}
                >
                  {lang === 'ar' ? 'إيقاف البث' : 'Pause'}
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Area - 4 columns - Timeline log sidebar matching photo timelines */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
            <div className={`flex items-center gap-2 mb-8
              ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
            `}>
              <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
              <h2 className="text-base font-black text-[#0A73DF] font-kufi">{t.milestoneTime}</h2>
            </div>

            <div className="relative flex-1 space-y-6 select-none">
              {/* Timeline line down center with RTL offsets */}
              <div className={`absolute top-2 bottom-2 w-0.5 bg-slate-100
                ${lang === 'ar' ? 'right-[11px]' : 'left-[11px]'}
              `}></div>

              {logs.map((log) => {
                const isCheck = log.type === 'check';
                return (
                  <div key={log.id} className="relative flex items-start gap-4">
                    {/* Circle timeline pin element */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 text-white font-bold
                      ${isCheck ? 'bg-emerald-500' : 'bg-slate-200 text-slate-400'}
                    `}>
                      {isCheck ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </div>

                    {/* Content metadata node */}
                    <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                      <p className="text-[10px] text-slate-400 font-bold mb-1 font-mono">
                        {lang === 'ar' ? log.timeAr : log.timeEn}
                      </p>
                      <h4 className="text-xs font-bold text-[#0A73DF] font-kufi">
                        {lang === 'ar' ? log.titleAr : log.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-body-md">
                        {lang === 'ar' ? log.descriptionAr : log.descriptionEn}
                      </p>

                      {/* Display mini imagery if provided in transparency log (e.g. concrete pours) */}
                      {log.images && log.images.length > 0 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto">
                          {log.images.map((src, idx) => (
                            <img 
                              key={idx} 
                              src={src} 
                              alt="Log inspect view" 
                              className="w-14 h-14 rounded-md object-cover border border-slate-200 hover:scale-105 active:scale-95 transition-transform cursor-zoom-in"
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            <button className="w-full mt-8 py-3 border border-slate-200 hover:bg-slate-50 text-[#0A73DF] hover:text-[#0a73e0] text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 select-none font-kufi">
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadAudit}</span>
            </button>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
