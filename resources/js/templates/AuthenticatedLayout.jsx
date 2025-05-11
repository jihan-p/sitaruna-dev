// resources/js/templates/AuthenticatedLayout.jsx

// Import komponen
import ApplicationLogo from '@/components/atoms/ApplicationLogo';
import Dropdown from '@/components/molecules/Dropdown';
import NavLink from '@/components/atoms/NavLink'; // NavLink sudah dimodifikasi sebelumnya
import ResponsiveNavLink from '@/components/atoms/ResponsiveNavLink'; // Digunakan untuk navigasi di sidebar mobile

import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react'; // State untuk toggle sidebar mobile
// Import ikon untuk tombol toggle sidebar mobile
import { IconMenu2, IconX } from '@tabler/icons-react'; // Pastikan ikon dari @tabler/icons-react sudah terinstall dan diimpor

// Utilitas untuk cek izin
import hasAnyPermission from '@/utils/Permissions'; // Pastikan path ini benar


export default function AuthenticatedLayout({ header, children }) {
    // Mengambil data user yang sedang login dari props Inertia
    const user = usePage().props.auth.user;

    // State untuk mengontrol tampilan sidebar di perangkat mobile
    // Nama state ini awalnya dari dropdown navigasi horizontal, tapi kita gunakan untuk sidebar mobile
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Fungsi untuk men-toggle tampilan sidebar mobile
    const toggleSidebar = () => {
        setShowingNavigationDropdown((prevState) => !prevState);
    };

    return (
        // === Struktur Layout Utama: Flex Container ===
        // Menggunakan flex untuk menata sidebar (kiri) dan konten utama (kanan) berdampingan
        // min-h-screen membuat kontainer setinggi minimal viewport
        <div className="flex min-h-screen bg-gray-100">

            {/* === Sidebar Kiri === */}
            {/* === INI BAGIAN KODE SIDEBAR YANG PERLU DIGANTI === */}
            {/* Menggabungkan styling mobile (default) dan desktop (sm:...) */}
            {/* fixed inset-y-0 left-0 z-50: Memasang sidebar di posisi tetap kiri (untuk mobile) */}
            {/* w-64: Lebar saat terbuka di mobile */}
            {/* transform -translate-x-full: Menyembunyikan sidebar ke kiri di mobile secara default */}
            {/* transition-transform: Menambahkan animasi saat sidebar bergeser */}
            {/* sm:translate-x-0: Meng-override di breakpoint 'sm' ke atas: sidebar selalu terlihat */}
            {/* sm:relative: Meng-override positioning 'fixed' di breakpoint 'sm' ke atas */}
            {/* sm:w-64: Mengatur lebar di breakpoint 'sm' ke atas */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col h-screen overflow-y-auto transition-transform ease-in-out duration-300
                    ${showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full'} /* Menggeser sidebar masuk/keluar di mobile berdasarkan state */
                    sm:translate-x-0 sm:relative sm:w-64 /* Membuat sidebar permanen di desktop */
                `}
            >

                {/* Bagian Header Sidebar (Logo/Nama Aplikasi) */}
                <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-gray-100">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                    {/* Tombol Tutup Sidebar (Hanya di Mobile) */}
                    <button
                        onClick={toggleSidebar}
                        className="sm:hidden p-1 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ml-auto"
                    >
                         <IconX size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Bagian Navigasi Sidebar */}
                <nav className="flex flex-col flex-1 px-4 py-6 space-y-1">
                    {/* Menggunakan komponen NavLink (untuk desktop) */}
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className="block w-full py-2 px-3 rounded-md hover:bg-gray-100">
                        Dashboard
                    </NavLink>
                    {hasAnyPermission(['roles index']) && <NavLink href={route('roles.index')} active={route().current('roles.index')} className="block w-full py-2 px-3 rounded-md hover:bg-gray-100">Roles</NavLink>}
                    {hasAnyPermission(['permissions index']) && <NavLink href={route('permissions.index')} active={route().current('permissions.index')} className="block w-full py-2 px-3 rounded-md hover:bg-gray-100">Permissions</NavLink>}
                    {hasAnyPermission(['users index']) && <NavLink href={route('users.index')} active={route().current('users.index')} className="block w-full py-2 px-3 rounded-md hover:bg-gray-100">Users</NavLink>}
                    {/* Tambahkan NavLink lain */}
                </nav>

                {/* Optional: Bagian Bawah Sidebar Mobile (User Info / Logout) */}
                {/* Anda bisa memindahkan bagian ini ke sini jika ingin info user ada di dalam sidebar mobile */}
                {/* <div className="mt-auto border-t border-gray-100 p-4 sm:hidden"> ... ResponsiveNavLink ... </div> */}

            </div> {/* === Akhir Sidebar Kiri === */}

            {/* === Overlay untuk Mobile Sidebar === */}
            {/* Muncul saat sidebar terbuka di mobile, menutup saat diklik */}
            {showingNavigationDropdown && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-25 sm:hidden"
                    onClick={toggleSidebar} // Menutup sidebar saat overlay diklik
                ></div>
            )}


            {/* === Area Konten Utama (Kanan Sidebar) === */}
            {/* flex-1 flex flex-col: Mengisi sisa ruang & menata vertikal */}
            {/* sm:ml-64: Menambah margin kiri di desktop, sesuai lebar sidebar (sesuaikan jika lebar sidebar diubah) */}
            <div className="flex-1 flex flex-col sm:ml-64"> {/* Sesuaikan sm:ml-64 jika lebar sidebar desktop diubah */}

                {/* === Top Bar di Area Konten Utama (Header) === */}
                {/* Mengandung Tombol Toggle Mobile, Judul Halaman, & Profil User */}
                <header className="w-full bg-white shadow">
                     <div className="flex justify-between items-center px-4 py-6 sm:px-6 lg:px-8">

                         {/* Tombol Buka Sidebar (Hanya di Mobile) */}
                         {/* Ditempatkan di kiri top bar */}
                        <div className="-ms-2 flex items-center sm:hidden">
                            <button
                                onClick={toggleSidebar} // Memanggil toggleSidebar untuk membuka sidebar
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                 <IconMenu2 size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Slot Header Halaman */}
                         <div className="flex-1 px-2 sm:px-0">
                             {header}
                         </div>

                        {/* Pengaturan Pengguna (Dropdown) */}
                        {/* Tampil hanya di desktop */}
                         <div className="hidden sm:flex sm:items-center">
                             <Dropdown align="right" width="48">
                                 <Dropdown.Trigger>
                                     <span className="inline-flex rounded-md">
                                         <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                                             {user.name}
                                             <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                         </button>
                                     </span>
                                 </Dropdown.Trigger>
                                 <Dropdown.Content>
                                     <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                     <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                 </Dropdown.Content>
                             </Dropdown>
                         </div>
                    </div>
                </header>

                {/* Slot Konten Utama Halaman */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>

            </div> {/* Akhir Area Konten Utama */}

             {/* === Konten Navigasi Responsif (ResponsiveNavLink) === */}
             {/* Struktur ini digunakan untuk menu yang muncul saat sidebar mobile terbuka */}
             {/* Class 'sm:hidden' membuatnya hanya tampil di mobile */}
             {/* State 'showingNavigationDropdown' mengontrol apakah block ini ditampilkan */}
             <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                 <div className="space-y-1 pb-3 pt-2 border-b border-gray-200"> {/* Padding dan border bawah */}
                     {/* NavLink Responsif (menggunakan ResponsiveNavLink.jsx) */}
                     {/* Tambahkan ResponsiveNavLink untuk semua item navigasi (Dashboard, Roles, Permissions, Users, dll) */}
                      <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                       {hasAnyPermission(['roles index']) && <ResponsiveNavLink href={route('roles.index')} active={route().current('roles.index')}>Roles</ResponsiveNavLink>}
                       {hasAnyPermission(['permissions index']) && <ResponsiveNavLink href={route('permissions.index')} active={route().current('permissions.index')}>Permissions</ResponsiveNavLink>}
                       {hasAnyPermission(['users index']) && <ResponsiveNavLink href={route('users.index')} active={route().current('users.index')}>Users</ResponsiveNavLink>}
                       {/* Tambahkan ResponsiveNavLink lain */}
                 </div>

                 {/* Pengaturan Pengguna Responsif (di dalam menu mobile) */}
                 <div className="border-t border-gray-200 pb-1 pt-4">
                     <div className="px-4">
                          <div className="text-base font-medium text-gray-800">{user.name}</div>
                          <div className="text-sm font-medium text-gray-500">{user.email}</div>
                     </div>
                     <div className="mt-3 space-y-1">
                         {/* Link Profil dan Logout di menu mobile */}
                         <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                         <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                     </div>
                 </div>
             </div>

        </div> // === Akhir Struktur Layout Utama ===
    );
}