// resources/js/components/atoms/ResponsiveNavLink.jsx (Contoh penyesuaian warna abu-abu muda jika masih digunakan)

import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    const baseClasses = `
        flex items-center w-full py-2 pe-4 ps-3 text-base font-medium border-l-4
        transition duration-150 ease-in-out focus:outline-none
    `;

    const colorClasses = active
        ? `
        // Styling saat AKTIF
        border-blue-600 /* Contoh border kiri aktif (sesuaikan warna) */
        bg-gray-200 /* Contoh background aktif */
        text-gray-900 /* Contoh warna teks aktif */
        focus:border-blue-700 focus:bg-gray-300 focus:text-gray-900 /* State focus saat aktif */
        `
        : `
        // Styling saat TIDAK Aktif
        border-transparent
        text-gray-700 /* Warna teks default */
        hover:border-gray-300 /* Border saat hover/focus */
        hover:bg-gray-200 /* Background saat hover/focus */
        hover:text-gray-900 /* Warna teks saat hover/focus */
        focus:border-gray-300 focus:bg-gray-200 focus:text-gray-900 /* State focus */
        `;


    return (
        <Link
            {...props}
            className={`${baseClasses} ${colorClasses} ${className}`}
        >
            {children}
        </Link>
    );
}