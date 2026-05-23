import React, { useState } from 'react';
import { 
  X, MapPin, Shield, CheckCircle2, AlertTriangle, Landmark, Calendar,
  TrendingUp, Users, Heart, ArrowRight, Layers, FileText, Check, Loader2, Coins
} from 'lucide-react';
import { Project } from '../types';
import { Language, translations } from '../translations';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectDetailViewProps {
  project: Project;
  lang: Language;
  onClose: () => void;
  onInvest: (amount: number) => Promise<boolean>;
  investorBalance: number;
}

export default function ProjectDetailView({ project, lang, onClose, onInvest, investorBalance }: ProjectDetailViewProps) {
  const t = translations[lang];
  const [investAmount, setInvestAmount] = useState<string>('15000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const minAmt = project.minInvestmentSAR || 5000;
  const progressPercent = Math.min(100, Math.round((project.raisedSAR / project.targetSAR) * 100));

  const handleInvestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const amt = parseFloat(investAmount);

    if (isNaN(amt) || amt < minAmt) {
      setErrorMsg(t.insufficientFunds);
      return;
    }

    if (amt > investorBalance) {
      setErrorMsg(lang === 'ar' ? 'رصيد محفظتك المتاحة غير كافي!' : 'Insufficient available capital in your wallet!');
      return;
    }

    // Begin animated checkout simulation steps
    setIsSubmitting(true);
    setSubmitStep(1); // Escrow verification

    await new Promise(r => setTimeout(r, 1200));
    setSubmitStep(2); // Generating share certs

    await new Promise(r => setTimeout(r, 1200));
    setSubmitStep(3); // Completing

    const successRes = await onInvest(amt);
    if (successRes) {
      setSuccess(true);
    } else {
      setErrorMsg(lang === 'ar' ? 'فشلت المعاملة، يرجى المحاولة لاحقاً' : 'Transaction failed, please retry.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row relative max-h-[90vh]"
      >
        {/* Close Button X absolute overlay */}
        <button 
          onClick={onClose}
          className={`absolute top-4 p-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md z-50 hover:scale-105 active:scale-95 transition-all
            ${lang === 'ar' ? 'left-4' : 'right-4'}
          `}
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Left Visual Side: Render + specs - 50% width on desktop */}
        <div className="md:w-1/2 bg-slate-50 border-r border-slate-200/50 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-none">
          <div className="relative aspect-video md:aspect-auto md:h-64 select-none">
            <img 
              src={project.imageUrl} 
              alt={lang === 'ar' ? project.titleAr : project.titleEn} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
            <div className={`absolute bottom-4 text-white
              ${lang === 'ar' ? 'right-4 text-right' : 'left-4 text-left'}
            `}>
              <h2 className="text-xl font-black font-kufi">{lang === 'ar' ? project.titleAr : project.titleEn}</h2>
              <p className="text-slate-200 text-xs font-semibold mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? project.locationAr : project.locationEn}</span>
              </p>
            </div>
          </div>

          {/* About description and Specs sheet details */}
          <div className="p-6 space-y-6">
            <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <h4 className="text-xs font-bold text-[#0a73e0] uppercase tracking-wider font-kufi">{t.aboutProject}</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-2 leading-relaxed font-body-md">
                {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
              </p>
            </div>

            {/* Technical Specs Bento grid parameters */}
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-3 bg-white border border-slate-200/80 rounded-lg flex items-center gap-3">
                <Layers className="w-5 h-5 text-emerald-500" />
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[9px] text-slate-400 font-bold">{t.landArea}</p>
                  <p className="text-slate-800 font-mono">14,250 m²</p>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200/80 rounded-lg flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#0a73e0]" />
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[9px] text-slate-400 font-bold">{t.buildingGrade}</p>
                  <p className="text-slate-800 font-mono">Grade A+</p>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200/80 rounded-lg flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[9px] text-slate-400 font-bold">{t.deliveryDate}</p>
                  <p className="text-slate-800 font-mono">Q4 2027</p>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200/80 rounded-lg flex items-center gap-3">
                <Landmark className="w-5 h-5 text-[#0a73e0]" />
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[9px] text-slate-400 font-bold">{t.floors}</p>
                  <p className="text-slate-800 font-mono">32 Floors</p>
                </div>
              </div>
            </div>

            {/* Document attachments row lists */}
            <div className="p-3.5 bg-[#eff4ff] border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#0a73e0]" />
                <div className={`${lang === 'ar' ? 'text-right font-kufi' : 'text-left'}`}>
                  <h5 className="text-xs font-bold text-slate-800">{t.docs}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Capital Audit Prospectus v4.2</p>
                </div>
              </div>
              <button 
                onClick={() => alert(lang === 'ar' ? 'تم بدء تحميل كتيب شروط الاستثمار المعتمد والترخيص...' : 'Downloading certified municipal building code approvals prospectus...')}
                className="text-xs font-bold text-[#0a73e0] hover:text-[#005ab4] font-kufi"
              >
                {lang === 'ar' ? 'تحميل' : 'Download'}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Right checkout slider checkout panel - 50% width on desktop */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-none select-none">
          <div className="space-y-6">
            {/* Opportunity Financial Metrics overview */}
            <div className={`flex items-center justify-between border-b border-slate-100 pb-4
              ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
            `}>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.target}</span>
                <span className="text-base font-black text-slate-800 font-mono">
                  {project.targetSAR.toLocaleString()} ر.س
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.annualReturn}</span>
                <span className="text-base font-black text-emerald-600 font-mono">
                  {project.expectedReturn}%
                </span>
              </div>
            </div>

            {/* Funding raised progress details */}
            <div className="space-y-2">
              <div className={`flex justify-between text-xs font-bold text-slate-600
                ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
              `}>
                <span>{t.raisedFund}</span>
                <span className="font-mono text-emerald-600">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <div className={`flex justify-between text-[10px] text-slate-400 font-bold
                ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
              `}>
                <span>{project.raisedSAR.toLocaleString()} {lang === 'ar' ? 'ر.س مساهمة' : 'SAR raised'}</span>
                <span>{t.minInvestment}: {minAmt.toLocaleString()} ر.س</span>
              </div>
            </div>

            {/* Payout Schedule timeline info */}
            <div className={`p-4 bg-slate-100/50 rounded-xl space-y-2 text-xs font-semibold
              ${lang === 'ar' ? 'text-right' : 'text-left'}
            `}>
              <h5 className="font-bold text-slate-700 font-kufi">{t.timelineTitle}</h5>
              <ol className="relative border-r border-slate-200/50 space-y-1.5 pt-1.5">
                <li className="pr-4 pb-1">
                  <div className="absolute w-2 h-2 bg-emerald-500 rounded-full mt-1.5 -right-1"></div>
                  <p className="text-[10px] text-slate-400 font-mono">July 2026</p>
                  <p className="text-[11px] text-slate-700 font-kufi">{lang === 'ar' ? 'اكتمال جمع التمويل وتوقيع العقود' : 'Funding rounds close and deeds signed'}</p>
                </li>
                <li className="pr-4 pb-1">
                  <div className="absolute w-2 h-2 bg-slate-300 rounded-full mt-1.5 -right-1"></div>
                  <p className="text-[10px] text-slate-400 font-mono">March 2027</p>
                  <p className="text-[11px] text-slate-700 font-kufi">{lang === 'ar' ? 'المرحلة الهيكلية الأولى وبداية الصبّ' : 'Structural foundation completion phase'}</p>
                </li>
                <li className="pr-4">
                  <div className="absolute w-2 h-2 bg-slate-300 rounded-full mt-1.5 -right-1"></div>
                  <p className="text-[10px] text-slate-400 font-mono">December 2027</p>
                  <p className="text-[11px] text-slate-700 font-kufi">{lang === 'ar' ? 'بدء تسليم المقار وتوزيع العوائد الأولى' : 'Key handover & first dividend disbursements'}</p>
                </li>
              </ol>
            </div>
          </div>

          {/* Secure Invest Checkout section or Successful view */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {success ? (
                /* Success checkout screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-4
                    ${lang === 'ar' ? 'text-right' : 'text-left'}
                  `}
                >
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                    <Check className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0C74DF] font-kufi text-center">{t.investSuccess}</h4>
                    <p className="text-slate-500 text-xs mt-1.5 text-center leading-relaxed">
                      {lang === 'ar' 
                        ? `تم حجز صك المساهمة بقيمة ${parseFloat(investAmount).toLocaleString()} ر.س. تم إرسال سندات تملك الأصول المشفرة المرخصة ماليًا لبريدك أحمد العامري.`
                        : `Your share holding of ${parseFloat(investAmount).toLocaleString()} SAR was cataloged. Share receipt documents were delivered to Ahmad Al-Amri.`
                      }
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-full bg-[#0A73DF] hover:bg-[#005ab4] text-white py-3 rounded-xl text-xs font-bold transition-all"
                  >
                    {lang === 'ar' ? 'العودة للمنصة' : 'Back to Platform'}
                  </button>
                </motion.div>
              ) : isSubmitting ? (
                /* Loading progress states */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#eff4ff] border border-slate-200/50 p-6 rounded-xl text-center space-y-4"
                >
                  <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto shrink-0" />
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-[#0C74DF] font-kufi text-xs">
                      {submitStep === 1 && (lang === 'ar' ? 'جاري التحقق من الهوية المصرفية...' : 'Verifying linked secure bank escrow status...')}
                      {submitStep === 2 && (lang === 'ar' ? 'جاري تخصيص حصص التملك والتوقيع الإلكتروني...' : 'Registering cryptographically signed shares...')}
                      {submitStep === 3 && (lang === 'ar' ? 'جاري إصدار شهادة صك الاستثمار العقاري المؤسسي...' : 'Finalizing state asset certificate...')}
                    </h5>
                    <p className="text-[11px] text-slate-400 font-mono">{t.processingInvest}</p>
                  </div>
                </motion.div>
              ) : (
                /* Main interactive order entry form */
                <form onSubmit={handleInvestSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold text-slate-700 flex justify-between
                      ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                    `}>
                      <span>{t.investAmount}</span>
                      <span className="font-mono text-[#0a73e0]">{lang === 'ar' ? 'المحفظة المتاحة' : 'Wallet'}: {investorBalance.toLocaleString()} ر.s</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        min={minAmt}
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        className={`w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a73e0]/20 rounded-xl px-4 py-3 text-sm font-black font-mono text-slate-800
                          ${lang === 'ar' ? 'text-right pl-12' : 'text-left pr-12'}
                        `}
                      />
                      <span className={`absolute top-3.5 font-bold text-xs text-slate-400
                        ${lang === 'ar' ? 'left-4' : 'right-4'}
                      `}>
                        {lang === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit checkout button */}
                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-slate-950 py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Coins className="w-4 h-4 shrink-0" />
                    <span className="font-kufi">{t.investNow}</span>
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
