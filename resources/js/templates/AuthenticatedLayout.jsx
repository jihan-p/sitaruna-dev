// resources/js/templates/AuthenticatedLayout.jsx

// Import komponen
import ApplicationLogo from '@/components/atoms/ApplicationLogo';
import Dropdown from '@/components/molecules/Dropdown';
import NavLink from '@/components/atoms/NavLink'; // NavLink dimodifikasi untuk styling sidebar
import ResponsiveNavLink from '@/components/atoms/ResponsiveNavLink'; // Digunakan untuk navigasi di sidebar mobile (atau bisa pakai NavLink)

import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react'; // Hanya perlu state untuk toggle sidebar
// Import ikon
import { IconMenu2, IconX } from '@tabler/icons-react'; // Ikon hamburger dan silang

// --- IMPORT IKON YANG DIGUNAKAN PADA NavLink DI SINI ---
// Anda perlu mengimpor semua ikon yang Anda pasang sebagai prop 'icon' pada NavLink
import { IconDashboard, IconUsers, IconShield, IconList } from '@tabler/icons-react'; // <--- TAMBAHKAN ATAU UNCOMMENT BARIS INI

// Utilitas untuk cek izin
import hasAnyPermission from '@/utils/Permissions'; // Pastikan path ini benar


export default function AuthenticatedLayout({ header, children }) {
    // Mengambil data user yang sedang login dari props Inertia
    const user = usePage().props.auth.user;

    // State untuk toggle sidebar (digunakan di semua ukuran layar)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Fungsi untuk men-toggle tampilan sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    // Class untuk sidebar (sama di semua ukuran layar)
    const sidebarClasses = `
        fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 /* Border abu-abu muda */ flex flex-col h-screen overflow-y-auto transition-transform ease-in-out duration-300
        /* Styling Warna Abu-abu Muda */
        bg-gray-100 /* Warna latar belakang abu-abu muda */
        text-gray-800 /* Warna teks default di sidebar */
        /* Toggle buka/tutup berdasarkan state isSidebarOpen */
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `; // Lebar sidebar saat terbuka (misal w-64)


    // Class untuk area konten utama (selalu mengambil sisa ruang, sidebar overlay)
    const mainContentClasses = `
        flex-1 flex flex-col p-6 overflow-y-auto /* padding standar konten & scroll */
        /* Tidak ada margin kiri dinamis, sidebar overlay */
    `;


    return (
        <div className="flex min-h-screen bg-gray-100"> {/* Latar belakang halaman utama */}

            {/* === Sidebar Kiri === */}
            {/* Gunakan class dinamis yang sama di semua ukuran */}
            <div className={sidebarClasses}>

                {/* Bagian Header Sidebar (Logo/Nama Aplikasi) */}
                <div className="flex shrink-0 items-center px-4 py-4 border-b border-gray-200 justify-between"> {/* Border dan padding */}
                    <Link href="/" className="flex items-center">
                        {/* Logo: Class text-gray-800 untuk warna ikon agar terlihat di bg-gray-100 */}
                        <ApplicationLogo className={`block h-9 w-auto fill-current text-gray-800 mr-3`} /> {/* Logo dan margin kanan */}
                         <span className="text-xl font-semibold text-gray-800">SITARUNA</span> {/* Nama aplikasi selalu tampil saat sidebar terbuka */}
                    </Link>

                    {/* Tombol Tutup Sidebar (Tampil saat Sidebar Terbuka, di semua ukuran) */}
                     {isSidebarOpen && (
                         <button
                             onClick={toggleSidebar} // Memanggil fungsi toggleSidebar
                             className="p-1 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ml-auto"
                         >
                              <IconX size={24} strokeWidth={1.5} />
                         </button>
                    )}
                </div>

                {/* Bagian Navigasi Sidebar */}
                <nav className="flex flex-col flex-1 px-2 py-4 space-y-1"> {/* Sesuaikan padding/space-y */}
                    {/* Menggunakan komponen NavLink */}
                    {/* isSidebarExpanded prop di NavLink sekarang akan menjadi 'isSidebarOpen' */}

                    {/* Contoh NavLink Dashboard */}
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        isSidebarExpanded={isSidebarOpen} // Pass state isSidebarOpen
                        // isMobile prop tidak diperlukan lagi di NavLink jika perilaku sama
                        icon={IconDashboard} // Contoh prop ikon (pastikan IconDashboard diimpor di AuthenticatedLayout jika belum)
                    >
                        Dashboard {/* Children (teks label) */}
                    </NavLink>

                    {/* NavLink Roles */}
                    {hasAnyPermission(['roles index']) &&
                         <NavLink
                            href={route('roles.index')}
                            active={route().current('roles.index')}
                            isSidebarExpanded={isSidebarOpen} // Pass state isSidebarOpen
                            icon={IconUsers} // Contoh prop ikon (pastikan IconUsers diimpor di AuthenticatedLayout jika belum)
                        >
                            Roles
                        </NavLink>
                    }
                    {/* Ulangi untuk Permissions, Users, dan NavLink lainnya */}
                     {hasAnyPermission(['permissions index']) &&
                         <NavLink href={route('permissions.index')} active={route().current('permissions.index')} isSidebarExpanded={isSidebarOpen} icon={IconShield} >Permissions</NavLink> // Pastikan IconShield diimpor
                    }
                     {hasAnyPermission(['users index']) &&
                         <NavLink href={route('users.index')} active={route().current('users.index')} isSidebarExpanded={isSidebarOpen} icon={IconList} >Users</NavLink> // Pastikan IconList diimpor
                    }


                     {/* Opsi: Tautan Profil/Logout di Bawah Sidebar */}
                     {/* Menggunakan NavLink juga dengan styling yang sesuai */}
                     {/* <div className="mt-auto border-t border-gray-200 p-4">
                         <NavLink href={route('profile.edit')} isSidebarExpanded={isSidebarOpen}>Profile</NavLink>
                         <NavLink method="post" href={route('logout')} as="button" isSidebarExpanded={isSidebarOpen}>Log Out</NavLink>
                     </div> */}

                </nav>

            </div> {/* === Akhir Sidebar Kiri === */}

            {/* === Overlay === */}
            {/* Muncul saat sidebar terbuka, menutup saat diklik (di semua ukuran) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-25"
                    onClick={toggleSidebar} // Menutup sidebar saat overlay diklik
                ></div>
            )}


            {/* === Area Konten Utama === */}
            {/* Gunakan class standar, tidak ada margin kiri khusus sidebar */}
            <div className={mainContentClasses}>

                {/* === Top Bar di Area Konten Utama (Header) === */}
                {/* Mengandung Tombol Toggle Sidebar, Judul Halaman, & Profil User */}
                <header className="w-full bg-white shadow">
                     <div className="flex items-center px-4 py-6 sm:px-6 lg:px-8">

                         {/* Tombol Buka/Tutup Sidebar (Tampil di semua ukuran) */}
                         {/* Klik untuk memanggil toggleSidebar */}
                         <button
                            onClick={toggleSidebar}
                            className="-ms-2 mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                         >
                             {/* Ikon Hamburger */}
                             <IconMenu2 size={24} strokeWidth={1.5} />
                         </button>


                        {/* Slot Header Halaman - Konten judul halaman */}
                         <div className="flex-1 px-2 sm:px-0">
                             {header}
                         </div>

                        {/* Pengaturan Pengguna (Molekul Dropdown) */}
                        {/* Tampil di semua ukuran */}
                         <div className="ml-auto"> {/* Gunakan ml-auto untuk mendorong ke kanan */}
                             <Dropdown align="right" width="48">
                                 {/* Trigger & Content Dropdown sama seperti sebelumnya */}
                                  <Dropdown.Trigger> {/* ... */} </Dropdown.Trigger>
                                  <Dropdown.Content> {/* ... */}</Dropdown.Content>
                             </Dropdown>
                         </div>
                    </div> {/* Akhir div flex items-center */}
                </header> {/* === Akhir Top Bar Area Konten Utama === */}


                {/* Slot Konten Utama Halaman */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>

            </div> {/* Akhir Area Konten Utama */}

            {/* Konten Navigasi Responsif Asli - DIHAPUS */}
            {/* <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}> ... KODE LAMA DIHAPUS ... </div> */}


        </div> // === Akhir Struktur Layout Utama ===
    );
}

// --- Pastikan NavLink.jsx sudah diupdate seperti di balasan sebelumnya (styling dan prop isSidebarExpanded) ---
// --- Pastikan ResponsiveNavLink.jsx juga diupdate warnanya jika masih digunakan (misal untuk Profile/Logout) ---
// --- Pastikan ikon-ikon yang digunakan (IconMenu2, IconX, dan ikon di NavLink) diimpor di AuthenticatedLayout.jsx ---
// Contoh import ikon (tambahkan di bagian import atas):
// import { IconDashboard, IconUsers, IconShield, IconList } from '@tabler/icons-react'; // Ikon untuk NavLink
// import { IconMenu2, IconX } from '@tabler/icons-react'; // Ikon untuk toggle