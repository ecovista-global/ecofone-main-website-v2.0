const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';
let content = fs.readFileSync(filepath, 'utf-8');

const newProcessSection = `        {/* Process Section (Merged into FICO seamlessly) */}
        <div className="mt-20 flex flex-col items-center text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#eaf5f0] text-[#125c38] font-bold text-[11px] tracking-widest uppercase rounded-full mb-4">
            Our Process
          </div>
          <h2 className="text-3xl md:text-[42px] font-black text-[#061C0F] mb-3">
            From Agreement to <span className="text-[#ea580c]">Store Launch</span>
          </h2>
          <p className="text-slate-500 text-lg">
            A simple and transparent process with end-to-end support from the EcoFone team.
          </p>
        </div>

        {/* Process Steps */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative z-10 items-stretch">
          
          {/* Step 1 */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 relative flex flex-col">
            {/* Top Icons */}
            <div className="flex items-center mb-8 relative h-16">
              <div className="w-12 h-12 rounded-full bg-[#0b5c36] text-white flex items-center justify-center font-bold text-lg shadow-md z-10 relative">
                01
              </div>
              <div className="w-16 h-16 rounded-full bg-[#eaf5f0] flex items-center justify-center absolute left-7">
                <svg className="w-7 h-7 text-[#0b5c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
            </div>
            
            <h3 className="font-bold text-slate-900 text-[19px] mb-3">Agreement & Onboarding</h3>
            <p className="text-slate-500 text-[13px] leading-relaxed mb-8">
              Sign the franchise agreement and complete the required formalities.
            </p>
            
            <div className="bg-[#f3faf6] rounded-2xl p-5 mt-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Discussion & due diligence</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Agreement signing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Onboarding & planning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center -mx-5 z-20">
            <div className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 relative flex flex-col">
            <div className="flex items-center mb-8 relative h-16">
              <div className="w-12 h-12 rounded-full bg-[#ea580c] text-white flex items-center justify-center font-bold text-lg shadow-md z-10 relative">
                02
              </div>
              <div className="w-16 h-16 rounded-full bg-[#fff4ed] flex items-center justify-center absolute left-7">
                <svg className="w-7 h-7 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
            </div>
            
            <h3 className="font-bold text-slate-900 text-[19px] mb-3">Store Setup</h3>
            <p className="text-slate-500 text-[13px] leading-relaxed mb-8">
              We design and set up your store with complete branding, interior and hardware.
            </p>
            
            <div className="bg-[#fff9f4] rounded-2xl p-5 mt-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Store layout, design & branding guidance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Interior setup and execution</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Hardware & systems installation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center -mx-5 z-20">
            <div className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 relative flex flex-col">
            <div className="flex items-center mb-8 relative h-16">
              <div className="w-12 h-12 rounded-full bg-[#0b5c36] text-white flex items-center justify-center font-bold text-lg shadow-md z-10 relative">
                03
              </div>
              <div className="w-16 h-16 rounded-full bg-[#eaf5f0] flex items-center justify-center absolute left-7">
                <svg className="w-7 h-7 text-[#0b5c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              </div>
            </div>
            
            <h3 className="font-bold text-slate-900 text-[19px] mb-3">Stock, Training & Marketing</h3>
            <p className="text-slate-500 text-[13px] leading-relaxed mb-8">
              Product stock, system setup, team training and complete marketing support to drive footfalls and sales.
            </p>
            
            <div className="bg-[#f3faf6] rounded-2xl p-5 mt-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Initial product stock allocation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Product training and operational support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Complete 360-degree digital promotion and marketing support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">ATL & BTL marketing activities</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#0b5c36] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Ongoing business support and best practices</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center -mx-5 z-20">
            <div className="w-8 h-8 rounded-full bg-white border border-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 relative flex flex-col">
            <div className="flex items-center mb-8 relative h-16">
              <div className="w-12 h-12 rounded-full bg-[#ea580c] text-white flex items-center justify-center font-bold text-lg shadow-md z-10 relative">
                04
              </div>
              <div className="w-16 h-16 rounded-full bg-[#fff4ed] flex items-center justify-center absolute left-7">
                <svg className="w-7 h-7 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
            </div>
            
            <h3 className="font-bold text-slate-900 text-[19px] mb-3">Launch</h3>
            <p className="text-slate-500 text-[13px] leading-relaxed mb-8">
              Final readiness, handover and launch support to start operations with confidence.
            </p>
            
            <div className="bg-[#fff9f4] rounded-2xl p-5 mt-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Final checks & readiness</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Store handover</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">Launch support within 30 days of site approval</span>
                </li>
              </ul>
            </div>
          </div>
        </div>`;

const startMarker = '{/* BOTTOM HALF: Support & Policies */}';
const endMarker = '      </div>\n    </div>\n  );\n}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newProcessSection + '\n' + content.substring(endIndex);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Successfully replaced process section with optimized design.');
} else {
  console.log('Could not find markers');
}
