import React, { useState } from 'react';
import { Search, Bell, Settings, MessageSquare, Menu, X, Check } from 'lucide-react';
import { ViewTab, Language, translations } from '../translations';

interface HeaderProps {
  activeTab: ViewTab;
  lang: Language;
  onSearchChange: (search: string) => void;
  searchValue: string;
  onSettingsClick: () => void;
  onLanguageToggle: () => void;
  onSidebarToggle: () => void;
  investorBalance: number;
}

export default function Header({ 
  activeTab, 
  lang, 
  onSearchChange, 
  searchValue,
  onSettingsClick,
  onLanguageToggle,
  onSidebarToggle,
  investorBalance
}: HeaderProps) {
  const t = translations[lang];
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulated notifications that adapt to user operations (like investments)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'تأكيد الحوالة البنكية', desc: 'تم إيداع $850.00 عوائد أبراج سكاي لاين', time: 'منذ ساعتين', read: false },
    { id: 2, title: 'اكتمال تمويل مشروع', desc: 'وصل مجمع الواحة السكني إلى 75% من هدفه التمويلي', time: 'أمس', read: true },
    { id: 3, title: 'مستندات جديدة متاحة', desc: 'تم نشر تقرير مراجعة الاستدامة لبرج الكريستال', time: 'منذ يومين', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header 
      className={`fixed top-0 h-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center justify-between px-6 transition-all duration-300
        ${lang === 'ar' ? 'left-0 right-64' : 'right-0 left-64'}
      `}
    >
      {/* Search Input Bar (Desktop) */}
      <div className={`hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-96 border border-slate-200
        ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
      `}>
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder={t.searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full font-body-md text-slate-700 mx-2
            ${lang === 'ar' ? 'text-right' : 'text-left'}
          `}
        />
        {searchValue && (
          <button onClick={() => onSearchChange('')} className="text-xs text-slate-500 hover:text-slate-900 font-bold px-1.5 font-mono">
            {lang === 'ar' ? 'إلغاء' : 'Clear'}
          </button>
        )}
      </div>

      {/* Hamburger / Quick Mobile Sidebar Button */}
      <div className="md:hidden flex items-center gap-3">
        <button onClick={onSidebarToggle} className="p-2 hover:bg-slate-100 rounded-lg">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
        <span className="font-bold text-slate-950 font-kufi text-sm sm:text-base">
          {activeTab === 'dashboard' && t.dashboard}
          {activeTab === 'catalog' && t.projectCatalog}
          {activeTab === 'portfolio' && t.portfolio}
          {activeTab === 'logs' && t.transparencyLogs}
        </span>
      </div>

      {/* Right Side Utility Controls & Avatar */}
      <div className={`flex items-center gap-4
        ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
      `}>
        {/* Balance badge with dynamic counter */}
        <div className="hidden sm:flex flex-col text-slate-800 text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 tracking-wide select-none">
          <span>{lang === 'ar' ? 'المحفظة المتاحة' : 'Available Cap'}</span>
          <span className="text-indigo-900">{investorBalance.toLocaleString()} ر.س</span>
        </div>

        {/* Notifications and messages buttons */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Premium Notifications Menu dropdown pane */}
          {showNotifications && (
            <div className={`absolute top-12 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-3 text-slate-900 overflow-hidden
              ${lang === 'ar' ? 'left-0' : 'right-0'}
            `}>
              <div className="flex justify-between items-center px-4 pb-2 border-b border-slate-100 text-xs font-bold text-slate-600">
                <span>{lang === 'ar' ? 'الإشعارات الميدانية' : 'Field Alerts'}</span>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} className="text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'قراءة الكل' : 'Mark Read'}</span>
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-3 text-right hover:bg-slate-50/80 transition-colors ${!notif.read ? 'bg-emerald-500/5' : ''}`}>
                    <div className="flex justify-between items-start mb-1 text-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono font-medium">{notif.time}</span>
                      <h4 className="text-xs font-bold font-kufi text-emerald-920">{notif.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 font-body-md line-clamp-2 leading-relaxed">
                      {notif.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button onClick={onSettingsClick} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-slate-700" />
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        {/* User Portrait Profile Widget */}
        <div className={`flex items-center gap-3
          ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
        `}>
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <p className="text-xs font-extrabold text-[#0C74DF] font-kufi leading-none">
              {lang === 'ar' ? 'أحمد العامري' : 'Ahmad Al-Amri'}
            </p>
            <p className="text-[10px] text-slate-400 font-label-md mt-0.5 font-mono select-none">
              {t.premiumInvestor}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm relative group cursor-pointer hover:border-emerald-400 transition-colors">
            <img 
              alt="User profile avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzj7lcJjVzYaECgjoqOaL1xCvYGTxwhkGUhZp9NJMll2YoAPjXQpuVWvkAxajBl8JE6cNxe3eFNscwVCRwqM9aJWmCI0FRuwGeOO3CsYH3V_iHp0gDBNLhzMGUjCLq3vr8cleaC19PL8cJCKjO0VPAt0j8jby4C1T_dI6mo8SahoZaWMZb0dwuN8Wt8S-AWPYodpH2sxoieMuyrmzKDEZr4xOHSg9eQiVDQoMGMISFz0C5JQfB3VGHlBToAmwQce01b3LxcV7R4nE"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
