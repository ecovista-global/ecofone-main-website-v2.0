import React from 'react';
import Link from 'next/link';

export default function InvestorModel() {
  return (
    <section className="w-full bg-[#f8fbf9] py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1240px] mx-auto space-y-10">

        {/* ── Header ── */}
        <div className="text-center space-y-2.5">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[48px] text-slate-900 leading-tight">
            Invest Today. Build <span className="text-[#059669]">What's Next.</span>
          </h2>
          <p className="text-base sm:text-[16px] text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            A structured franchise opportunity backed by a trusted brand, strong unit
            economics and end-to-end support — to tap into India's growing refurbished
            smartphone market.
          </p>
        </div>

        {/* ── Diagram (Desktop) ── */}
        <div className="relative hidden lg:block w-full max-w-[1120px] mx-auto" style={{ height: 320 }}>

          {/* SVG Connector Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 320"
            preserveAspectRatio="none"
          >
            {/* Top-left: Capital Investment (dot at 245, 95) -> Icon 1 (left side at 352, 120) */}
            <path d="M 245,95 C 285,95 315,120 352,120" fill="none" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="4 3" />
            <circle cx="245" cy="95" r="4" fill="#059669" />

            {/* Top-right: Icon 2 (right side at 648, 120) -> Store Setup (dot at 755, 95) */}
            <path d="M 648,120 C 685,120 715,95 755,95" fill="none" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="4 3" />
            <circle cx="755" cy="95" r="4" fill="#f97316" />

            {/* Bottom-left: We Operate (dot at 245, 225) -> Icon 3 (left side at 352, 200) */}
            <path d="M 245,225 C 285,225 315,200 352,200" fill="none" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="4 3" />
            <circle cx="245" cy="225" r="4" fill="#f97316" />

            {/* Bottom-right: Icon 4 (right side at 648, 200) -> You Earn (dot at 755, 225) */}
            <path d="M 648,200 C 685,200 715,225 755,225" fill="none" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="4 3" />
            <circle cx="755" cy="225" r="4" fill="#059669" />
          </svg>

          {/* ── LEFT TEXT BLOCKS ── */}
          <div className="absolute left-0 top-[45px] w-[245px]">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[17px] font-bold text-slate-900">Capital Investment</h3>
              <span className="text-[11px] font-extrabold text-[#059669] bg-emerald-100/60 px-1.5 py-0.5 rounded">01</span>
            </div>
            <p className="text-[14px] text-slate-600 leading-snug">
              Partner with us with a total investment of <span className="font-semibold text-slate-800">₹20 – 25 Lakhs</span>, depending on store size, location and stock mix.
            </p>
          </div>

          <div className="absolute left-0 bottom-[45px] w-[245px]">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[17px] font-bold text-slate-900">We Operate</h3>
              <span className="text-[11px] font-extrabold text-[#f97316] bg-orange-100/60 px-1.5 py-0.5 rounded">03</span>
            </div>
            <p className="text-[14px] text-slate-600 leading-snug">
              Our team handles store setup, staffing, training, marketing, inventory and day-to-day operations.
            </p>
          </div>

          {/* ── RIGHT TEXT BLOCKS ── */}
          <div className="absolute right-0 top-[45px] w-[245px]">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[17px] font-bold text-slate-900">Store Setup</h3>
              <span className="text-[11px] font-extrabold text-[#f97316] bg-orange-100/60 px-1.5 py-0.5 rounded">02</span>
            </div>
            <p className="text-[14px] text-slate-600 leading-snug">
              We design and set up your store with branding, interior, tools, systems and initial inventory.
            </p>
          </div>

          <div className="absolute right-0 bottom-[45px] w-[245px]">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[17px] font-bold text-slate-900">You Earn</h3>
              <span className="text-[11px] font-extrabold text-[#059669] bg-emerald-100/60 px-1.5 py-0.5 rounded">04</span>
            </div>
            <p className="text-[14px] text-slate-600 leading-snug">
              Generate revenue from device sales, repairs and accessories with a structured return model.
            </p>
          </div>

          {/* ── CENTER CIRCLE ── */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 220, height: 220 }}
          >
            {/* Soft Green Glow */}
            <div className="absolute inset-0 rounded-full bg-emerald-200/50 blur-2xl scale-125 -z-10" />
            <div className="w-full h-full rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white p-6">
              <img
                src="/logo.png"
                alt="EcoFone Logo"
                className="w-[150px] max-h-[110px] object-contain drop-shadow-sm"
              />
            </div>
          </div>

          {/* ── ICON BOXES ── */}
          {/* Top-Left Icon Box */}
          <div
            className="absolute w-[54px] h-[54px] bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-[#059669]"
            style={{ left: '35.2%', top: '28%', transform: 'translate(-50%, -50%)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Top-Right Icon Box */}
          <div
            className="absolute w-[54px] h-[54px] bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-[#f97316]"
            style={{ left: '64.8%', top: '28%', transform: 'translate(-50%, -50%)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9L3.75 3h16.5l1.5 6M2.25 9h19.5M2.25 9v10.5a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5V9M9 21v-7.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5V21" />
            </svg>
          </div>

          {/* Bottom-Left Icon Box */}
          <div
            className="absolute w-[54px] h-[54px] bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-[#f97316]"
            style={{ left: '35.2%', top: '72%', transform: 'translate(-50%, -50%)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.298c-.203-.896-.064-1.847.4-2.65l3.277-3.277a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437" />
            </svg>
          </div>

          {/* Bottom-Right Icon Box */}
          <div
            className="absolute w-[54px] h-[54px] bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-[#059669]"
            style={{ left: '64.8%', top: '72%', transform: 'translate(-50%, -50%)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>

        </div>

        {/* ── Mobile Diagram (fallback) ── */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
          {[
            { num: '01', color: 'emerald', title: 'Capital Investment', text: 'Partner with us with a total investment of ₹20 – 25 Lakhs, depending on store size, location and stock mix.' },
            { num: '02', color: 'orange', title: 'Store Setup', text: 'We design and set up your store with branding, interior, tools, systems and initial inventory.' },
            { num: '03', color: 'orange', title: 'We Operate', text: 'Our team handles store setup, staffing, training, marketing, inventory and day-to-day operations.' },
            { num: '04', color: 'emerald', title: 'You Earn', text: 'Generate revenue from device sales, repairs and accessories with a structured return model.' },
          ].map(({ num, color, title, text }) => (
            <div key={num} className="bg-white/80 p-4 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${color === 'emerald' ? 'text-[#059669] bg-emerald-50' : 'text-[#f97316] bg-orange-50'}`}>{num}</span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">{text}</p>
            </div>
          ))}
        </div>

        {/* ── Stat Cards Grid (4 columns spanning full width) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[11.5px] text-[#059669] font-bold uppercase tracking-wider mb-1.5">TOTAL INVESTMENT</p>
              <p className="text-[26px] font-black text-slate-900 leading-tight">₹20 – 25 Lakhs</p>
            </div>
            <p className="text-[13px] text-slate-500 mt-3 leading-relaxed">Depends on store size, location and stock mix.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9L3.75 3h16.5l1.5 6M2.25 9h19.5M2.25 9v10.5a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5V9M9 21v-7.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5V21" />
                </svg>
              </div>
              <p className="text-[11.5px] text-[#f97316] font-bold uppercase tracking-wider mb-1.5">STORE FORMAT</p>
              <p className="text-[26px] font-black text-slate-900 leading-tight">100 – 150 Sq. Ft.</p>
            </div>
            <p className="text-[13px] text-slate-500 mt-3 leading-relaxed">Compact, high-utility format for metro and tier 2/3 cities.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-5 font-black text-lg">
                %
              </div>
              <p className="text-[11.5px] text-[#059669] font-bold uppercase tracking-wider mb-1.5">EARNING STRUCTURE (FICO)</p>
              <p className="text-[22px] font-black text-slate-900 leading-tight">
                3% on total sales<br />or 1.5% of investment
              </p>
            </div>
            <p className="text-[13px] text-slate-500 mt-3 leading-relaxed">Whichever is higher, as per the agreed model.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[11.5px] text-[#f97316] font-bold uppercase tracking-wider mb-1.5">TARGET PAYBACK PERIOD</p>
              <p className="text-[26px] font-black text-slate-900 leading-tight">20 – 24 Months</p>
            </div>
            <p className="text-[13px] text-slate-500 mt-3 leading-relaxed">Designed for steady capital recovery with strong unit economics.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
