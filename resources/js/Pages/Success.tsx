import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface City {
    id: number;
    name: string;
}

interface Jeweller {
    id: number;
    business_name: string;
    area: string;
}

interface Lead {
    id: number;
    lead_id: string;
    customer_name: string;
    customer_phone: string;
    status: string;
    city: City;
    jeweller: Jeweller | null;
}

interface SuccessProps {
    lead: Lead;
}

export default function Success({ lead }: SuccessProps) {
    const copyLeadId = () => {
        navigator.clipboard.writeText(lead.lead_id).then(() => {
            alert('Lead ID Copied to Clipboard!');
        });
    };

    return (
        <AppLayout>
            <Head title="Submission Success" />

            <section class="py-20 bg-[#faf9f6] flex-grow flex items-center justify-center">
                <div class="max-w-xl mx-auto px-4 text-center">
                    
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-sm border border-green-200">
                        <i class="fa-solid fa-check text-4xl"></i>
                    </div>

                    <h1 class="font-luxury text-3xl font-bold text-[#0f172a] mb-3">Inquiry Submitted Successfully!</h1>
                    <p class="text-gray-500 text-sm mb-8">
                        Thank you, <strong>{lead.customer_name}</strong>. Your inquiry has been logged in our CRM database. Our team will verify and route this to a local partner.
                    </p>

                    <div class="bg-white rounded-lg border border-gray-200 shadow-md p-6 max-w-sm mx-auto mb-8 text-left">
                        <span class="text-xxs text-gray-400 font-bold uppercase tracking-widest block mb-1">Your Unique Lead ID</span>
                        
                        <div class="flex items-center justify-between bg-[#faf9f6] p-3 rounded border border-gray-100 mb-4">
                            <span class="font-mono text-base font-bold text-[#0f172a] tracking-wide">{lead.lead_id}</span>
                            <button onClick={copyLeadId} class="text-xs text-[#d4af37] font-bold hover:text-[#bda030] focus:outline-none">
                                <i class="fa-solid fa-copy mr-1"></i> Copy
                            </button>
                        </div>

                        <div class="space-y-3 text-xs text-gray-600">
                            <div><strong>City:</strong> {lead.city.name}</div>
                            {lead.jeweller ? (
                                <div><strong>Seller Routing:</strong> {lead.jeweller.business_name} ({lead.jeweller.area})</div>
                            ) : (
                                <div><strong>Seller Routing:</strong> Open Matching (Sellers in {lead.city.name})</div>
                            )}
                            <div><strong>Status:</strong> <span class="bg-blue-50 text-blue-700 font-bold uppercase text-[9px] px-2 py-0.5 rounded border border-blue-100">{lead.status.replace('_', ' ')}</span></div>
                        </div>
                    </div>

                    <div class="max-w-md mx-auto text-left space-y-4 mb-8">
                        <h3 class="font-luxury text-base font-bold text-[#0f172a] border-b border-gray-100 pb-2">What Happens Next?</h3>
                        
                        <div class="flex gap-3">
                            <span class="w-6 h-6 rounded-full bg-[#d4af37] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                            <p class="text-xs text-gray-500 leading-relaxed">
                                <strong>Lead Assignment:</strong> Your lead ID has been generated. The system matches and routes this inquiry to top verified jewellers in {lead.city.name}.
                            </p>
                        </div>

                        <div class="flex gap-3">
                            <span class="w-6 h-6 rounded-full bg-[#d4af37] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                            <p class="text-xs text-gray-500 leading-relaxed">
                                <strong>Seller Notification:</strong> Selected partner jewellers will receive immediate email and dashboard alerts containing your requirement specifications.
                            </p>
                        </div>

                        <div class="flex gap-3">
                            <span class="w-6 h-6 rounded-full bg-[#d4af37] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                            <p class="text-xs text-gray-500 leading-relaxed">
                                <strong>Quote Release:</strong> Assigned sellers will contact you directly on WhatsApp or phone with price quotations.
                            </p>
                        </div>
                    </div>

                    <Link href="/" class="inline-block bg-[#0f172a] hover:bg-[#0f172a]/90 text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded shadow">
                        Back to Home
                    </Link>

                </div>
            </section>
        </AppLayout>
    );
}
