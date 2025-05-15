// resources/js/components/molecules/CancelButton.jsx
import React from 'react';
import { Link } from '@inertiajs/react'; // Menggunakan Link karena tombol Cancel adalah navigasi
import { IconArrowBack } from '@tabler/icons-react'; // Asumsi ikon diimpor

// CancelButton adalah molekul yang menggunakan Link Inertia untuk navigasi dan styling
export default function CancelButton({ url, className = '', children, ...props }) { // Menerima 'url' untuk Link
    return (
        <Link
            href={url} // Link kembali ke URL sebelumnya (misal index)
            className={`px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100 ${className}`} // Styling asli dari Button type='cancel'
            {...props} // Meneruskan props lain ke Link
        >
            <IconArrowBack size={16} strokeWidth={1.5}/> {children || 'Kembali'} {/* Ikon dan teks */}
        </Link>
    );
}