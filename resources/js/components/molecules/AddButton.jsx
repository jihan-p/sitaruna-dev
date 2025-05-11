// resources/js/components/molecules/AddButton.jsx
import React from 'react';
import { Link } from '@inertiajs/react'; // Menggunakan Link karena tombol Add adalah navigasi
import { IconPlus } from '@tabler/icons-react'; // Asumsi ikon diimpor

// AddButton adalah molekul yang menggunakan Link Inertia untuk navigasi dan styling
export default function AddButton({ url, className = '', children, ...props }) { // Menerima 'url' untuk Link
    return (
        <Link
            href={url} // Link ke URL pembuatan data
            className={`px-4 py-2 text-sm border rounded-lg bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-100 ${className}`} // Styling asli dari Button type='add'
            {...props} // Meneruskan props lain ke Link
        >
             <IconPlus size={18} strokeWidth={1.5}/> {children || <span className='hidden lg:flex'>Create New Data</span>} {/* Ikon dan teks */}
        </Link>
    );
}