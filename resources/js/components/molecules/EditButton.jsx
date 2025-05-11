// resources/js/components/molecules/EditButton.jsx
import React from 'react';
import { Link } from '@inertiajs/react'; // Menggunakan Link karena tombol Edit adalah navigasi
import { IconPencilCog } from '@tabler/icons-react'; // Asumsi ikon diimpor

// EditButton adalah molekul yang menggunakan Link Inertia untuk navigasi dan styling
export default function EditButton({ url, className = '', children, ...props }) { // Menerima 'url' untuk Link
    return (
        <Link
            href={url} // Link ke URL halaman edit
            className={`px-4 py-2 rounded-lg bg-orange-50 text-orange-500 flex items-center gap-2 hover:bg-orange-100 ${className}`} // Styling asli dari Button type='edit'
            {...props} // Meneruskan props lain ke Link
        >
            {children || <IconPencilCog size={16} strokeWidth={1.5}/>} {/* Ikon atau children */}
        </Link>
    );
}