// resources/js/components/organisms/Card.jsx
import React from 'react';

// Ini adalah komponen organisme Card yang distandarisasi
export default function Card({ title, children, className = '', headerClassName = '', bodyClassName = '' }) { // Tambahkan className untuk kontrol lebih lanjut
    return (
        // Menggunakan div sebagai pembungkus utama, sesuaikan styling border/rounded jika perlu
        <div className={`border rounded-lg overflow-hidden ${className}`}>
             {/* Header Card */}
             {/* Tambahkan kondisional jika title tidak ada, header tidak perlu dirender */}
            {title && (
                <div className={`p-4 border-b bg-white ${headerClassName}`}> {/* Border bawah untuk header */}
                    <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 capitalize'> {/* Pilih capitalize atau uppercase, jadikan konsisten */}
                        {title}
                    </div>
                </div>
            )}
            {/* Body Card */}
            <div className={`bg-white p-4 ${bodyClassName}`}> {/* Padding di body, sesuaikan */}
                {children}
            </div>
        </div>
    );
}