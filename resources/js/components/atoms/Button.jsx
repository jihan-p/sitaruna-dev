// resources/js/components/atoms/Button.jsx
import React from 'react';

export default function Button({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ease-in-out duration-150 ${
                 disabled && 'opacity-25' // Tambahkan styling disabled
            } ` + className} // Gabungkan className dari props
            disabled={disabled} // Gunakan prop disabled
        >
            {children}
        </button>
    );
}