const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const setupOld = `<div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl">😀 ª</div>
              <div>
                <h5 className="font-bold text-xs">Setup Inside Existing Store</h5>
                <p className="text-[10px] text-slate-500">Integrate seamlessly with your current store</p>
              </div>
            </div>`;
const setupNew = `<div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl shrink-0">🏪</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Setup Inside Existing Store</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Integrate seamlessly with your current store</p>
              </div>
            </div>`;

const crmOld = `<div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl">⚙️ </div>
              <div>
                <h5 className="font-bold text-xs">CRM, Billing & Marketing Support</h5>
                <p className="text-[10px] text-slate-500">Tools and support to grow your business</p>
              </div>
            </div>`;
const crmNew = `<div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl shrink-0">⚙️</div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">CRM, Billing & Marketing Support</h5>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Tools and support to grow your business</p>
              </div>
            </div>`;

content = content.replace(setupOld, setupNew);
content = content.replace(setupOld.replace(/\r\n/g, '\n'), setupNew);
content = content.replace(crmOld, crmNew);
content = content.replace(crmOld.replace(/\r\n/g, '\n'), crmNew);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Fixed cards.');
