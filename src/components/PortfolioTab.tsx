import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, History, Download, Calendar, ArrowRight,
  Shield, Check, Info, Calculator, PieChart, Layers, Sliders
} from 'lucide-react';
import { Investment, PayoutHistory, Project } from '../types';
import { Language, translations } from '../translations';
import { motion } from 'motion/react';

interface PortfolioTabProps {
  lang: Language;
  projects: Project[];
  payouts: PayoutHistory[];
  investments: Investment[];
  investedTotal: number;
}

export default function PortfolioTab({ lang, projects, payouts, investments, investedTotal }: PortfolioTabProps) {
  const t = translations[lang];

  // Calculator inputs
  const [calcAmount, setCalcAmount] = useState<number>(50000);
  const [calcMonths, setCalcMonths] = useState<number>(24);

  // Interest projection math
  const averageRoi = 14.2; 
  const calculatedProfit = (calcAmount * (averageRoi / 100) * (calcMonths / 12));
  const calculatedTotal = calcAmount + calculatedProfit;

  // Asset distribution weights
  const assetTypes = [
    { label: t.residential, value: 55, color: 'stroke-[#0a73e0]', text: 'text-[#0a73e0]', bg: 'bg-[#0a73e0]' },
    { label: t.commercial, value: 30, color: 'stroke-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500' },
    { label: t.industrial, value: 15, color: 'stroke-amber-400', text: 'text-amber-400', bg: 'bg-amber-400' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* 1. Portfolio Hero High-Contrast Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 - Total Investment sum */}
        <div className="bg-[#0a73e0] text-white p-6 rounded-xl shadow-lg relative overflow-hidden select-none animate-pulse">
          <div className="relative z-10">
            <p className="text-blue-100 font-bold text-xs font-kufi">{t.totalInvestment}</p>
            <h3 className="text-3xl font-black mt-2 font-mono tracking-wide">
              {investedTotal.toLocaleString()} {lang === 'ar' ? 'ر.س' : 'SAR'}
            </h3>
            <div className="mt-4 flex items-center text-emerald-300 text-xs font-bold leading-none gap-1">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span>{t.monthGrowth}</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 opacity-10 font-mono text-white select-none pointer-events-none">
            <PieChart className="w-36 h-36" />
          </div>
        </div>

        {/* Metric 2 - Expected ROI % */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold font-kufi">{t.annualReturn}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2 font-mono">14.2%</h3>
          </div>
          <div className="mt-4 flex items-center text-emerald-600 text-xs font-bold gap-1 leading-none">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>{Math.round(investedTotal * 0.142).toLocaleString()} ر.س {lang === 'ar' ? 'أرباح مقدرة سنوية' : 'Projected Annual Returns'}</span>
          </div>
        </div>

        {/* Metric 3 - Count of funded projects */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold font-kufi">{t.activeProjects}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2 font-mono">12 {lang === 'ar' ? 'مشروع' : 'Projects'}</h3>
          </div>
          <div className="mt-4 flex items-center text-slate-400 text-xs font-medium gap-1 leading-none">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'ar' ? 'موعد الصرف القادم: ١٥ أكتوبر' : 'Next yield output: October 15'}</span>
          </div>
        </div>
      </section>

      {/* 2. Portfolio Composition and interactive earnings calculator bento grid */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Ring proportion chart widget - 3 columns */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className={`flex justify-between items-center mb-6 
            ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
          `}>
            <h4 className="font-bold text-sm text-slate-800 font-kufi">{t.assetDistribution}</h4>
            
            {/* Legend indicators */}
            <div className={`flex gap-3 text-xs font-semibold
              ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
            `}>
              {assetTypes.map((type, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${type.bg}`} />
                  <span className="text-slate-500">{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row items-center justify-around py-4 gap-6">
            {/* SVG Donut Ring representation with dynamic rotation segment clips */}
            <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="88" cy="88" r="74" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                {/* Residential slice at 55% */}
                <circle 
                  cx="88" cy="88" r="74" fill="transparent" 
                  className={assetTypes[0].color} 
                  strokeWidth="16" 
                  strokeDasharray="465" strokeDashoffset="209" // 55% value
                  strokeLinecap="round"
                />
                {/* Commercial slice at 30% */}
                <circle 
                  cx="88" cy="88" r="74" fill="transparent" 
                  className={assetTypes[1].color} 
                  strokeWidth="16" 
                  strokeDasharray="465" strokeDashoffset="325" // 30% value
                  transform="rotate(198, 88, 88)" // starts after residential
                  strokeLinecap="round"
                />
                {/* Industrial slice at 15% */}
                <circle 
                  cx="88" cy="88" r="74" fill="transparent" 
                  className={assetTypes[2].color} 
                  strokeWidth="16" 
                  strokeDasharray="465" strokeDashoffset="395" // 15% value
                  transform="rotate(306, 88, 88)" // starts after commercial
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold font-kufi">{t.totalAssets}</span>
                <span className="text-lg font-black text-[#0a73e0] font-mono leading-none mt-1">
                  {(investedTotal / 1000).toFixed(1)}K ر.س
                </span>
              </div>
            </div>

            {/* List breakdown weights with progress bars */}
            <div className="space-y-4 w-full max-w-[200px] text-xs font-semibold select-none">
              {assetTypes.map((type, idx) => (
                <div key={idx} className="space-y-1">
                  <div className={`flex justify-between text-slate-600
                    ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                  `}>
                    <span>{type.label}</span>
                    <span className={`font-mono font-bold ${type.text}`}>{type.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${type.bg}`} style={{ width: `${type.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yield Profit Calculator and Insights - 2 columns */}
        <div className="lg:col-span-2 bg-[#F1F5F9]/30 p-6 rounded-xl border border-slate-200/60 flex flex-col justify-between">
          <div className="space-y-4 select-none">
            <h4 className="font-bold text-sm text-[#0a73e0] font-kufi flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{t.calculator}</span>
            </h4>
            <p className="text-slate-400 text-xs font-body-md leading-relaxed">{t.calcDesc}</p>

            {/* Drag Sliders */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <div className={`flex justify-between text-xs font-bold text-slate-700
                  ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                `}>
                  <span>{t.investAmount}</span>
                  <span className="font-mono text-[#0a73e0]">{calcAmount.toLocaleString()} ر.س</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="1000000" 
                  step="5000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0a73e0]"
                />
              </div>

              <div className="space-y-1">
                <div className={`flex justify-between text-xs font-bold text-slate-700
                  ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                `}>
                  <span>{lang === 'ar' ? 'مدة الاستثمار المقترحة' : 'Projected Investment Term'}</span>
                  <span className="font-mono text-[#0a73e0]">{calcMonths} {lang === 'ar' ? 'شهر' : 'months'}</span>
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="48" 
                  step="6"
                  value={calcMonths}
                  onChange={(e) => setCalcMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0a73e0]"
                />
              </div>
            </div>
          </div>

          {/* Calculator Output calculations */}
          <div className="p-4 bg-[#eff4ff] border border-slate-200 rounded-lg select-none mt-4 text-xs font-semibold">
            <div className={`flex justify-between items-center text-slate-600 mb-2
              ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
            `}>
              <span>{t.estimatedProfit} ({averageRoi}%)</span>
              <span className="font-mono font-bold text-emerald-600">+{Math.round(calculatedProfit).toLocaleString()} ر.س</span>
            </div>
            <div className="h-px bg-slate-200/60 my-2"></div>
            <div className={`flex justify-between items-center text-slate-800
              ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
            `}>
              <span className="font-bold">{t.estimatedTotal}</span>
              <span className="font-mono font-black text-sm text-[#0a73e0]">{Math.round(calculatedTotal).toLocaleString()} ر.س</span>
            </div>
          </div>
        </div>

      </section>

      {/* 3. Funded Properties List Mockups */}
      <section className="space-y-4 select-none">
        <h4 className="font-bold text-sm text-slate-800 font-kufi">{t.fundedProjects}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1 - Skyline Tower */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
            <div className="h-44 relative bg-slate-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFSCDqhwrvfdyWDq0mxQnCW_iol7EkY_Yp6ifyAr0MEHGseioEjaJh6lZ20zK_pDvAu6m8EKjCYBKHCdaHxDY8jm-eMSO2lk0ec3DVF4KplssjECu7J6lvErJcUA-Hx3vQhbTidRRKojLrki9UekCPli4PBOPE9fNG17ve3zsoJF_K85olq13eVtRtZOeBmf3bb0eekAz9Gej9h-x4KncFK8q45hnbQcoGj9cUpY9Oa0gj9Kgg9TLNRam5UgJC19Km4WrDi1hTZyg" 
                alt="Skyline Tower" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute top-3 bg-emerald-600 text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-md shadow-sm font-kufi
                ${lang === 'ar' ? 'right-3' : 'left-3'}
              `}>
                {lang === 'ar' ? 'نشط / قيد التشغيل' : 'Active Yielding'}
              </div>
            </div>
            <div className="p-5">
              <h5 className="font-bold text-sm text-[#0a73e0] font-kufi">
                {lang === 'ar' ? 'أبراج سكاي لاين - دبي' : 'Skyline Towers - Dubai'}
              </h5>
              <p className="text-slate-400 text-xs font-body-md mt-1 mb-4">
                {lang === 'ar' ? 'وحدات سكنية فاخرة تضمن عوائد شهرية مستقرة.' : 'Premium coastal residential suites back-leased with direct rental output.'}
              </p>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-50 pt-3 text-center text-[11px] font-bold">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'استثمارك' : 'Invested'}</p>
                  <p className="text-slate-700 font-mono mt-0.5">٤٥,٠٠٠ ر.س</p>
                </div>
                <div className="border-x border-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'العائد' : 'Yield'}</p>
                  <p className="text-emerald-600 font-mono mt-0.5">8.5%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'التوزيع المقبل' : 'Next Payout'}</p>
                  <p className="text-slate-700 font-mono mt-0.5">١٥ أكتوبر</p>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 - Yasmin Riyadh */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
            <div className="h-44 relative bg-slate-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOnaMKCVLiS_PBp0PlrqWsJRz5llJHKg32RtZsOaVxKYBErgd1JfWLPhrfYWTTj6zrJfszQMZ-h0DuKWNFOpNL4qAgoNyyu4c9S-vG4OVc94vmCp5odZW3xnWXcdVeJ60IUaZnOEmsXCbvpnuVeHrx0gJSM3KSanHyVEegDYDTwgtT-Hopgp6X9aG_bQhcMC3TN7NLQpWWKzcNxQhppDpDIMe2GCQaR5OWPA-qCCrBoRZ_zR78gOls1afpnwIedieiuPWk0nNagEc" 
                alt="Yasmin Riyadh" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute top-3 bg-[#0a73e0] text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-md shadow-sm font-kufi
                ${lang === 'ar' ? 'right-3' : 'left-3'}
              `}>
                {lang === 'ar' ? 'قيد التشييد' : 'Under Construction'}
              </div>
            </div>
            <div className="p-5">
              <h5 className="font-bold text-sm text-[#0a73e0] font-kufi">
                {lang === 'ar' ? 'فلل الياسمين السكنية - الرياض' : 'Yasmin Luxury Villas - Riyadh'}
              </h5>
              <p className="text-slate-400 text-xs font-body-md mt-1 mb-4">
                {lang === 'ar' ? 'مجمع سكني راقي ومغلق بقلب حي الياسمين الرياض.' : 'Elite gated private family villa complex in the premium Al-Yasmin enclave.'}
              </p>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-50 pt-3 text-center text-[11px] font-bold">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'استثمارك' : 'Invested'}</p>
                  <p className="text-slate-700 font-mono mt-0.5">١٦٨,٥٠٠ ر.س</p>
                </div>
                <div className="border-x border-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'العائد' : 'Yield'}</p>
                  <p className="text-emerald-600 font-mono mt-0.5">11.2%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'نسبة البناء' : 'Built'}</p>
                  <p className="text-[#0a73e0] font-mono mt-0.5">82%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Item 3 - Innovation Hub */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
            <div className="h-44 relative bg-slate-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJZemES1Msziv9yXfrPChM-z39ZRiH3eT5kMfhAO9bwnhp62TEymJZK68j0jIuXdbQ9faTWhvSSE1FTjOYtsiX9zbE3veqaQ6RNCYD8pZ17z6fEZah3_LI7p5RczA6Qf6vC_UE5TKzlXQvfkLXBY7IO_RnInZlDkiyXw_hsNfzRsWJnztCxDxTm8mBGjN_toWICBo5qLc7_8flOOz3etnpfSIvoXNbvysPOF7CS_vQh5PaZ9NIbIcS4DJvhyTQdT3yYWUJkUADYQo" 
                alt="Innovation Hub" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute top-3 bg-emerald-600 text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-md shadow-sm font-kufi
                ${lang === 'ar' ? 'right-3' : 'left-3'}
              `}>
                {lang === 'ar' ? 'نشط / قيد التشغيل' : 'Active Yielding'}
              </div>
            </div>
            <div className="p-5">
              <h5 className="font-bold text-sm text-[#0a73e0] font-kufi">
                {lang === 'ar' ? 'مركز الابتكار التجاري - جدة' : 'Innovation Commercial Hub - Jeddah'}
              </h5>
              <p className="text-slate-400 text-xs font-body-md mt-1 mb-4">
                {lang === 'ar' ? 'مكاتب ومقار إدارية مجهزة بالكامل لشركات التقنية.' : 'Sleek glass high-end corporate office park, 100% pre-leased to tech giants.'}
              </p>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-50 pt-3 text-center text-[11px] font-bold">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'استثمارك' : 'Invested'}</p>
                  <p className="text-slate-700 font-mono mt-0.5">٣٥,٠٠٠ ر.س</p>
                </div>
                <div className="border-x border-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'العائد' : 'Yield'}</p>
                  <p className="text-emerald-600 font-mono mt-0.5">9.8%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'ar' ? 'التوزيع المقبل' : 'Next Payout'}</p>
                  <p className="text-slate-700 font-mono mt-0.5">١٥ أكتوبر</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dividend Payout History ledger table */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden select-none">
        <div className={`p-6 border-b border-slate-100 flex justify-between items-center
          ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
        `}>
          <h4 className="font-bold text-sm text-slate-800 font-kufi">{t.payoutHistory}</h4>
          <button 
            onClick={() => alert(lang === 'ar' ? 'تم بدء تصدير كشف الحساب المالي كملف PDF...' : 'Initiating financial statement PDF export buffer...')}
            className="text-[#0a73e0] hover:text-[#005ab4] text-xs font-bold flex items-center gap-1 cursor-pointer font-kufi"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadStatement}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 select-none font-kufi text-slate-400 font-bold">
                <th className={`p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.date}</th>
                <th className={`p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.project}</th>
                <th className={`p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.paymentType}</th>
                <th className={`p-4 ${lang === 'ar' ? 'text-right font-mono' : 'text-left'}`}>{t.amount}</th>
                <th className={`p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium font-inter">
              {payouts.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className={`p-4 text-slate-500 font-mono ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? pay.dateAr : pay.dateEn}
                  </td>
                  <td className={`p-4 font-bold text-[#0a73e0] font-kufi ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? pay.projectTitleAr : pay.projectTitleEn}
                  </td>
                  <td className={`p-4 text-slate-600 font-kufi ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? pay.typeAr : pay.typeEn}
                  </td>
                  <td className={`p-4 font-black font-mono text-emerald-600 text-sm ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    +{pay.amountSAR.toLocaleString()} ر.س
                  </td>
                  <td className={`p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-[10px] font-black tracking-wide font-kufi">
                      {lang === 'ar' ? pay.statusAr : pay.statusEn}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </motion.div>
  );
}
