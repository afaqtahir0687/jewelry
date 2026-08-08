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

            <section className="py-20 bg-[#fff8f0] flex-grow flex items-center justify-center">
                <div className="max-w-xl mx-auto px-4 text-center">
                    
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-sm border border-green-200">
                        <i className="fa-solid fa-check text-4xl"></i>
                    </div>

                    <h1 className="font-luxury text-3xl font-bold text-[#5c1a1b] mb-3">Inquiry Submitted Successfully!</h1>
                    <p className="text-gray-500 text-sm mb-8">
                        Thank you, <strong>{lead.customer_name}</strong>. Your inquiry has been logged in our CRM database. Our team will verify and route this to a local partner.
                    </p>

                    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 max-w-sm mx-auto mb-8 text-left">
                        <span className="text-xxs text-gray-400 font-bold uppercase tracking-widest block mb-1">Your Unique Lead ID</span>
                        
                        <div className="flex items-center justify-between bg-[#fff8f0] p-3 rounded border border-gray-100 mb-4">
                            <span className="font-mono text-base font-bold text-[#5c1a1b] tracking-wide">{lead.lead_id}</span>
                            <button onClick={copyLeadId} className="text-xs text-[#d4af37] font-bold hover:text-[#bda030] focus:outline-none">
                                <i className="fa-solid fa-copy mr-1"></i> Copy
                            </button>
                        </div>

                        <div className="space-y-3 text-xs text-gray-600">
                            <div><strong>City:</strong> {lead.city.name}</div>
                            {lead.jeweller ? (
                                <div><strong>Seller Routing:</strong> {lead.jeweller.business_name} ({lead.jeweller.area})</div>
                            ) : (
                                <div><strong>Seller Routing:</strong> Open Matching (Sellers in {lead.city.name})</div>
                            )}
                            <div><strong>Status:</strong> <span className="bg-blue-50 text-blue-700 font-bold uppercase text-[9px] px-2 py-0.5 rounded border border-blue-100">{lead.status.replace('_', ' ')}</span></div>
                        </div>
                    </div>

                    <div className="max-w-md mx-auto text-left space-y-4 mb-8">
                        <h3 className="font-luxury text-base font-bold text-[#5c1a1b] border-b border-gray-100 pb-2">What Happens Next?</h3>
                        
                        <div className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#d4af37] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                <strong>Lead Assignment:</strong> Your lead ID has been generated. The system matches and routes this inquiry to top verified jewellers in {lead.city.name}.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#d4af37] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                <strong>Seller Notification:</strong> Selected partner jewellers will receive immediate email and dashboard alerts containing your requirement specifications.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#d4af37] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                <strong>Quote Release:</strong> Assigned sellers will contact you directly on WhatsApp or phone with price quotations.
                            </p>
                        </div>
                    </div>

                    <Link href="/" className="inline-block bg-[#5c1a1b] hover:bg-[#5c1a1b]/90 text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded shadow">
                        Back to Home
                    </Link>

                </div>
            </section>
        </AppLayout>
    );
}
