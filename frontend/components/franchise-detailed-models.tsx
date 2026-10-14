import React from 'react';

export function StandardFranchiseModel() {
  return (
    <div className="w-full bg-white font-sans text-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-[#061C0F]">
            Franchise Investor, <span className="text-[#ea580c]">Company Operated (FICO)</span>
          </h2>
          <p className="text-slate-500 mt-3 text-lg">A complete breakdown of the investment required to set up an EcoFone store.</p>
        </div>

                {/* TOP GRID: Table & Right Panel */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 mb-16">
          
          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-[#0e2a1f] text-white px-6 py-4">
              <h3 className="font-bold text-sm tracking-wide">Investment Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#eef5f1] text-[#0e2a1f] text-[11px] font-bold uppercase tracking-wider border-b border-emerald-100">
                  <tr>
                    <th className="px-6 py-4 text-center w-16">S.No</th>
                    <th className="px-6 py-4">Particular</th>
                    <th className="px-6 py-4">What it covers</th>
                    <th className="px-6 py-4 text-center">Amount /<br/>Allocation</th>
                    <th className="px-6 py-4">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-5 text-center font-bold text-slate-500">1</td>
                    <td className="px-6 py-5 font-bold text-slate-900">Franchise Fees</td>
                    <td className="px-6 py-5 text-slate-600 text-[13px]">Franchise rights, business model, training & ongoing support</td>
                    <td className="px-6 py-5 text-center font-black text-slate-900">₹2,00,000</td>
                    <td className="px-6 py-5 text-slate-500 text-xs leading-relaxed">One-time fees for brand, business model and training support</td>
                  </tr>
                  <tr className="bg-[#f9fbf9]">
                    <td className="px-6 py-5 text-center font-bold text-slate-500">2</td>
                    <td className="px-6 py-5 font-bold text-slate-900">Infrastructure<br/>Development</td>
                    <td className="px-6 py-5 text-slate-600 text-[13px]">Store interior, wood & glass work, 2D/3D layout, branding and setup</td>
                    <td className="px-6 py-5 text-center font-black text-slate-900">₹3,00,000</td>
                    <td className="px-6 py-5 text-slate-500 text-xs leading-relaxed">Includes complete store setup and branding</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-5 text-center font-bold text-slate-500">3</td>
                    <td className="px-6 py-5 font-bold text-slate-900">Electronics & Tools</td>
                    <td className="px-6 py-5 text-slate-600 text-[13px]">Computer, printer, CCTV, AC, inverter, software and POS</td>
                    <td className="px-6 py-5 text-center font-black text-slate-900">₹2,00,000</td>
                    <td className="px-6 py-5 text-slate-500 text-xs leading-relaxed">Billing setup, service setup and other electronic requirements</td>
                  </tr>
                  <tr className="bg-[#f9fbf9]">
                    <td className="px-6 py-5 text-center font-bold text-slate-500">4</td>
                    <td className="px-6 py-5 font-bold text-slate-900">Premium Stock</td>
                    <td className="px-6 py-5 text-slate-600 text-[13px]">iPhone & other flagship series</td>
                    <td className="px-6 py-5 text-center font-black text-slate-900">65% of stock</td>
                    <td className="px-6 py-5 text-slate-500 text-xs leading-relaxed">Ideal mix of iPhones, Samsung & premium devices</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-5 text-center font-bold text-slate-500">5</td>
                    <td className="px-6 py-5 font-bold text-slate-900">Mid-Range Stock</td>
                    <td className="px-6 py-5 text-slate-600 text-[13px]">Android devices (Realme, Oppo, Vivo etc.)</td>
                    <td className="px-6 py-5 text-center font-black text-slate-900">30% of stock</td>
                    <td className="px-6 py-5 text-slate-500 text-xs leading-relaxed">Popular and high-demand models</td>
                  </tr>
                  <tr className="bg-[#f9fbf9]">
                    <td className="px-6 py-5 text-center font-bold text-slate-500">6</td>
                    <td className="px-6 py-5 font-bold text-slate-900">Accessories</td>
                    <td className="px-6 py-5 text-slate-600 text-[13px]">Chargers, earbuds, neckbands and other lifestyle add-ons</td>
                    <td className="px-6 py-5 text-center font-black text-slate-900">5% of stock</td>
                    <td className="px-6 py-5 text-slate-500 text-xs leading-relaxed">Add-on product range</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#124d33] text-white p-8 rounded-2xl relative overflow-hidden flex-1 flex flex-col justify-center">
              {/* Decorative Background Curved Shape */}
              <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-[#0a3824] rounded-full mix-blend-multiply opacity-50 blur-xl"></div>
              <div className="absolute top-0 right-0 w-48 h-full bg-[#185e40] rounded-l-[100px] shadow-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-[11px] tracking-[0.2em] font-bold uppercase mb-2 text-emerald-100">Estimated Project Cost</h3>
                <div className="w-12 h-[3px] bg-[#ea580c] mb-6 rounded-full"></div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-5xl lg:text-6xl font-black tracking-tight text-white">₹20 - 25 Lakh</div>
                </div>
                <p className="text-emerald-100/80 text-xs font-medium">(Depending upon survey, store size and location)</p>
              </div>
            </div>
            
            <div className="flex gap-6 h-[220px]">
              <div className="bg-[#fff8f2] p-8 rounded-2xl flex-1 flex flex-col relative overflow-hidden justify-center shadow-sm border border-orange-50">
                {/* Decorative Chart Bars */}
                <div className="absolute bottom-4 right-4 flex items-end gap-1 opacity-20">
                  <div className="w-4 h-6 bg-orange-300 rounded-t-sm"></div>
                  <div className="w-4 h-10 bg-orange-300 rounded-t-sm"></div>
                  <div className="w-4 h-16 bg-orange-400 rounded-t-sm"></div>
                </div>
                
                <h3 className="text-[10px] tracking-widest font-bold text-[#1e3a5f] uppercase mb-4 relative z-10">Expected Payback Period</h3>
                <div className="text-4xl lg:text-5xl font-black text-[#ea580c] leading-[1.1] mb-2 relative z-10">20 - 24<br/>Months</div>
                <p className="text-xs text-slate-500 font-medium relative z-10">(Indicative)</p>
              </div>
              <div className="bg-[#f0fcf5] p-8 rounded-2xl flex-1 flex flex-col justify-center shadow-sm border border-emerald-50">
                <h3 className="text-[10px] tracking-widest font-bold text-[#1e3a5f] uppercase mb-4">Return Model</h3>
                <div className="text-2xl font-black text-[#0b5c36] leading-snug mb-3">3% of total sales<br/>or 1.5% of investment</div>
                <p className="text-xs text-emerald-700/70 font-medium">(whichever is higher)</p>
              </div>
            </div>
          </div>
        </div>
                                        {/* Process Section (Merged into FICO seamlessly) */}
        <div className="w-full mt-12">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-[42px] font-black text-[#061C0F] mb-3">
              From Agreement to <span className="text-[#ea580c]">Store Launch</span>
            </h2>
            <p className="text-slate-500 text-lg">
              A simple and transparent process with end-to-end support from the EcoFone team.
            </p>
          </div>

          {/* Process Steps */}
          <div className="flex flex-col lg:flex-row gap-4 relative z-10 items-stretch pb-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex-1 relative flex flex-col">
              {/* Top Icons */}
              <div className="flex items-center mb-5 relative h-12">
                <div className="w-10 h-10 rounded-full bg-[#0b5c36] text-white flex items-center justify-center font-bold text-base shadow-sm z-10 relative">
                  01
                </div>
                <div className="w-14 h-14 rounded-full bg-[#eaf5f0] flex items-center justify-center absolute left-6">
                  <svg className="w-6 h-6 text-[#0b5c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg mb-2">Agreement & Onboarding</h3>
              <p className="text-slate-500 text-[12px] leading-relaxed mb-4">
                Sign the franchise agreement and complete the required formalities.
              </p>
              
              <div className="bg-[#f3faf6] rounded-xl p-4 mt-auto">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Discussion & due diligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Agreement signing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Onboarding & planning</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center -mx-4 z-20">
              <div className="w-6 h-6 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex-1 relative flex flex-col">
              <div className="flex items-center mb-5 relative h-12">
                <div className="w-10 h-10 rounded-full bg-[#ea580c] text-white flex items-center justify-center font-bold text-base shadow-sm z-10 relative">
                  02
                </div>
                <div className="w-14 h-14 rounded-full bg-[#fff4ed] flex items-center justify-center absolute left-6">
                  <svg className="w-6 h-6 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg mb-2">Store Setup</h3>
              <p className="text-slate-500 text-[12px] leading-relaxed mb-4">
                We design and set up your store with complete branding, interior and hardware.
              </p>
              
              <div className="bg-[#fff9f4] rounded-xl p-4 mt-auto">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Store layout, design & branding guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Interior setup and execution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Hardware & systems installation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center -mx-4 z-20">
              <div className="w-6 h-6 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex-1 relative flex flex-col">
              <div className="flex items-center mb-5 relative h-12">
                <div className="w-10 h-10 rounded-full bg-[#0b5c36] text-white flex items-center justify-center font-bold text-base shadow-sm z-10 relative">
                  03
                </div>
                <div className="w-14 h-14 rounded-full bg-[#eaf5f0] flex items-center justify-center absolute left-6">
                  <svg className="w-6 h-6 text-[#0b5c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg mb-2">Stock, Training & Marketing</h3>
              <p className="text-slate-500 text-[12px] leading-relaxed mb-4">
                Product stock, system setup, team training and complete marketing support to drive footfalls and sales.
              </p>
              
              <div className="bg-[#f3faf6] rounded-xl p-4 mt-auto">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Product training and operational support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Complete 360-degree digital promotion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">ATL & BTL marketing activities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center -mx-4 z-20">
              <div className="w-6 h-6 rounded-full bg-white border border-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex-1 relative flex flex-col">
              <div className="flex items-center mb-5 relative h-12">
                <div className="w-10 h-10 rounded-full bg-[#ea580c] text-white flex items-center justify-center font-bold text-base shadow-sm z-10 relative">
                  04
                </div>
                <div className="w-14 h-14 rounded-full bg-[#fff4ed] flex items-center justify-center absolute left-6">
                  <svg className="w-6 h-6 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg mb-2">Launch</h3>
              <p className="text-slate-500 text-[12px] leading-relaxed mb-4">
                Final readiness, handover and launch support to start operations with confidence.
              </p>
              
              <div className="bg-[#fff9f4] rounded-xl p-4 mt-auto">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Final checks & readiness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Store handover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Launch support within 30 days of site approval</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopInShopModel() {
  return (
    <div className="w-full bg-[#fafbfc] font-sans text-slate-800 border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 mb-12">
          {/* Left Title Area */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img src="/logo.jpg" alt="EcoFone" className="h-12 w-auto" />
            </div>
            <h2 className="text-4xl md:text-[42px] font-black text-[#061C0F] leading-[1.1] mb-2">
              EcoFone <span className="text-[#ea580c]">Shop-In-Shop</span> Partner Program
            </h2>
            <p className="text-slate-500 text-lg">A smart retail partnership for existing mobile & electronics stores.</p>
          </div>

          {/* Right Grid Icons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl shrink-0">📈</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Low Investment</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">High potential business model</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl">😀ª</div>
              <div>
                <h5 className="font-bold text-xs">Setup Inside Existing Store</h5>
                <p className="text-[10px] text-slate-500">Integrate seamlessly with your current store</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-xl shrink-0">📏</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Space Required</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">80 - 150 sq. ft.</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl">⚙️</div>
              <div>
                <h5 className="font-bold text-xs">CRM, Billing & Marketing Support</h5>
                <p className="text-[10px] text-slate-500">Tools and support to grow your business</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl shrink-0">👨‍💼</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Sales & Product Training</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">For you and your team</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 text-xl shrink-0">📱</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Premium Phones & Accessories</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">iPhone, Android and other flagship devices</p>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Table & Revenue Share */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 mb-12">
          
          {/* Table */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col self-start">
            <div className="bg-[#0e2a1f] text-white px-5 py-4">
              <h3 className="font-bold text-sm tracking-wide">Investment Breakdown</h3>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-[#eef5f1] text-[#0e2a1f] text-[11px] font-bold uppercase tracking-wider border-b border-emerald-100">
                <tr>
                  <th className="px-5 py-3 text-center w-16">S.No</th>
                  <th className="px-5 py-3">Particular</th>
                  <th className="px-5 py-3 text-center">Amount (₹)</th>
                  <th className="px-5 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-5 text-center font-bold text-slate-500">1</td>
                  <td className="px-6 py-5 font-bold text-slate-900">Franchise Fee</td>
                  <td className="px-6 py-5 text-center font-black text-slate-900">₹2,00,000</td>
                  <td className="px-6 py-5 text-slate-500 text-xs">Brand rights, training support</td>
                </tr>
                <tr className="bg-[#f9fbf9]">
                  <td className="px-6 py-5 text-center font-bold text-slate-500">2</td>
                  <td className="px-6 py-5 font-bold text-slate-900">Interior & Branding</td>
                  <td className="px-6 py-5 text-center font-black text-slate-900">₹2,00,000</td>
                  <td className="px-6 py-5 text-slate-500 text-xs">Store design, display and setup</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-5 text-center font-bold text-slate-500">3</td>
                  <td className="px-6 py-5 font-bold text-slate-900">Initial Stock Allocation</td>
                  <td className="px-6 py-5 text-center font-black text-slate-900">₹8,00,000</td>
                  <td className="px-6 py-5 text-slate-500 text-xs">iPhone, Android and flagship devices</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Revenue & Total Box */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#fff4eb] border border-orange-200 rounded-2xl p-6 relative overflow-hidden flex-1 flex flex-col justify-center items-center text-center">
              <div className="absolute top-4 left-4 text-orange-500 text-2xl">📊</div>
              <h4 className="text-orange-900 font-bold mb-2">Revenue Share Model</h4>
              <div className="bg-white border-2 border-orange-200 rounded-xl py-3 px-8 inline-block shadow-sm mb-3">
                <span className="text-3xl md:text-4xl font-black text-ecoOrange-600">3% of total sales</span>
              </div>
              <p className="text-slate-600 text-xs font-medium">Applicable after initial setup and subject to agreement terms.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex-1 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">₹</div>
                <div>
                  <h5 className="font-bold text-[11px] text-slate-500 uppercase tracking-wider mb-1">Estimated Total Investment</h5>
                  <div className="text-xl font-black text-slate-900">₹10 - 12 Lakh</div>
                  <p className="text-[10px] text-slate-400 mt-1">(Depending upon site survey)</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex-1 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">â±</div>
                <div>
                  <h5 className="font-bold text-[11px] text-slate-500 uppercase tracking-wider mb-1">Indicative Payback Period</h5>
                  <div className="text-xl font-black text-slate-900">20 - 24 Months*</div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              *All figures are indicative and may vary based on location, store size, final survey and agreement terms. No fixed or guaranteed returns.
            </p>
          </div>

        </div>

        {/* BOTTOM SECTION: Built Around Your Existing Business */}
        <hr className="border-slate-200 mb-10" />
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
          <div className="w-full md:w-1/3">
            <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">BUILT FOR GROWTH</h4>
            <h2 className="text-3xl font-black text-[#061C0F] leading-tight mb-4">
              Built Around Your <span className="text-[#ea580c]">Existing Business</span>
            </h2>
            <p className="text-slate-500 text-sm">Start your smartphone retail journey with minimal investment and maximum support.</p>
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl shrink-0">⚡</div>
              <div>
                <h5 className="font-bold text-sm">Fast Setup</h5>
                <p className="text-[11px] text-slate-500">Quick installation and integration within your existing store.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-50 text-ecoOrange-500 rounded-full flex items-center justify-center text-xl shrink-0">✨</div>
              <div>
                <h5 className="font-bold text-sm">Branding Support</h5>
                <p className="text-[11px] text-slate-500">Complete EcoFone display and visibility support.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl shrink-0">😀“¦</div>
              <div>
                <h5 className="font-bold text-sm">Centralized Product Support</h5>
                <p className="text-[11px] text-slate-500">Assured stock availability and supply support.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-50 text-ecoOrange-500 rounded-full flex items-center justify-center text-xl shrink-0">📈</div>
              <div>
                <h5 className="font-bold text-sm">Higher Margin Potential</h5>
                <p className="text-[11px] text-slate-500">Attractive margins on premium smartphones and accessories.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process & Ongoing Support Footer Grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
          
          {/* Partnership Process */}
          <div>
            <h4 className="font-bold text-emerald-900 mb-6 border-b border-emerald-100 pb-2">Our Partnership Process</h4>
            <div className="flex items-start gap-2 relative">
              <div className="flex flex-col items-center flex-1 text-center relative z-10">
                <div className="w-6 h-6 bg-ecoOrange-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center mb-2">01</div>
                <div className="text-xl mb-1">✅</div>
                <h6 className="font-bold text-[10px] mb-1 leading-tight">Site & Space Review</h6>
                <p className="text-[9px] text-slate-500 leading-tight">We assess your store space (80-150 sq. ft.) and business fit.</p>
              </div>
              <div className="text-slate-300 mt-5">➔</div>
              <div className="flex flex-col items-center flex-1 text-center relative z-10">
                <div className="w-6 h-6 bg-ecoOrange-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center mb-2">02</div>
                <div className="text-xl mb-1">😀“„</div>
                <h6 className="font-bold text-[10px] mb-1 leading-tight">Agreement & Setup</h6>
                <p className="text-[9px] text-slate-500 leading-tight">Sign agreement and complete store setup with branding support.</p>
              </div>
              <div className="text-slate-300 mt-5">➔</div>
              <div className="flex flex-col items-center flex-1 text-center relative z-10">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center mb-2">03</div>
                <div className="text-xl mb-1">😀“¦</div>
                <h6 className="font-bold text-[10px] mb-1 leading-tight">Stock & Staff Training</h6>
                <p className="text-[9px] text-slate-500 leading-tight">Initial stock allocation and training for you and your team.</p>
              </div>
              <div className="text-slate-300 mt-5">➔</div>
              <div className="flex flex-col items-center flex-1 text-center relative z-10">
                <div className="w-6 h-6 bg-ecoOrange-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center mb-2">04</div>
                <div className="text-xl mb-1">😀š€</div>
                <h6 className="font-bold text-[10px] mb-1 leading-tight">Launch & Ongoing Support</h6>
                <p className="text-[9px] text-slate-500 leading-tight">Go live with full operational and marketing support.</p>
              </div>
            </div>
          </div>

          {/* Ongoing Support */}
          <div>
            <h4 className="font-bold text-emerald-900 mb-6 border-b border-emerald-100 pb-2">Ongoing Support from EcoFone</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-1 mb-2 font-bold text-xs text-slate-800"><span className="text-emerald-500">⚙️</span> Business Support</div>
                <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-3">
                  <li>Stock updates</li>
                  <li>Pricing and offer management</li>
                  <li>Operational guidance</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2 font-bold text-xs text-slate-800"><span className="text-orange-500">💻</span> Digital Support</div>
                <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-3">
                  <li>CRM & billing software</li>
                  <li>Social media and online presence</li>
                  <li>Marketing assistance</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2 font-bold text-xs text-slate-800"><span className="text-emerald-500">👨‍💼</span> Training Support</div>
                <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-3">
                  <li>Sales training</li>
                  <li>Customer dealing</li>
                  <li>Product knowledge sessions</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2 font-bold text-xs text-slate-800"><span className="text-orange-500">âœ“</span> Trust & Brand</div>
                <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-3">
                  <li>Warranty-backed products</li>
                  <li>EcoFone brand network</li>
                  <li>Long-term partnership support</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export function ChooseFranchiseModel() {
  return (
    <div className="w-full relative overflow-hidden pt-8 pb-24">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 via-white to-emerald-50/50 -z-10"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#061C0F] mb-4">
            Choose Your <span className="text-[#ea580c]">Franchise Model</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Flexible opportunities designed for different types of partners — <br className="hidden md:block"/> whether you want to invest passively or run the store hands-on.
          </p>
        </div>

        {/* Models Grid */}
        <div className="relative w-full mx-auto">
          
          {/* Middle Graphic (Desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center z-10 w-48">
            
            <div className="relative w-32 h-32 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center mb-2 z-20">
              <img src="/logo.jpg" alt="EcoFone" className="w-20 h-auto" />
            </div>
            
            {/* Arrows */}
            <div className="absolute top-1/2 left-[-80px] -translate-y-1/2 text-ecoOrange-500">
              <svg className="w-20 h-8" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none">
                <path d="M100 20 C60 20 40 10 0 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polygon points="0,20 10,15 10,25" fill="currentColor"/>
              </svg>
              <div className="absolute -top-6 left-2 text-xs font-bold italic rotate-[-10deg]">Invest<br/>Passively</div>
            </div>
            
            <div className="absolute top-1/2 right-[-80px] -translate-y-1/2 text-emerald-500">
              <svg className="w-20 h-8" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none">
                <path d="M0 20 C40 20 60 10 100 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polygon points="100,20 90,15 90,25" fill="currentColor"/>
              </svg>
              <div className="absolute -top-6 right-2 text-xs font-bold italic rotate-[10deg]">Operate<br/>Hands-On</div>
            </div>
            
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-[320px] relative z-0">
            
            {/* FICO Card */}
            <div className="bg-[#fff9f5] rounded-3xl p-8 border-2 border-orange-100 shadow-[0_20px_40px_-15px_rgba(234,88,12,0.1)] relative">
              <div className="absolute top-8 right-8 w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-ecoOrange-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div className="inline-block bg-orange-100 text-ecoOrange-600 font-black px-4 py-1.5 rounded-full text-sm mb-6">FICO</div>
              <h3 className="text-2xl lg:text-[28px] font-black text-slate-900 leading-tight mb-3">Franchise Investor,<br/>Company Operated</h3>
              <p className="text-slate-600 text-sm mb-8 pr-12">Invest and let EcoFone handle the operations, staffing and growth.</p>
              
              <ul className="space-y-3 mb-10">
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-ecoOrange-500 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Minimal operational involvement
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-ecoOrange-500 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Professionally managed by EcoFone
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-ecoOrange-500 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Transparent revenue sharing model
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-ecoOrange-500 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Ideal for investors and existing store owners
                </li>
              </ul>
              
              <button className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-4 rounded-full transition-colors shadow-lg">
                View Detailed Breakdown →
              </button>
            </div>

            {/* FIFO Card */}
            <div className="bg-[#f5fbf7] rounded-3xl p-8 border-2 border-emerald-100 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] relative">
              <div className="absolute top-8 right-8 w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              </div>
              <div className="inline-block bg-emerald-200 text-emerald-800 font-black px-4 py-1.5 rounded-full text-sm mb-6">FIFO</div>
              <h3 className="text-2xl lg:text-[28px] font-black text-slate-900 leading-tight mb-3">Franchise Investor,<br/>Franchise Operated</h3>
              <p className="text-slate-600 text-sm mb-8 pr-12">You own and operate the store with full control and brand support.</p>
              
              <ul className="space-y-3 mb-10">
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Full operational control
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Higher margin potential
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Complete training and system support
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Ideal for entrepreneurs and existing retailers
                </li>
              </ul>
              
              <button className="w-full bg-[#061C0F] hover:bg-emerald-900 text-white font-bold py-4 rounded-full transition-colors shadow-lg">
                View Detailed Breakdown →
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

