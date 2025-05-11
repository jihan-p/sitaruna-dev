// resources/js/components/atoms/Textarea.jsx
import React from 'react';
// Import InputLabel atau InputError TIDAK lagi diperlukan di sini setelah ada FormGroup

// Ini adalah komponen atom Textarea dasar.
// Hanya fokus pada elemen <textarea> HTML.
export default function Textarea({ className = '', ...props }) { // Hapus props label, error dari sini
    return (
         // Ini hanya elemen textarea dasar.
         // Penanganan render label, error, dan div pembungkus dilakukan oleh molekul FormGroup.
        <textarea
            {...props} // Menerima semua props standar HTML textarea (value, onChange, id, name, disabled, placeholder, rows, cols, dll.)
            className={`w-full px-4 py-2 border text-sm rounded-md focus:outline-none focus:ring-0 bg-white text-gray-700 focus:border-gray-200 border-gray-200 ${className}`} // Sesuaikan class Tailwind
        />
    );
}