import React, { useState, useMemo } from 'react';
import { ShieldAlert, Check, Calendar, ChevronRight, FileText, Search, Filter, ShieldCheck, Download } from 'lucide-react';
import { TransparencyLog } from '../types';
import { Language, translations } from '../translations';
import { motion, AnimatePresence } from 'motion/react';

interface LogsTabProps {
  lang: Language;
  logs: TransparencyLog[];
}

export default function LogsTab({ lang, logs }: LogsTabProps) {
  const t = translations[lang];
  const [filterType, setFilterType] = useState<'all' | 'technical' | 'financial' | 'legal'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = useMemo(() => {
    let result = [...logs];

    // Typology filter
    if (filterType !== 'all') {
      result = result.filter(log => log.category === filterType);
    }

    // Text query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(log => 
        log.titleAr.toLowerCase().includes(q) || 
        log.titleEn.toLowerCase().includes(q) || 
        log.descriptionAr.toLowerCase().includes(q) || 
        log.descriptionEn.toLowerCase().includes(q)
      );
    }

    return result;
  }, [logs, filterType, searchQuery]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* 1. Header and search row */}
      <div className={`flex flex-col xl:flex-row xl:items-end justify-between gap-6
        ${lang === 'ar' ? 'xl:flex-row' : 'xl:flex-row-reverse'}
      `}>
        <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-2xl font-black text-slate-800 font-kufi">{t.transparencyLogs}</h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl font-body-md leading-relaxed">
            {lang === 'ar' 
              ? 'تلتزم أوربان إنفست بالشفافية المطلقة. نقوم بتوثيق كافة مراحل البناء والتحويلات المالية بالصوت والصورة والمستندات القانونية والمحاسبية.'
              : 'UrbanInvest guarantees complete structural and operational transparency. Review third-party inspection audits, architectural certifications, and financial disclosures.'
            }
          </p>
        </div>

        {/* Action controllers */}
        <div className={`flex flex-wrap items-center gap-4 py-1
          ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
        `}>
          {/* Quick filter input */}
          <div className={`flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64 shadow-sm
            ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
          `}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'ابحث في السجلات الميدانية...' : 'Search transparency history...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-slate-700 mx-2
                ${lang === 'ar' ? 'text-right' : 'text-left'}
              `}
            />
          </div>

          {/* Quick filter types */}
          <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm text-xs font-bold leading-none select-none">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md transition-all ${filterType === 'all' ? 'bg-[#0A73DF] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {lang === 'ar' ? 'الكل' : 'All'}
            </button>
            <button 
              onClick={() => setFilterType('technical')}
              className={`px-3 py-1.5 rounded-md transition-all ${filterType === 'technical' ? 'bg-[#0A73DF] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {lang === 'ar' ? 'إنشائي' : 'Technical'}
            </button>
            <button 
              onClick={() => setFilterType('financial')}
              className={`px-3 py-1.5 rounded-md transition-all ${filterType === 'financial' ? 'bg-[#0A73DF] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {lang === 'ar' ? 'مالي' : 'Financial'}
            </button>
            <button 
              onClick={() => setFilterType('legal')}
              className={`px-3 py-1.5 rounded-md transition-all ${filterType === 'legal' ? 'bg-[#0A73DF] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {lang === 'ar' ? 'قانوني' : 'Legal'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Timeline cards row and checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Logs feed - 8 columns */}
        <div className="lg:col-span-8 space-y-6 select-none">
          <AnimatePresence mode="popLayout">
            {filteredLogs.map((log) => {
              const categoryColors = {
                technical: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                financial: 'bg-indigo-50 text-indigo-700 border-indigo-100',
                legal: 'bg-amber-50 text-amber-700 border-amber-100',
              }[log.category] || 'bg-slate-50 text-slate-700 border-slate-100';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key={log.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4
                    ${lang === 'ar' ? 'sm:flex-row' : 'sm:flex-row-reverse'}
                  `}>
                    <div className={`flex items-center gap-3
                      ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                    `}>
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        <span className="text-[10px] text-slate-400 font-bold font-mono uppercase block">{lang === 'ar' ? log.timeAr : log.timeEn}</span>
                        <h3 className="font-extrabold text-sm text-slate-800 font-kufi">
                          {lang === 'ar' ? log.titleAr : log.titleEn}
                        </h3>
                      </div>
                    </div>

                    {/* Category pill label */}
                    <span className={`text-[10px] uppercase font-black tracking-wider px-3 py-1 border rounded-full font-kufi ${categoryColors}`}>
                      {log.category.toUpperCase()}
                    </span>
                  </div>

                  <p className={`text-xs text-slate-500 leading-relaxed font-body-md mb-4
                    ${lang === 'ar' ? 'text-right' : 'text-left'}
                  `}>
                    {lang === 'ar' ? log.descriptionAr : log.descriptionEn}
                  </p>

                  {/* Multi images list */}
                  {log.images && log.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {log.images.map((src, idx) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden group aspect-video bg-slate-100 cursor-zoom-in">
                          <img 
                            src={src} 
                            alt="Audit document image" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Sidebar Certifications Overview panel - 4 columns */}
        <div className="lg:col-span-4">
          <div className="bg-[#0A73DF]/5 border border-[#0A73DF]/10 rounded-xl p-6 space-y-6 select-none">
            <div className={`flex items-center gap-2
              ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
            `}>
              <ShieldCheck className="w-6 h-6 text-[#0A73DF]" />
              <h3 className="font-black text-slate-900 text-sm font-kufi">{lang === 'ar' ? 'الامتثال والتراخيص والاعتمادات' : 'Compliance & Licensing Assets'}</h3>
            </div>

            <div className={`space-y-4 text-xs font-semibold text-slate-700
              ${lang === 'ar' ? 'text-right' : 'text-left'}
            `}>
              <div className="p-4 bg-white border border-slate-100 rounded-lg space-y-1">
                <p className="text-[#0a73e0] text-[10px] font-bold uppercase font-mono">Ministry of Commerce</p>
                <h4 className="font-bold text-slate-950 font-kufi">{lang === 'ar' ? 'ترخيص رقم: ١٠٣٩٤' : 'License ID #10394'}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{lang === 'ar' ? 'ترخيص استيراد وتسويق واستثمار مالي معتمد.' : 'Registered legal property management trust license.'}</p>
              </div>

              <div className="p-4 bg-white border border-slate-100 rounded-lg space-y-1">
                <p className="text-[#0a73e0] text-[10px] font-bold uppercase font-mono">Wafi Program (واهبي)</p>
                <h4 className="font-bold text-slate-950 font-kufi">{lang === 'ar' ? 'رخصة البيع على الخارطة' : 'Off-Plan Sales Certification'}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{lang === 'ar' ? 'موافقات رسمية للطلب على الخارطة والمشاريع قبل التنفيذ.' : 'Fully compliant with National Off-Plan Development standards.'}</p>
              </div>

              <div className="p-4 bg-white border border-slate-100 rounded-lg space-y-1">
                <p className="text-[#0a73e0] text-[10px] font-bold uppercase font-mono">SREB (هيئة العقار)</p>
                <h4 className="font-bold text-slate-950 font-kufi">{lang === 'ar' ? 'هيئة المقيمين السعوديين' : 'Saudi Authority for Accredited Valuers'}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{lang === 'ar' ? 'تقييم مستقل للأصول لتقديم دراسة الجدوى وتحديد السعر العادل.' : 'Independent valuation audit reviews.'}</p>
              </div>
            </div>

            <button 
              onClick={() => alert(lang === 'ar' ? 'تحميل الأوراق والموافقات التنظيمية الحكومية...' : 'Downloading combined state sandbox compliance certificates zip file...')}
              className="w-full bg-[#0a73e0] hover:bg-[#005ab4] text-white py-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 font-kufi cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تحميل كل ملفات التراخيص' : 'Download All Certifications'}</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
