import React, { useState } from 'react';
import { X, Building, Check, Loader2, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';
import { motion, AnimatePresence } from 'motion/react';

interface SuggestProjectModalProps {
  lang: Language;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export default function SuggestProjectModal({ lang, onClose, onSubmitSuccess }: SuggestProjectModalProps) {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [owner, setOwner] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [value, setValue] = useState('');
  const [roi, setRoi] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!owner || !title || !location || !value || !roi) {
      alert(lang === 'ar' ? 'يرجى تعبئة كافة الحقول المطلوبة!' : 'Please fill all required inputs!');
      return;
    }

    setLoading(true);
    // Simulating real-estate audit processing
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    onSubmitSuccess();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden relative"
      >
        {/* Close Button X absolute overlay */}
        <button 
          onClick={onClose}
          className={`absolute top-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors z-50
            ${lang === 'ar' ? 'left-4' : 'right-4'}
          `}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 select-none">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <Check className="w-7 h-7 shrink-0" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-[#0C74DF] font-kufi">{lang === 'ar' ? 'تم إرسال المقترح بنجاح' : 'Proposal Submitted'}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-body-md">
                    {t.submitSuccess}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-full bg-[#0a73e0] hover:bg-[#005ab4] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors font-kufi"
                >
                  {t.close}
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className={`flex items-center gap-3 border-b border-slate-100 pb-4
                  ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}
                `}>
                  <div className="w-10 h-10 bg-[#eff4ff] text-[#0a73e0] rounded-lg flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h3 className="font-extrabold text-sm text-slate-900 font-kufi">{t.suggestProjectTitle}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{lang === 'ar' ? 'تقديم بيانات الأصول للدراسة الفنية والمالية' : 'Submit asset data for technical evaluation'}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Owner field */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold text-slate-700 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t.ownerName} <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'ar' ? 'مثال: شركة نمو العقارية' : 'e.g. Al-Waha Developers'}
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      className={`w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a73e0]/20 rounded-xl px-4 py-2.5 text-xs text-slate-800
                        ${lang === 'ar' ? 'text-right' : 'text-left'}
                      `}
                    />
                  </div>

                  {/* Title field */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold text-slate-700 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t.propertyTitle} <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'ar' ? 'مثال: مجمع الكريستال السكني ٤' : 'e.g. Crystal Heights Block 4'}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a73e0]/20 rounded-xl px-4 py-2.5 text-xs text-slate-800
                        ${lang === 'ar' ? 'text-right' : 'text-left'}
                      `}
                    />
                  </div>

                  {/* Location field */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold text-slate-700 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t.propertyLocation} <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'ar' ? 'المدينة، الحي (مثال: الرياض، حي الصحافة)' : 'e.g. Riyadh, Al-Yasmin'}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a73e0]/20 rounded-xl px-4 py-2.5 text-xs text-slate-800
                        ${lang === 'ar' ? 'text-right' : 'text-left'}
                      `}
                    />
                  </div>

                  {/* Estimated Valuation & Expected ROI double fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`text-xs font-bold text-slate-700 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        {lang === 'ar' ? 'القيمة الإجمالية (ر.س)' : 'Total Valuation (SAR)'} <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        required
                        placeholder="75,000,000"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={`w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a73e0]/20 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono
                          ${lang === 'ar' ? 'text-right' : 'text-left'}
                        `}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`text-xs font-bold text-slate-700 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        {lang === 'ar' ? 'العائد المستهدف (%)' : 'Expected ROI (%)'} <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        required
                        step="0.1"
                        placeholder="12.5"
                        value={roi}
                        onChange={(e) => setRoi(e.target.value)}
                        className={`w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a73e0]/20 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono
                          ${lang === 'ar' ? 'text-right' : 'text-left'}
                        `}
                      />
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/60 duration-200 text-slate-950 py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>{lang === 'ar' ? 'جاري إرسال البيانات للمراجعة...' : 'Sending digital proposal...'}</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 shrink-0" />
                        <span className="font-kuf">{t.sendRequest}</span>
                      </>
                    )}
                  </button>

                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
