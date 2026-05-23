import React, { useState, useMemo } from 'react';
import { 
  Building, Search, Filter, HelpCircle, ArrowLeft, 
  MapPin, CheckCircle, Clock, Heart, Users, ChevronLeft, Calendar, FileText
} from 'lucide-react';
import { Project } from '../types';
import { Language, translations } from '../translations';
import { motion, AnimatePresence } from 'motion/react';

interface CatalogTabProps {
  lang: Language;
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onSuggestClick: () => void;
}

export default function CatalogTab({ lang, projects, onSelectProject, onSuggestClick }: CatalogTabProps) {
  const t = translations[lang];
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'upcoming'>('all');
  const [sortBy, setSortBy] = useState<'roi' | 'target' | 'duration'>('roi');
  const [searchText, setSearchText] = useState('');

  // Local favorites state to make user experience interactive
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Filter and sort computation
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // 1. Text Search
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(p => 
        p.titleAr.toLowerCase().includes(q) || 
        p.titleEn.toLowerCase().includes(q) || 
        p.locationAr.toLowerCase().includes(q) || 
        p.locationEn.toLowerCase().includes(q)
      );
    }

    // 2. Status Filter
    if (filterStatus !== 'all') {
      result = result.filter(p => p.status === filterStatus);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'roi') {
        return b.expectedReturn - a.expectedReturn;
      } else if (sortBy === 'target') {
        return b.targetSAR - a.targetSAR;
      } else if (sortBy === 'duration') {
        return a.termMonths - b.termMonths;
      }
      return 0;
    });

    return result;
  }, [projects, searchText, filterStatus, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* 1. Header and search / filter actions row */}
      <div className={`flex flex-col xl:flex-row xl:items-end justify-between gap-6
        ${lang === 'ar' ? 'xl:flex-row' : 'xl:flex-row-reverse'}
      `}>
        <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-2xl font-black text-slate-900 font-kufi">{t.allProjects}</h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl font-body-md leading-relaxed">
            {t.exploreOpportunities}
          </p>
        </div>

        {/* Filters and search box widgets */}
        <div className={`flex flex-wrap items-center gap-4 py-1
          ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
        `}>
          {/* Quick Search bar */}
          <div className={`flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64 shadow-sm
            ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
          `}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'ابحث حسب المسمى أو المدينة...' : 'Search by name, state...'}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-slate-700 mx-2
                ${lang === 'ar' ? 'text-right' : 'text-left'}
              `}
            />
          </div>

          {/* Status buttons */}
          <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <button 
              onClick={() => setFilterStatus('all')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all
                ${filterStatus === 'all' 
                  ? 'bg-[#0A73DF] text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50'
                }
              `}
            >
              {lang === 'ar' ? 'الكل' : 'All'}
            </button>
            <button 
              onClick={() => setFilterStatus('active')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all
                ${filterStatus === 'active' 
                  ? 'bg-[#0A73DF] text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50'
                }
              `}
            >
              {lang === 'ar' ? 'مباشر' : 'Direct'}
            </button>
            <button 
              onClick={() => setFilterStatus('upcoming')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all
                ${filterStatus === 'upcoming' 
                  ? 'bg-[#0A73DF] text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50'
                }
              `}
            >
              {lang === 'ar' ? 'قاعدم/قريباً' : 'Upcoming'}
            </button>
          </div>

          {/* Sort selection dropdown */}
          <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <button 
              onClick={() => setSortBy('roi')}
              className={`text-xs font-bold px-2.5 py-1.5 rounded-md transition-all ${sortBy === 'roi' ? 'bg-[#0A73DF]/10 text-[#0A73DF]' : 'text-slate-500'}`}
              title="Sort by Returns"
            >
              {lang === 'ar' ? 'الأعلى عائداً' : 'ROI'}
            </button>
            <button 
              onClick={() => setSortBy('target')}
              className={`text-xs font-bold px-2.5 py-1.5 rounded-md transition-all ${sortBy === 'target' ? 'bg-[#0A73DF]/10 text-[#0A73DF]' : 'text-slate-500'}`}
              title="Sort by Target Funding"
            >
              {lang === 'ar' ? 'الهدف المالي' : 'Target'}
            </button>
            <button 
              onClick={() => setSortBy('duration')}
              className={`text-xs font-bold px-2.5 py-1.5 rounded-md transition-all ${sortBy === 'duration' ? 'bg-[#0A73DF]/10 text-[#0A73DF]' : 'text-slate-500'}`}
              title="Sort by Investment Term"
            >
              {lang === 'ar' ? 'أقصر مدة' : 'Term'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Project Catalog responsive columns grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
        
        {/* Render catalog projects */}
        <AnimatePresence mode="popLayout">
          {filteredAndSortedProjects.map((project) => {
            const isFavorite = favorites.includes(project.id);
            const isUpcoming = project.status === 'upcoming';
            const progressPct = Math.min(100, Math.round((project.raisedSAR / project.targetSAR) * 100));

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Thumbnail hero & gallery badge */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img 
                    src={project.imageUrl} 
                    alt={lang === 'ar' ? project.titleAr : project.titleEn} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Status Overlay Badge */}
                  <div className={`absolute top-4 bg-white/95 backdrop-blur text-slate-800 font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm font-kufi
                    ${lang === 'ar' ? 'right-4' : 'left-4'}
                  `}>
                    <span className={`w-2 h-2 rounded-full 
                      ${isUpcoming ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}
                    `}></span>
                    <span>{lang === 'ar' ? project.statusLabelAr : project.statusLabelEn}</span>
                  </div>

                  {/* Favorite save bubble */}
                  <button 
                    onClick={(e) => toggleFavorite(project.id, e)}
                    className={`absolute top-4 p-2 rounded-full border bg-white/90 backdrop-blur transition-all active:scale-90 hover:bg-white
                      ${lang === 'ar' ? 'left-4' : 'right-4'}
                    `}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                  </button>
                </div>

                {/* Card Content parameters */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Title and Expected returns */}
                    <div className={`flex justify-between items-start gap-4 mb-2
                      ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                    `}>
                      <h3 className="font-bold text-base text-slate-900 font-kufi">
                        {lang === 'ar' ? project.titleAr : project.titleEn}
                      </h3>
                      <span className="text-sm font-black text-emerald-600 font-mono shrink-0">
                        {project.expectedReturn}% {lang === 'ar' ? 'عوائد' : 'Returns'}
                      </span>
                    </div>

                    {/* Location pin */}
                    <div className={`flex items-center gap-1 text-slate-400 text-xs font-semibold mb-4
                      ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                    `}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? project.locationAr : project.locationEn}</span>
                    </div>

                    {/* Progress slider bar indicator */}
                    <div className="space-y-2 mb-4">
                      <div className={`flex justify-between text-[11px] font-bold text-slate-500
                        ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                      `}>
                        <span>{t.raisedFund}</span>
                        <span className="font-mono">{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* 3 columns metrics parameters: duration, target, investors count */}
                  <div>
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-50 text-center text-xs select-none">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'المدة' : 'Term'}</p>
                        <p className="font-bold text-slate-800 font-mono mt-0.5">{project.termMonths} {lang === 'ar' ? 'شهر' : 'm'}</p>
                      </div>
                      <div className="border-x border-slate-50">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'الهدف' : 'Target'}</p>
                        <p className="font-bold text-slate-800 font-mono mt-0.5">
                          {(project.targetSAR / 1000000).toFixed(1)}M {lang === 'ar' ? 'ر.س' : 'SAR'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'المستثمرون' : 'Investors'}</p>
                        <p className="font-bold text-slate-800 font-mono mt-0.5">
                          {isUpcoming ? '--' : project.investorsCount}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Click triggers */}
                    {isUpcoming ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); alert(lang === 'ar' ? 'سيتم إشعارك فور انطلاق طرح الفرصة الاستثمارية!' : 'Alert registered successfully! You will be notified the split second funding launches.'); }}
                        className="w-full mt-4 bg-slate-100/80 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-xs transition-colors flex justify-center items-center gap-2 select-none font-kufi"
                      >
                        <Clock className="w-4 h-4" />
                        <span>{t.notifyMe}</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => onSelectProject(project)}
                        className={`w-full mt-4 bg-[#0A73DF] group-hover:bg-[#005ab4] text-white py-3 rounded-xl font-bold text-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 select-none font-kufi
                          ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                        `}
                      >
                        <span>{t.viewDetails}</span>
                        <ChevronLeft className={`w-4 h-4 transition-transform
                          ${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'}
                        `} />
                      </button>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* 3. Propose a Project dashed border empty state box */}
        <motion.div 
          onClick={onSuggestClick}
          className="bg-slate-50 hover:bg-[#eff4ff]/20 border-2 border-dashed border-slate-300 hover:border-emerald-400 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.01] min-h-[460px]"
        >
          <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
            <Building className="w-8 h-8 text-[#0B73DF] shrink-0" />
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2 font-kufi">
            {t.suggestProject}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-body-md mb-6 px-4">
            {t.suggestSubtitle}
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); onSuggestClick(); }}
            className="px-6 py-2.5 bg-[#0B73DF]/5 hover:bg-[#0B73DF] text-[#0B73DF] hover:text-white border border-[#0B73DF]/20 rounded-lg font-bold text-xs tracking-wider transition-all shadow-sm"
          >
            {t.sendRequest}
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
