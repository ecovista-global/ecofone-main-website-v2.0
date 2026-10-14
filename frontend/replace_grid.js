const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';
let content = fs.readFileSync(filepath, 'utf-8');

const newGridContent = `        {/* TOP GRID: Table & Right Panel */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 mb-16">
          
          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#061C0F] text-white text-[11px] tracking-wider uppercase">
                  <tr>
                    <th className="px-6 py-4 text-center">S.No</th>
                    <th className="px-6 py-4">Particular</th>
                    <th className="px-6 py-4">What it covers</th>
                    <th className="px-6 py-4 text-center">Amount /<br/>Allocation</th>
                    <th className="px-6 py-4">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-6 text-center font-bold">1</td>
                    <td className="px-6 py-6 font-bold text-slate-900">Franchise Fees</td>
                    <td className="px-6 py-6 text-slate-600">Franchise rights, business model, training & ongoing support</td>
                    <td className="px-6 py-6 text-center font-bold text-slate-900">₹2,00,000</td>
                    <td className="px-6 py-6 text-slate-600 text-xs leading-relaxed">One-time fees for brand, business model and training support</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-6 text-center font-bold">2</td>
                    <td className="px-6 py-6 font-bold text-slate-900">Infrastructure<br/>Development</td>
                    <td className="px-6 py-6 text-slate-600">Store interior, wood & glass work, 2D/3D layout, branding and setup</td>
                    <td className="px-6 py-6 text-center font-bold text-slate-900">₹3,00,000</td>
                    <td className="px-6 py-6 text-slate-600 text-xs leading-relaxed">Includes complete store setup and branding</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-6 text-center font-bold">3</td>
                    <td className="px-6 py-6 font-bold text-slate-900">Electronics & Tools</td>
                    <td className="px-6 py-6 text-slate-600">Computer, printer, CCTV, AC, inverter, software and POS</td>
                    <td className="px-6 py-6 text-center font-bold text-slate-900">₹2,00,000</td>
                    <td className="px-6 py-6 text-slate-600 text-xs leading-relaxed">Billing setup, service setup and other electronic requirements</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-6 text-center font-bold">4</td>
                    <td className="px-6 py-6 font-bold text-slate-900">Premium Stock</td>
                    <td className="px-6 py-6 text-slate-600">iPhone & other flagship series</td>
                    <td className="px-6 py-6 text-center font-bold text-slate-900">65% of stock</td>
                    <td className="px-6 py-6 text-slate-600 text-xs leading-relaxed">Ideal mix of iPhones, Samsung & premium devices</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-6 text-center font-bold">5</td>
                    <td className="px-6 py-6 font-bold text-slate-900">Mid-Range Stock</td>
                    <td className="px-6 py-6 text-slate-600">Android devices (Realme, Oppo, Vivo etc.)</td>
                    <td className="px-6 py-6 text-center font-bold text-slate-900">30% of stock</td>
                    <td className="px-6 py-6 text-slate-600 text-xs leading-relaxed">Popular and high-demand models</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-6 text-center font-bold">6</td>
                    <td className="px-6 py-6 font-bold text-slate-900">Accessories</td>
                    <td className="px-6 py-6 text-slate-600">Chargers, earbuds, neckbands and other lifestyle add-ons</td>
                    <td className="px-6 py-6 text-center font-bold text-slate-900">5% of stock</td>
                    <td className="px-6 py-6 text-slate-600 text-xs leading-relaxed">Add-on product range</td>
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
                <h3 className="text-[11px] tracking-[0.2em] font-bold uppercase mb-4 text-emerald-100">Estimated Project Cost</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-6xl font-black tracking-tight">₹20 - 25 Lakh</div>
                </div>
                <p className="text-emerald-100/80 text-xs font-medium mb-6">(Depending upon survey, store size and location)</p>
                <div className="w-16 h-1 bg-[#ea580c]"></div>
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
        </div>`;

const startMarker = '{/* TOP GRID: Table & Right Panel */}';
const endMarker = '{/* BOTTOM HALF: Support & Policies */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newGridContent + '\n        ' + content.substring(endIndex);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Successfully replaced grid section.');
} else {
  console.log('Could not find markers');
}
