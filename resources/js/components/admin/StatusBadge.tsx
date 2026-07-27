import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { LeadStatus, AppointmentStatus, ProductStatus } from '@/types';

type Status = LeadStatus | AppointmentStatus | ProductStatus | string;

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' }> = {
    // Lead statuses
    new:                 { label: 'New',               variant: 'info' },
    assigned:            { label: 'Assigned',          variant: 'info' },
    contacted:           { label: 'Contacted',         variant: 'warning' },
    appointment_booked:  { label: 'Appt Booked',       variant: 'default' },
    sale_completed:      { label: 'Sale Completed',    variant: 'success' },
    lost:                { label: 'Lost',              variant: 'destructive' },
    // Appointment statuses
    pending:             { label: 'Pending',           variant: 'warning' },
    confirmed:           { label: 'Confirmed',         variant: 'info' },
    completed:           { label: 'Completed',         variant: 'success' },
    cancelled:           { label: 'Cancelled',         variant: 'destructive' },
    // Product statuses
    available:           { label: 'Available',         variant: 'success' },
    made_to_order:       { label: 'Made to Order',     variant: 'warning' },
    design_inspiration:  { label: 'Design Only',       variant: 'secondary' },
    // Payment statuses
    paid:                { label: 'Paid',              variant: 'success' },
    unpaid:              { label: 'Unpaid',            variant: 'destructive' },
    partial:             { label: 'Partial',           variant: 'warning' },
    // Review moderation
    approved:            { label: 'Approved',          variant: 'success' },
    rejected:            { label: 'Rejected',          variant: 'destructive' },
};

interface StatusBadgeProps {
    status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status] ?? { label: status, variant: 'secondary' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
}
