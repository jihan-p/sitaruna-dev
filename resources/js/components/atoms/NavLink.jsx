// resources/js/components/atoms/NavLink.jsx

import { Link } from '@inertiajs/react';
// --- IMPORT SEMUA IKON YANG AKAN DIGUNAKAN PADA NavLink DI SINI ---
// Import ikon seperti:
// import { IconDashboard, IconUsers, IconShield, IconList, IconUser, IconLogout } from '@tabler/icons-react';

export default function NavLink({
    active = false,
    className = '',
    children, // Teks label NavLink
    isSidebarExpanded = true, // Prop dari parent (apakah sidebar expanded - mobile open / desktop expanded)
    isMobile = false, // Prop dari parent (apakah di mode mobile)
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
        `
        : `
            text-gray-700 /* Warna teks saat TIDAK aktif */
            hover:bg-gray-200 /* Background saat hover/focus */
            hover:text-gray-900 /* Warna teks saat hover/focus */
            focus:bg-gray-200 focus:text-gray-900 /* State focus */
        `;

    // Menentukan apakah teks label harus terlihat
    // Terlihat jika sidebar Expanded (mobile open ATAU desktop expanded)
    const isTextVisible = isSidebarExpanded;

    return (
        <Link
            {...props}
            className={`${baseClasses} ${colorClasses} ${className}`}
        >
            {/* Render Ikon */}
            {IconComponent && (
                // Margin kanan jika teks terlihat, atau auto margin di desktop collapsed untuk pusatkan ikon
                <IconComponent size={20} strokeWidth={1.5} className={isTextVisible ? 'mr-3' : (!isMobile ? 'sm:mx-auto' : 'mr-3')} />
            )}

            {/* Render Teks Label (hanya jika isTextVisible true) */}
            {isTextVisible && (
                 <span>{children}</span>
            )}

             {/* Untuk aksesibilitas saat teks tersembunyi di desktop, tambahkan sr-only */}
             {!isTextVisible && !isMobile && (
                 <span className="sr-only">{children}</span>
             )}
        </Link>
    );
}