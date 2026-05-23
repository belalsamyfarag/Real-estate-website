/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewTab, Language, translations } from './translations';
import { INITIAL_PROJECTS, INITIAL_TRANSPARENCY_LOGS, INITIAL_PAYOUTS } from './data';
import { Project, PayoutHistory, TransparencyLog } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewTab from './components/OverviewTab';
import CatalogTab from './components/CatalogTab';
import PortfolioTab from './components/PortfolioTab';
import LogsTab from './components/LogsTab';
import ProjectDetailView from './components/ProjectDetailView';
import SuggestProjectModal from './components/SuggestProjectModal';
import { Sparkles, MessageSquare, ShieldAlert, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [searchValue, setSearchValue] = useState<string>('');

  // Sandbox Live Simulated Balances
  const [investorBalance, setInvestorBalance] = useState<number>(650000); // 650K SAR available
  const [investedTotal, setInvestedTotal] = useState<number>(248500); // Sum of funded investments

  // Live state sources
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // Assign inferred categories to logs for robust bento classification
  const [logs, setLogs] = useState<TransparencyLog[]>(
    INITIAL_TRANSPARENCY_LOGS.map((lg, idx) => ({
      ...lg,
      category: idx === 1 ? 'financial' : idx === 3 ? 'legal' : 'technical'
    }))
  );

  const [payouts, setPayouts] = useState<PayoutHistory[]>(INITIAL_PAYOUTS);

  // Modal UI focus actions
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showSuggestModal, setShowSuggestModal] = useState<boolean>(false);
  const [mobileDrawOpen, setMobileDrawOpen] = useState<boolean>(false);

  // Interactive local application toasts notification alerts
  const [toastMsg, setToastMsg] = useState<{ id: number; msg: string; type: 'success' | 'info' }[]>([]);

  const addToast = (msg: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToastMsg(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToastMsg(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Synchronize document root dir and language attributes dynamically
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Handle investing into a property live submission
  const handleConfirmInvestment = async (amount: number): Promise<boolean> => {
    if (!selectedProject) return false;

    try {
      // 1. Deduct from cash balances, add to asset total
      setInvestorBalance(prev => prev - amount);
      setInvestedTotal(prev => prev + amount);

      // 2. Adjust target funding and investors counters on selected project
      setProjects(prevProjects => 
        prevProjects.map(p => {
          if (p.id === selectedProject.id) {
            return {
              ...p,
              raisedSAR: p.raisedSAR + amount,
              investorsCount: p.investorsCount + 1
            };
          }
          return p;
        })
      );

      // 3. Register a transaction payout ledger row
      const newPayout: PayoutHistory = {
        id: `py_new_${Date.now()}`,
        dateAr: 'اليوم، ' + new Date().toLocaleDateString('ar-SA'),
        dateEn: 'Today, ' + new Date().toLocaleDateString('en-US'),
        projectTitleAr: selectedProject.titleAr,
        projectTitleEn: selectedProject.titleEn,
        typeAr: 'حصص مساهمة مرخصة',
        typeEn: 'Equity Certified Share',
        amountSAR: Math.round(amount * (selectedProject.expectedReturn / 100)),
        statusAr: 'مؤمن / تحت الانتظار',
        statusEn: 'Secured/Pending'
      };
      setPayouts(prev => [newPayout, ...prev]);

      // 4. Create structured transparency field logs
      const newLog: TransparencyLog = {
        id: `lg_new_${Date.now()}`,
        timeAr: 'الآن',
        timeEn: 'Just Now',
        titleAr: `تم تسجيل تملك المستثمر أحمد العامري`,
        titleEn: `Investor Ahmad Al-Amri equity certification registered`,
        descriptionAr: `توثيق رسمي للمعاملة المصرفية بقيمة ${amount.toLocaleString()} ر.س لحصص تملك في مشروع ${selectedProject.titleAr}.`,
        descriptionEn: `Official certificate validation record for ${amount.toLocaleString()} SAR investment in ${selectedProject.titleEn}.`,
        type: 'check',
        category: 'financial'
      };
      setLogs(prev => [newLog, ...prev]);

      // 5. Success toast trigger
      const message = lang === 'ar' 
        ? `تم الاستثمار بنجاح في ${selectedProject.titleAr}!`
        : `Investment certified for ${selectedProject.titleEn}!`;
      addToast(message, 'success');

      return true;
    } catch {
      return false;
    }
  };

  // Handle Suggesting listings submit
  const handleSuggestSubmitSuccess = () => {
    const msg = lang === 'ar'
      ? 'تم إرسال اقتراحك للجنة الدراسة العقارية بنجاح!'
      : 'Property proposal received! Audit report generated.';
    addToast(msg, 'info');
  };

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500/30 font-sans"
    >
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileDrawOpen(false);
        }}
        lang={lang}
        setLang={setLang}
        onSuggestProject={() => setShowSuggestModal(true)}
      />

      {/* Mobile Drawer view Sidebar */}
      {mobileDrawOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 md:hidden flex justify-end">
          <div className="w-64 h-full relative">
            <Sidebar 
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileDrawOpen(false);
              }}
              lang={lang}
              setLang={setLang}
              onSuggestProject={() => {
                setShowSuggestModal(true);
                setMobileDrawOpen(false);
              }}
            />
            <button 
              onClick={() => setMobileDrawOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Top bilingual Header wrapper */}
      <Header 
        activeTab={activeTab}
        lang={lang}
        onSearchChange={setSearchValue}
        searchValue={searchValue}
        onSettingsClick={() => alert(lang === 'ar' ? 'يمكنك تهيئة مفاتيح المحفظة والتحقق من حسابك الائتماني من مركز الإعدادات.' : 'Open wallet keys, API authorizations, and banking KYC from Settings pane.')}
        onLanguageToggle={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        onSidebarToggle={() => setMobileDrawOpen(!mobileDrawOpen)}
        investorBalance={investorBalance}
      />

      {/* Main Container Content */}
      <main 
        className={`pt-24 pb-12 px-6 sm:px-10 transition-all duration-300 min-h-screen
          ${lang === 'ar' ? 'md:mr-64' : 'md:ml-64'}
        `}
      >
        {/* Dynamic Inner views tabs switcher */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <OverviewTab 
              lang={lang} 
              projects={projects} 
              logs={logs}
              onSelectProject={setSelectedProject}
              investedTotal={investedTotal}
            />
          )}

          {activeTab === 'catalog' && (
            <CatalogTab 
              lang={lang}
              projects={projects}
              onSelectProject={setSelectedProject}
              onSuggestClick={() => setShowSuggestModal(true)}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioTab 
              lang={lang}
              projects={projects}
              payouts={payouts}
              investments={[]}
              investedTotal={investedTotal}
            />
          )}

          {activeTab === 'logs' && (
            <LogsTab 
              lang={lang}
              logs={logs}
            />
          )}
        </div>
      </main>

      {/* Dynamic Popups Audited modals (Invest Detail, New Propose) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailView 
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedProject(null)}
            onInvest={handleConfirmInvestment}
            investorBalance={investorBalance}
          />
        )}

        {showSuggestModal && (
          <SuggestProjectModal 
            lang={lang}
            onClose={() => setShowSuggestModal(false)}
            onSubmitSuccess={handleSuggestSubmitSuccess}
          />
        )}
      </AnimatePresence>

      {/* Toast Alert systems stacked container */}
      <div className={`fixed bottom-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none
        ${lang === 'ar' ? 'left-6 items-start' : 'right-6 items-end'}
      `}>
        <AnimatePresence>
          {toastMsg.map((toast) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              key={toast.id}
              className={`p-4 rounded-xl border flex items-center gap-3 shadow-xl backdrop-blur-md pointer-events-auto
                ${toast.type === 'success' 
                  ? 'bg-emerald-950/95 border-emerald-500/25 text-emerald-400' 
                  : 'bg-indigo-950/95 border-indigo-500/25 text-indigo-400'
                }
              `}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs font-bold leading-normal">{toast.msg}</p>
              <button 
                onClick={() => setToastMsg(prev => prev.filter(t => t.id !== toast.id))}
                className="hover:opacity-80 p-0.5"
              >
                <X className="w-3 h-3 text-slate-400" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

