// resources/js/components/molecules/SubmitButton.jsx
import React from 'react';
import Button from '@/components/atoms/Button'; // Import atom Button
import { IconCheck } from '@tabler/icons-react'; // Asumsi ikon diimpor dari sini

export default function SubmitButton({ children = 'Save Data', className = '', ...props }) {
    // SubmitButton adalah molekul yang menggunakan atom Button dan menambahkan styling/ikon/type
     return (
        <Button
            type="submit" // Set tipe HTML ke submit
            className={`bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-700 ${className}`} // Styling spesifik submit
            {...props} // Teruskan props lain ke atom Button (misal 'disabled')
        >
            <IconCheck size={16} strokeWidth={1.5}/> {/* Ikon spesifik */} {children} {/* Teks tombol */}
        </Button>
    );
}