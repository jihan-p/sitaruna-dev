// resources/js/components/atoms/ResponsiveNavLink.jsx

import { Link } from '@inertiajs/react';
// Asumsikan Anda menggunakan ikon, impor di sini jika link mobile juga pakai ikon (misal di profile/logout)
// import { IconUser, IconLogout } from '@tabler/icons-react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children, // Children diharapkan adalah teks label atau ikon + teks
    ...props // isSidebarExpanded dan isMobile tidak diperlukan di sini jika komponen ini hanya untuk link info user mobile
}) {
    // Styling dasar untuk link info user di menu mobile (latar abu-abu muda)
    const baseClasses = `
        flex items-center w-full py-2 pe-4 ps-3 text-base font-medium border-l-4
        transition duration-150 ease-in-out focus:outline-none
    `;

    const colorClasses = active
        ? `
        // Styling saat AKTIF di latar abu-abu muda
        border-blue-600 /* Contoh border kiri aktif (sesuaikan warna) */
        bg-gray-200 /* Contoh background aktif */
        text-gray-900 /* Contoh warna teks aktif */
        focus:border-blue-700 focus:bg-gray-300 focus:text-gray-900 /* State focus saat aktif */
        ` // Styling saat AKTIF
        : `
        // Styling saat TIDAK Aktif di latar abu-abu muda
        border-transparent /* Border transparan */
        text-gray-700 /* Warna teks default */
        hover:border-gray-300 /* Border saat hover/focus */
        hover:bg-gray-200 /* Background saat hover/focus */
        hover:text-gray-900 /* Warna teks saat hover/focus */
        focus:border-gray-300 focus:bg-gray-200 focus:text-gray-900 /* State focus */
        `; // Styling saat TIDAK Aktif


    return (
        <Link
            {...props}
            className={`${baseClasses} ${colorClasses} ${className}`} // Gabungkan semua class
        >
            {children} {/* Konten link (teks atau ikon+teks) */}
        </Link>
    );
}