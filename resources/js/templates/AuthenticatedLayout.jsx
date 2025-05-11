// resources/js/templates/AuthenticatedLayout.jsx

// Import komponen Atomic Design dan lainnya
import ApplicationLogo from '@/components/atoms/ApplicationLogo';
import Dropdown from '@/components/molecules/Dropdown';
import NavLink from '@/components/atoms/NavLink';
// ResponsiveNavLink mungkin masih digunakan untuk mobile sidebar, tapi tidak di nav desktop sidebar
// import ResponsiveNavLink from '@/components/atoms/ResponsiveNavLink'; // Keep if planning for mobile responsive sidebar

import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react'; // Keep if planning for mobile responsive sidebar toggle
// Utilitas
import hasAnyPermission from '@/utils/Permissions';


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    // State untuk mengontrol tampilan dropdown navigasi responsif (untuk mobile)
    // Ini mungkin perlu disesuaikan atau diubah namanya jika Anda mengimplementasikan sidebar mobile yang bisa di-toggle
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        // === Struktur Layout Utama: Flex Container ===
        // Menggunakan flex untuk menata sidebar (kiri) dan konten utama (kanan) berdampingan
        <div className="flex min-h-screen bg-gray-100">

            {/* === Sidebar Kiri === */}
            {/* Mengatur lebar tetap (w-64), tinggi penuh layar (h-screen), latar belakang, border kanan, tata letak vertikal, dan overflow-y */}
            {/* sticky top-0 menjaga sidebar tetap di atas saat konten utama di-scroll */}
            <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-y-auto">

                {/* Bagian Header Sidebar (Logo/Nama Aplikasi) */}
                {/* Menjaga konsistensi padding dan penempatan logo */}
                <div className="flex shrink-0 items-center justify-center px-6 py-4 border-b border-gray-100">
                    <Link href="/">
                        {/* Menggunakan komponen atom ApplicationLogo */}
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                    {/* Optional: <span className="ml-2 text-xl font-semibold text-gray-800">SITARUNA</span> */}
                </div>

                {/* Bagian Navigasi Sidebar */}
                {/* Menggunakan flex-col dan space-y untuk menata tautan navigasi secara vertikal */}
                <nav className="flex flex-col flex-1 px-4 py-6 space-y-1">
                    {/* Menggunakan komponen atom NavLink */}
                    {/* Sesuaikan class styling NavLink agar cocok untuk tampilan vertikal di sidebar */}
                    {/* Styling 'block w-full py-2 px-3 rounded-md hover:bg-gray-100' adalah contoh dasar untuk sidebar */}
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="block w-full py-2 px-3 rounded-md hover:bg-gray-100"
                    >
                        Dashboard
                    </NavLink>
                    {hasAnyPermission(['roles index']) &&
                         <NavLink
                            href={route('roles.index')}
                            active={route().current('roles.index')}
                            className="block w-full py-2 px-3 rounded-md hover:bg-gray-100"
                        >
                            Roles
                        </NavLink>
                    }
                    {hasAnyPermission(['permissions index']) &&
                         <NavLink
                            href={route('permissions.index')}
                            active={route().current('permissions.index')}
                             className="block w-full py-2 px-3 rounded-md hover:bg-gray-100"
                        >
                            Permissions
                        </NavLink>
                    }
                    {hasAnyPermission(['users index']) &&
                         <NavLink
                            href={route('users.index')}
                            active={route().current('users.index')}
                             className="block w-full py-2 px-3 rounded-md hover:bg-gray-100"
                        >
                            Users
                        </NavLink>
                    }
                    {/* Tambahkan NavLink lain sesuai kebutuhan aplikasi SITARUNA */}
                </nav>

                {/* Bagian Bawah Sidebar (Opsional: Info User Ringkas / Logout) */}
                 {/* Anda bisa menambahkan info user ringkas di sini, atau tetap di top bar area konten utama */}

            </div> {/* === Akhir Sidebar Kiri === */}


            {/* === Area Konten Utama (Kanan Sidebar) === */}
            {/* Menggunakan flex-1 agar div ini mengambil sisa lebar horizontal yang tersedia */}
            {/* Menggunakan flex-col untuk menata header top bar dan main content secara vertikal */}
            <div className="flex-1 flex flex-col">

                {/* === Top Bar di Area Konten Utama (Header dengan Judul Halaman & Profil User) === */}
                {/* Menggabungkan judul halaman (dari slot header) dan dropdown user dalam satu baris */}
                <header className="w-full bg-white shadow">
                    {/* Menggunakan flex justify-between untuk menata konten di kiri (header slot) dan kanan (user dropdown) */}
                    {/* px-4 py-6 sm:px-6 lg:px-8 adalah padding umum untuk header Inertia */}
                    <div className="flex justify-between items-center px-4 py-6 sm:px-6 lg:px-8">

                        {/* Slot Header Halaman - Konten judul halaman dari komponen halaman spesifik */}
                        {/* Ditempatkan di sisi kiri flex container ini */}
                        <div>
                             {header}
                        </div>


                        {/* Pengaturan Pengguna (Molekul Dropdown) - Ditempatkan di sisi kanan */}
                        {/* === Pastikan Blok Kode Dropdown Ini Ada === */}
                        <div className="hidden sm:flex sm:items-center"> {/* Sembunyikan di mobile jika responsive dropdown digunakan */}
                             <Dropdown align="right" width="48">
                                {/* Trigger Dropdown: Tombol dengan nama user dan ikon panah */}
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            {/* Menampilkan nama user yang login */}
                                            {user.name}

                                            {/* Ikon panah dropdown */}
                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                {/* Konten Dropdown: Link Profil dan Logout */}
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button" // Penting untuk logout via POST
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                         {/* === Akhir Blok Kode Dropdown === */}


                        {/* Tombol Toggle Navigasi Responsif Asli (Horizontal Nav) */}
                        {/* Ini adalah tombol hamburger yang ada di nav horizontal lama */}
                        {/* Anda perlu memutuskan apakah akan menggunakan ini untuk memunculkan sidebar mobile, atau membuat tombol baru */}
                        {/* Untuk layout sidebar, biasanya tombol toggle mobile diletakkan di top bar konten utama atau di header sidebar */}
                        {/* Class 'sm:hidden' menyembunyikannya di breakpoint 'sm' ke atas (desktop/tablet) */}
                        <div className="-me-2 flex items-center sm:hidden">
                             {/* ... Kode Tombol Toggle ... */}
                        </div>

                    </div> {/* Akhir div flex justify-between */}
                </header> {/* === Akhir Top Bar Area Konten Utama === */}


                {/* Slot Konten Utama Halaman */}
                {/* Flex-1 agar main mengambil sisa ruang vertikal, p-6 untuk padding, overflow-y-auto untuk scroll */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children} {/* Konten utama dari halaman spesifik */}
                </main>

            </div> {/* === Akhir Area Konten Utama === */}

            {/* Navigasi Responsif Asli */}
            {/* Ini adalah konten menu responsif yang muncul saat tombol toggle diklik di nav horizontal lama */}
            {/* Jika Anda mengimplementasikan sidebar mobile, Anda perlu memindahkan konten ini ke dalam struktur sidebar mobile dan mengontrolnya dengan state */}
            {/* Untuk saat ini, struktur ini tetap ada tetapi tidak terlihat di desktop (karena sm:hidden) */}
             {/* <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}> ... Kode Konten Responsif ... </div> */}


        </div> // === Akhir Struktur Layout Utama ===
    );
}