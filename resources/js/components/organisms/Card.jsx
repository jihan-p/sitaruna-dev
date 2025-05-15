// resources/js/components/organisms/Card.jsx
import React from 'react';

// Ini adalah komponen organisme Card yang distandarisasi
export default function Card({ title, children, className = '', headerClassName = '', bodyClassName = '' }) { // Tambahkan className untuk kontrol lebih lanjut
    return (
        // Menggunakan div sebagai pembungkus utama, sesuaikan styling border/rounded jika perlu
        <div className={`border rounded-lg overflow-hidden ${className}`}>
            {title && (
                <div className={`p-4 border-b bg-white ${headerClassName}`}>
                    <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 capitalize'> 
                        {title}
                    </div>
                </div>
            )}
            <div className={`bg-white p-4 ${bodyClassName}`}>
                {children}
            </div>
        </div>
    );
}