import React from 'react';
import { LayoutDashboard, Building2, Wallet, History, Settings, HelpCircle, PlusCircle, Globe } from 'lucide-react';
import { ViewTab, Language, translations } from '../translations';

interface SidebarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onSuggestProject: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, lang, setLang, onSuggestProject }: SidebarProps) {
  const t = translations[lang];

  const menuItems = [
    { id: 'dashboard' as ViewTab, label: t.dashboard, icon: LayoutDashboard },
    { id: 'catalog' as ViewTab, label: t.projectCatalog, icon: Building2 },
    { id: 'portfolio' as ViewTab, label: t.portfolio, icon: Wallet },
    { id: 'logs' as ViewTab, label: t.transparencyLogs, icon: History },
  ];

  return (
    <aside 
      className={`fixed top-0 h-full w-64 bg-[#0F172A] border-slate-800 shadow-2xl flex flex-col py-8 z-50 transition-all duration-300
        ${lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'}
      `}
    >
      {/* Branding Header Area */}
      <div className="px-6 mb-10">
        <div className="flex items-center gap-2">
          {/* Logo element resembling the plant-building green icon */}
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/10 shrink-0">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-950 fill-current" xmlns="http://www.w3.org/2000/svg">
              {/* Premium leaf / asset icon from the uploaded screenshots */}
              <path d="M12 2C12 2 13 6 17 8C19 9 20 11 18 13C16 15 13 15 12 18C11 15 8 15 6 13C4 11 5 9 7 8C11 6 12 2 12 2Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tight leading-4 font-inter">
              UrbanInvest
            </h1>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-1">
              {t.appNameSubtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu Links */}
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-all text-sm font-medium hover:scale-[1.01] active:scale-[0.99]
                ${isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-r-4 border-emerald-400 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }
                ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-right">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Custom Bottom Sidebar Actions */}
      <div className="px-4 space-y-3 pt-6 border-t border-slate-800">
        {/* Suggest Project Quick Action */}
        <button 
          onClick={onSuggestProject}
          className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-slate-950 py-3 rounded-lg font-bold text-xs shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.suggestProject}</span>
        </button>

        {/* Translation Language Switcher Toggle */}
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="w-full border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
          </div>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 font-bold">
            {lang.toUpperCase()}
          </span>
        </button>

        <div className="text-[10px] text-slate-500 text-center font-mono select-none pt-2">
          v2.4.0 • Live Sandbox
        </div>
      </div>
    </aside>
  );
}
