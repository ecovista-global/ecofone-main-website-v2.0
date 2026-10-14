const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';
let content = fs.readFileSync(filepath, 'utf-8');

// Replace the table header and rows for FICO
const tableOld = `<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
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
                </thead>`;
                
const tableNew = `<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
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
                </thead>`;

content = content.replace(tableOld, tableNew);

// Replace the FICO Right Panel Dark Green Card
const rightPanelOld = `<h3 className="text-[11px] tracking-[0.2em] font-bold uppercase mb-4 text-emerald-100">Estimated Project Cost</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-6xl font-black tracking-tight">₹20 - 25 Lakh</div>
                </div>
                <p className="text-emerald-100/80 text-xs font-medium mb-6">(Depending upon survey, store size and location)</p>
                <div className="w-16 h-1 bg-[#ea580c]"></div>`;

const rightPanelNew = `<h3 className="text-[11px] tracking-[0.2em] font-bold uppercase mb-2 text-emerald-100">Estimated Project Cost</h3>
                <div className="w-12 h-[3px] bg-[#ea580c] mb-6 rounded-full"></div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-5xl lg:text-6xl font-black tracking-tight text-white">₹20 - 25 Lakh</div>
                </div>
                <p className="text-emerald-100/80 text-xs font-medium">(Depending upon survey, store size and location)</p>`;

content = content.replace(rightPanelOld, rightPanelNew);

// Update FICO rows to alternate colors like Image 1
const rowsTarget = `<tbody className="divide-y divide-slate-100">
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
                  </tr>`;

const rowsReplacement = `<tbody className="divide-y divide-slate-100">
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
                  </tr>`;

content = content.replace(rowsTarget, rowsReplacement);

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Successfully applied table and card design from image 1 to true data.');
