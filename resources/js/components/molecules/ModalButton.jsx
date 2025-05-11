// resources/js/components/molecules/ModalButton.jsx
import React from 'react';
import Button from '@/components/atoms/Button'; // Import atom Button
// Tidak ada ikon spesifik di sini di Button.jsx asli, hanya children

// ModalButton adalah molekul yang menggunakan atom Button dengan type='button'
// Ini digunakan untuk memicu aksi (misal: membuka modal) BUKAN navigasi atau submit form.
export default function ModalButton({ children, className = '', ...props }) {
    return (
        <Button
            type='button' // Set tipe HTML ke button
            className={`${className} px-4 py-2 text-sm border rounded-lg flex items-center gap-2`} // Styling asli dari Button type='modal'
            {...props} // Meneruskan props lain ke atom Button (misal 'onClick')
        >
            {children} {/* Konten tombol */}
        </Button>
    );
}