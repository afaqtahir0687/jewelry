import Swal from 'sweetalert2';

export const confirmDelete = (title: string, text: string, callback: () => void) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d4af37',
        cancelButtonColor: '#1e293b',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        background: '#0f172a',
        color: '#ffffff',
        iconColor: '#e11d48', // red accent for warning/delete
        customClass: {
            popup: 'border border-white/10 rounded-xl',
            title: 'font-luxury text-white text-lg',
            htmlContainer: 'text-gray-400 text-sm',
            confirmButton: 'bg-gold hover:bg-gold/90 text-black font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer mx-1',
            cancelButton: 'bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer mx-1'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

export const confirmAction = (
    title: string,
    text: string,
    confirmText: string,
    callback: () => void
) => {
    Swal.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d4af37',
        cancelButtonColor: '#1e293b',
        confirmButtonText: confirmText,
        cancelButtonText: 'Cancel',
        background: '#0f172a',
        color: '#ffffff',
        iconColor: '#d4af37',
        customClass: {
            popup: 'border border-white/10 rounded-xl',
            title: 'font-luxury text-white text-lg',
            htmlContainer: 'text-gray-400 text-sm',
            confirmButton: 'bg-gold hover:bg-gold/90 text-black font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer mx-1',
            cancelButton: 'bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer mx-1'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

export const promptText = (
    title: string,
    inputPlaceholder: string,
    confirmText: string,
    callback: (value: string) => void
) => {
    Swal.fire({
        title,
        input: 'textarea',
        inputPlaceholder,
        showCancelButton: true,
        confirmButtonColor: '#d4af37',
        cancelButtonColor: '#1e293b',
        confirmButtonText: confirmText,
        cancelButtonText: 'Cancel',
        background: '#0f172a',
        color: '#ffffff',
        customClass: {
            popup: 'border border-white/10 rounded-xl',
            title: 'font-luxury text-white text-lg',
            input: 'bg-white/5 border border-white/10 rounded-md text-white text-sm',
            confirmButton: 'bg-gold hover:bg-gold/90 text-black font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer mx-1',
            cancelButton: 'bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer mx-1'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback(result.value ?? '');
        }
    });
};
