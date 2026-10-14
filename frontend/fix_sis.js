const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';
let content = fs.readFileSync(filepath, 'utf-8');

// 1. Fix the Top 6 Cards (remove hard borders, soften shadow, increase padding)
const cardsOld = `<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl">📈</div>
              <div>
                <h5 className="font-bold text-xs">Low Investment</h5>
                <p className="text-[10px] text-slate-500">High potential business model</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl">😀 ª</div>
              <div>
                <h5 className="font-bold text-xs">Setup Inside Existing Store</h5>
                <p className="text-[10px] text-slate-500">Integrate seamlessly with your current store</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 text-xl">✅²</div>
              <div>
                <h5 className="font-bold text-xs">Space Required</h5>
                <p className="text-[10px] text-slate-500">80 - 150 sq. ft.</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl">⚙️ </div>
              <div>
                <h5 className="font-bold text-xs">CRM, Billing & Marketing Support</h5>
                <p className="text-[10px] text-slate-500">Tools and support to grow your business</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl">😀‘¥</div>
              <div>
                <h5 className="font-bold text-xs">Sales & Product Training</h5>
                <p className="text-[10px] text-slate-500">For you and your team</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 text-xl">📱</div>
              <div>
                <h5 className="font-bold text-xs">Premium Phones & Accessories</h5>
                <p className="text-[10px] text-slate-500">iPhone, Android and other flagship devices</p>
              </div>
            </div>
          </div>`;

const cardsNew = `<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl shrink-0">📈</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Low Investment</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">High potential business model</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl shrink-0">🏪</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Setup Inside Existing Store</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Integrate seamlessly with your current store</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-xl shrink-0">📏</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Space Required</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">80 - 150 sq. ft.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl shrink-0">⚙️</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">CRM, Billing & Marketing Support</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Tools and support to grow your business</p>
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
          </div>`;

content = content.replace(cardsOld, cardsNew);

// 2. Fix the Table Gap
const tableGapOld = `<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="bg-[#0e2a1f] text-white px-5 py-3">`;
const tableGapNew = `<div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col h-full justify-start">
            <div className="bg-[#0e2a1f] text-white px-5 py-4">`;
content = content.replace(tableGapOld, tableGapNew);

const theadOld = `<thead className="bg-[#a8c7b8] text-[#0e2a1f] text-xs font-bold uppercase">`;
const theadNew = `<thead className="bg-[#eef5f1] text-[#0e2a1f] text-[11px] font-bold uppercase tracking-wider border-b border-emerald-100">`;
content = content.replace(theadOld, theadNew);

// 3. Fix alternating colors inside table body
const tbodyOld = `<tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-5 py-4 text-center font-bold text-slate-500">1</td>
                  <td className="px-5 py-4 font-bold text-slate-800">Franchise Fee</td>
                  <td className="px-5 py-4 text-center font-black text-slate-900">₹2,00,000</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">Brand rights, training support</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-5 py-4 text-center font-bold text-slate-500">2</td>
                  <td className="px-5 py-4 font-bold text-slate-800">Interior & Branding</td>
                  <td className="px-5 py-4 text-center font-black text-slate-900">₹2,00,000</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">Store design, display and setup</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-center font-bold text-slate-500">3</td>
                  <td className="px-5 py-4 font-bold text-slate-800">Initial Stock Allocation</td>
                  <td className="px-5 py-4 text-center font-black text-slate-900">₹8,00,000</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">iPhone, Android and flagship devices</td>
                </tr>
              </tbody>`;

const tbodyNew = `<tbody className="divide-y divide-slate-100">
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
              </tbody>`;

content = content.replace(tbodyOld, tbodyNew);

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Successfully fixed ShopInShopModel layout.');
