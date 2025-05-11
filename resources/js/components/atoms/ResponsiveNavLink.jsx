// resources/js/components/atoms/ResponsiveNavLink.jsx

import { Link } from '@inertiajs/react';
// Asumsikan Anda menggunakan ikon, impor di sini jika link mobile juga pakai ikon
// import { IconDashboard, IconUsers, IconShield, IconList } from '@tabler/icons-react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children, // Children diharapkan adalah teks label atau ikon + teks
    // Prop isSidebarExpanded dan isMobile mungkin tidak diperlukan jika stylingnya sudah hanya untuk mobile
    // Jika Anda ingin styling persis sama dengan NavLink, Anda bisa pass prop tersebut atau pakai komponen NavLink
    ...props
}) {
    // Styling dasar untuk link di sidebar mobile (latar gelap)
    const baseClasses = `
        flex items-center w-full py-2 pe-4 ps-3 text-base font-medium border-l-4
        transition duration-150 ease-in-out focus:outline-none
    `;

    const colorClasses = active
        ? `
        // Styling saat AKTIF di latar gelap
        border-blue-600 /* Contoh border kiri aktif (sesuaikan warna) */
        bg-gray-700 /* Contoh background aktif */
        text-white /* Contoh warna teks aktif */
        focus:border-blue-700 focus:bg-gray-600 focus:text-white /* State focus saat aktif */
        ` // Styling saat AKTIF di latar gelap
        : `
        // Styling saat TIDAK Aktif di latar gelap
        border-transparent /* Border transparan saat tidak aktif */
        text-gray-300 /* Warna teks default */
        hover:border-gray-600 /* Border saat hover/focus */
        hover:bg-gray-700 /* Background saat hover/focus */
        hover:text-white /* Warna teks saat hover/focus */
        focus:border-gray-600 focus:bg-gray-700 focus:text-white /* State focus */
        `; // Styling saat TIDAK Aktif di latar gelap


    return (
        <Link
            {...props}
            className={`${baseClasses} ${colorClasses} ${className}`} // Gabungkan semua class
        >
            {children} {/* Konten link (teks atau ikon+teks) */}
        </Link>
    );
}