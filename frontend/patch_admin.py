import os

file_path = r'd:\ecofone main website\frontend\app\admin\page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if 'import BrandsManager' not in content:
    content = content.replace("import { useRouter } from 'next/navigation';", "import { useRouter } from 'next/navigation';\nimport BrandsManager from './components/brands-manager';")

# 2. Update activeTab state definition
content = content.replace(
    "const [activeTab, setActiveTab] = useState<'franchise' | 'contact' | 'stores' | 'team' | 'logs' | 'security' | 'reviews' | 'certificates' | 'services'>('franchise');",
    "const [activeTab, setActiveTab] = useState<'franchise' | 'contact' | 'stores' | 'team' | 'logs' | 'security' | 'reviews' | 'certificates' | 'services' | 'brands'>('franchise');"
)

# 3. Add allowed permissions 'brands'
content = content.replace(
    "setAllowedPermissions(['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates']);",
    "setAllowedPermissions(['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates', 'brands']);"
)
content = content.replace(
    "setAllowedPermissions(['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates', 'services']);",
    "setAllowedPermissions(['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates', 'services', 'brands']);"
)


# 4. Add sidebar button after 'services'
services_btn = """              {allowedPermissions.includes('services') && (
                <button
                onClick={() => { setActiveTab('services'); setIsSidebarOpen(false); }}
                className={`w-full text-left px-5 py-3.5 rounded-xl font-bold flex items-center gap-3.5 transition-all duration-300 ${
                  activeTab === 'services'
                    ? 'bg-emerald-600 shadow-md text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Services / Revenue Desk Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
                Revenue Streamdesk
              </button>
              )}"""

brands_btn = """              {allowedPermissions.includes('brands') && (
                <button
                onClick={() => { setActiveTab('brands'); setIsSidebarOpen(false); }}
                className={`w-full text-left px-5 py-3.5 rounded-xl font-bold flex items-center gap-3.5 transition-all duration-300 ${
                  activeTab === 'brands'
                    ? 'bg-emerald-600 shadow-md text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Top Brands CMS
              </button>
              )}"""

if 'Top Brands CMS' not in content:
    content = content.replace(services_btn, services_btn + "\n" + brands_btn)

# 5. Add header title
content = content.replace(
    "activeTab === 'services' ? 'Revenue Desk CMS' : 'security settings'",
    "activeTab === 'services' ? 'Revenue Desk CMS' : activeTab === 'brands' ? 'Top Brands CMS' : 'security settings'"
)

# 6. Add BrandsManager component after services
services_component = """            {activeTab === 'services' && ("""

brands_component = """            {activeTab === 'brands' && (
              <div className="animate-fade-in pt-1">
                <BrandsManager />
              </div>
            )}
"""

if 'BrandsManager />' not in content:
    content = content.replace(services_component, brands_component + "\n" + services_component)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Admin patched')
