// resources/js/components/atoms/NavLink.jsx

import { Link } from '@inertiajs/react';
// Asumsikan Anda akan menambahkan ikon untuk setiap NavLink
// Misalnya, jika menggunakan tabler-icons:
// import { IconDashboard, IconUsers, IconShield, IconList } from '@tabler/icons-react'; // Impor ikon yang relevan

export default function NavLink({
    active = false,
    className = '',
    children, // Children sekarang diharapkan adalah teks label NavLink
    isSidebarExpanded = true, // Prop baru: apakah sidebar sedang expanded (default true)
    isMobile = false, // Prop baru: apakah sedang di mode mobile
    // Anda bisa menambahkan prop untuk ikon jika ingin ikon berbeda di setiap link, contoh: icon: IconDashboard
    icon: IconComponent, // Prop untuk komponen ikon (misal dari @tabler/icons-react)
    ...props
}) {

    // Tentukan warna teks dan background berdasarkan status aktif dan hover/focus
    const baseClasses = `
        flex items-center w-full py-2 px-3 text-sm font-medium rounded-md
        transition duration-150 ease-in-out focus:outline-none
    `;

    const colorClasses = active
        ? `
            bg-gray-900 /* Warna background saat aktif (lebih gelap dari sidebar) */
            text-white /* Warna teks saat aktif */
            font-semibold /* Bold saat aktif */
        ` // Styling saat AKTIF di latar gelap
        : `
            text-gray-300 /* Warna teks saat TIDAK aktif di latar gelap */
            hover:bg-gray-700 /* Background saat hover/focus (agak gelap dari default) */
            hover:text-white /* Warna teks saat hover/focus */
            focus:bg-gray-700 focus:text-white /* State focus */
        `; // Styling saat TIDAK Aktif di latar gelap

    // Menentukan apakah teks label harus terlihat
    // Terlihat jika di mobile ATAU jika sidebar sedang expanded (di desktop)
    const isTextVisible = isMobile || isSidebarExpanded;

    return (
        <Link
            {...props}
            className={`${baseClasses} ${colorClasses} ${className}`} // Gabungkan semua class
        >
            {/* Render Ikon (jika ada) */}
            {IconComponent && (
                <IconComponent size={20} strokeWidth={1.5} className={isTextVisible ? 'mr-3' : (isMobile ? 'mr-3' : 'sm:mx-auto')} /> // Atur margin kanan jika teks terlihat, atau auto margin di desktop collapsed
            )}

            {/* Render Teks Label (hanya jika isTextVisible true) */}
            {isTextVisible && (
                 <span>{children}</span> // Children diharapkan adalah teks label
            )}

            {/* Jika tidak expanded dan bukan mobile, bisa tampilkan tooltip atau atribut title pada Link */}
             {!isTextVisible && !isMobile && (
                 <span className="sr-only">{children}</span> // Sembunyikan teks secara visual tapi tetap ada untuk screen reader
             )}
        </Link>
    );
}