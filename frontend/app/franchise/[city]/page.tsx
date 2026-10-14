import React from 'react';
import { Metadata } from 'next';
import FranchiseLeadForm from '../../../components/franchise-lead-form';

// The list of cities specified in the SEO strategy
const FRANCHISE_CITIES = [
  'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'pune', 
  'kolkata', 'lucknow', 'jaipur', 'ahmedabad', 'noida', 'gurgaon', 
  'patna', 'indore', 'bhopal', 'chandigarh', 'kanpur', 'varanasi'
];

export async function generateStaticParams() {
  return FRANCHISE_CITIES.map((city) => ({
    city: city,
  }));
}

type Props = {
  params: Promise<{ city: string }>
};

// Capitalize helper for display
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const cityName = capitalize(resolvedParams.city);
  return {
    title: `Refurbished Phone Franchise in ${cityName} | EcoFone`,
    description: `Start a highly profitable refurbished mobile store franchise in ${cityName}. Tap into ${cityName}'s growing second-hand smartphone market with EcoFone's complete business support.`,
    alternates: {
      canonical: `https://www.ecofone.co.in/franchise/${resolvedParams.city}`
    },
    openGraph: {
      title: `Start an EcoFone Franchise in ${cityName}`,
      description: `Low investment mobile store franchise opportunity in ${cityName}. Connect with us to check territory availability.`,
      images: [{ url: 'https://www.ecofone.co.in/franchise-local-og.jpg' }]
    }
  };
}

export default async function CityFranchisePage({ params }: Props) {
  const resolvedParams = await params;
  const cityName = capitalize(resolvedParams.city);

  return (
    <div className="bg-[#FAF9F6] text-slate-800 font-sans min-h-screen">
      
      {/* 1. City Specific Hero */}
      <section className="relative bg-[#061C0F] text-white overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-ecoOrange-500 font-bold tracking-widest text-sm uppercase mb-4 block">
              Exclusive Territory: {cityName}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
              Launch a Premium Refurbished Phone Store in <span className="text-emerald-400">{cityName}</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
              {cityName} has one of the fastest-growing markets for certified second-hand iPhones and Androids. Secure your territory and launch your own EcoFone franchise today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#apply" className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-4 px-8 rounded-full text-center transition-all shadow-[0_8px_20px_rgba(234,88,12,0.3)]">
                Check Territory Availability
              </a>
            </div>
            
            <div className="mt-12 flex gap-8 border-t border-white/10 pt-6">
              <div>
                <div className="text-3xl font-black text-emerald-400">High</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Local Demand</div>
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Setup Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="aspect-square bg-emerald-900/40 border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl relative flex items-center justify-center p-8 text-center">
               <h2 className="text-4xl font-black text-white/50 transform -rotate-12">
                 EcoFone <br/><span className="text-emerald-500">{cityName}</span>
               </h2>
               <div className="absolute inset-0 bg-gradient-to-t from-[#061C0F] via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Local Market Context */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why {cityName}?</h2>
            <p className="text-slate-600">The demand for reliable, warrantied used smartphones in {cityName} is currently outpacing supply. As an EcoFone partner, you bridge this gap with guaranteed inventory.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold mb-3">Target Audience</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Students, young professionals, and budget-conscious buyers in {cityName} seeking premium brands at accessible prices.</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold mb-3">Hyperlocal Marketing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We provide geo-targeted lead generation pushing ready buyers and sellers directly to your store in {cityName}.</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold mb-3">Fast Setup</h3>
              <p className="text-slate-600 text-sm leading-relaxed">From signing the agreement to unlocking your doors in {cityName}, our team handles the heavy lifting in just 30-45 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lead Form Section */}
      <section id="apply" className="py-20 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Secure {cityName} Today</h2>
              <p className="text-slate-600">Territories are granted on a first-come, first-served basis. Apply now to check if {cityName} is still available.</p>
            </div>
            
            <FranchiseLeadForm />
            
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-slate-900 text-center py-6 px-4">
        <p className="text-[10px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
          Disclaimer: Returns depend on local footfall, investment, and operations. Franchise approval in {cityName} is subject to territory availability and background verification.
        </p>
      </div>

    </div>
  );
}
