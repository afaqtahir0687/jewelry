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
