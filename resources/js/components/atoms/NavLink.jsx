// resources/js/components/atoms/NavLink.jsx

import { Link } from '@inertiajs/react';
// --- IMPORT SEMUA IKON YANG AKAN DIGUNAKAN PADA NavLink DI SINI ---
// import { IconDashboard, IconUsers, IconShield, IconList, IconUser, IconLogout } from '@tabler/icons-react'; // Contoh impor ikon

export default function NavLink({
    active = false,
    className = '',
    children, // Children diharapkan adalah teks label NavLink
    isSidebarExpanded = true, // Prop dari parent (identik dengan isSidebarOpen)
    // isMobile prop TIDAK diperlukan lagi di sini
    icon: IconComponent, // Prop untuk komponen ikon
    ...props
}) {

    // Tentukan warna berdasarkan status aktif dan hover/focus pada latar abu-abu muda
    const baseClasses = `
        flex items-center w-full py-2 px-3 text-sm font-medium rounded-md
        transition duration-150 ease-in-out focus:outline-none
    `;

    const colorClasses = active
        ? `
            bg-gray-200 /* Background saat aktif */
            text-gray-900 /* Warna teks saat aktif */
            font-semibold /* Bold saat aktif */
        ` // Styling saat AKTIF
        : `
            text-gray-700 /* Warna teks saat TIDAK aktif */
            hover:bg-gray-200 /* Background saat hover/focus */
            hover:text-gray-900 /* Warna teks saat hover/focus */
            focus:bg-gray-200 focus:text-gray-900 /* State focus */
        `; // Styling saat TIDAK Aktif

    // Tentukan apakah teks label harus terlihat (hanya terlihat saat sidebar Expanded/Terbuka)
    const isTextVisible = isSidebarExpanded; // Teks hanya terlihat jika sidebar Expanded/Terbuka

    return (
        <Link
            {...props}
            className={`${baseClasses} ${colorClasses} ${className}`} // Gabungkan semua class
        >
            {/* Render Ikon */}
            {IconComponent && (
                // Margin kanan jika teks terlihat, atau auto margin jika teks tidak terlihat (collapsed)
                <IconComponent size={20} strokeWidth={1.5} className={isTextVisible ? 'mr-3' : 'mx-auto'} />
            )}

            {/* Render Teks Label (hanya jika isTextVisible true) */}
            {isTextVisible && (
                 <span>{children}</span> // Children adalah teks label NavLink
            )}

            {/* Untuk aksesibilitas saat teks tersembunyi, tambahkan sr-only */}
             {!isTextVisible && (
                 <span className="sr-only">{children}</span> // Sembunyikan visual, ada untuk screen reader
             )}
        </Link>
    );
}