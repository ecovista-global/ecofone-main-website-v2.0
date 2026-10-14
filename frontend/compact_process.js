const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';
let content = fs.readFileSync(filepath, 'utf-8');

const newProcessSection = `        {/* Process Section (Merged into FICO seamlessly) */}
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
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Initial product stock allocation</span>
                  </li>
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
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 leading-tight">Ongoing business support</span>
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
        </div>`;

const startMarker = '{/* Process Section (Merged into FICO seamlessly) */}';
const endMarker = '      </div>\n    </div>\n  );\n}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newProcessSection + '\n' + content.substring(endIndex);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Successfully adjusted cards to be wider and vertically shorter.');
} else {
  console.log('Could not find markers');
}
