// resources/js/templates/AuthenticatedLayout.jsx

// Import komponen
import ApplicationLogo from '@/components/atoms/ApplicationLogo';
import Dropdown from '@/components/molecules/Dropdown';
import NavLink from '@/components/atoms/NavLink'; // Akan dimodifikasi
import ResponsiveNavLink from '@/components/atoms/ResponsiveNavLink'; // Untuk link profil/logout di mobile sidebar jika diinginkan

import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react'; // Import useEffect dan useRef
// Import ikon
import { IconMenu2, IconX, IconLock, IconLockOpen } from '@tabler/icons-react'; // Tambah ikon kunci untuk pengunci

// Import ikon yang digunakan dalam NavLink
import { IconDashboard, IconUsers, IconShield, IconList } from '@tabler/icons-react'; // Contoh ikon, impor semua yang Anda gunakan


// Utilitas untuk cek izin
import hasAnyPermission from '@/utils/Permissions'; // Pastikan path ini benar


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    // State untuk toggle sidebar mobile (Hidden/Shown)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // === STATE UNTUK PERILAKU DESKTOP ===
    // State untuk mengontrol apakah sidebar expanded (baik karena hover atau lock)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    // State untuk mengontrol apakah sidebar dikunci (stay expanded setelah klik)
    const [isSidebarLocked, setIsSidebarLocked] = useState(false);

    // State untuk mendeteksi apakah layar berukuran mobile (< sm)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // 640px adalah breakpoint 'sm' default

    // Ref untuk elemen sidebar (agar bisa pasang event listener)
    const sidebarRef = useRef(null);

    // === Efek & Handler untuk Perilaku Desktop (Hover/Click) dan Responsif ===
    useEffect(() => {
        const sidebarElement = sidebarRef.current;
        if (!sidebarElement) return; // Pastikan elemen ada

        // Handler Mouse Enter (Desktop - hanya jika TIDAK terkunci)
        const handleMouseEnter = () => {
            if (!isMobile && !isSidebarLocked) {
                setIsSidebarExpanded(true);
            }
        };

        // Handler Mouse Leave (Desktop - hanya jika TIDAK terkunci)
        const handleMouseLeave = () => {
            if (!isMobile && !isSidebarLocked) {
                 // Tambahkan penundaan singkat untuk menghindari jank saat kursor cepat keluar
                 // Atau tambahkan logika cek fokus di sini jika diperlukan penanganan keyboard focus
                setTimeout(() => { // Contoh sederhana dengan penundaan
                    if (!isSidebarLocked) { // Cek lagi setelah penundaan
                       setIsSidebarExpanded(false);
                    }
                }, 50); // Penundaan 50ms
            }
        };

        // Handler Resize (Update isMobile state)
        const handleResize = () => {
            const mobile = window.innerWidth < 640;
            setIsMobile(mobile);

            // Reset state desktop saat beralih ke mobile
            if (mobile) {
                setIsSidebarExpanded(false);
                setIsSidebarLocked(false);
                // Tutup sidebar mobile jika terbuka saat resize ke desktop (jika perlu)
                // if (!mobile && isMobileSidebarOpen) {
                //      setIsMobileSidebarOpen(false);
                // }
            } else {
                 // Saat beralih dari mobile ke desktop, atur expanded sesuai locked state
                 // Jika dikunci, expanded. Jika tidak, collapsed default.
                 setIsSidebarExpanded(isSidebarLocked);
            }
        };


        // --- Tambahkan Event Listeners ---
        // Listener Mouse Hover/Leave hanya di desktop
        if (!isMobile) {
             sidebarElement.addEventListener('mouseenter', handleMouseEnter);
             sidebarElement.addEventListener('mouseleave', handleMouseLeave);
             // Event listeners untuk focus/blur pada elemen di dalam sidebar (jika diperlukan)
             // Memerlukan logika yang lebih kompleks untuk mendeteksi fokus di dalam elemen sidebar
        }
        // Listener Resize di seluruh window
        window.addEventListener('resize', handleResize);


        // --- Cleanup Event Listeners ---
        return () => {
            if (sidebarElement) {
                 sidebarElement.removeEventListener('mouseenter', handleMouseEnter);
                 sidebarElement.removeEventListener('mouseleave', handleMouseLeave);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile, isSidebarLocked]); // Re-run effect jika isMobile atau isSidebarLocked berubah


    // Fungsi untuk men-toggle tampilan sidebar mobile (dari top bar mobile/ikon X)
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen((prevState) => !prevState);
    };

    // Fungsi untuk men-toggle mode terkunci (Locked) sidebar desktop (dari tombol khusus)
    const toggleSidebarLock = () => {
        const nextLockedState = !isSidebarLocked;
        setIsSidebarLocked(nextLockedState);
        // Saat dikunci (true), pastikan expanded. Saat tidak dikunci (false), kembali ke default (collapsed)
        setIsSidebarExpanded(nextLockedState);
    };


    // === Menentukan Class untuk Sidebar ===
    // Class dinamis berdasarkan state mobile, isMobileSidebarOpen (mobile), dan isSidebarExpanded (desktop)
    const sidebarClasses = `
        fixed inset-y-0 left-0 z-50 border-r border-gray-200 flex flex-col h-screen overflow-y-auto transition-transform ease-in-out duration-300

        // --- Styling Warna Abu-abu Muda ---
        bg-gray-100
        text-gray-800

        // --- Mobile (< sm) ---
        ${isMobile ? 'w-64' : 'sm:w-auto'} /* Lebar saat terbuka di mobile */
        ${isMobile ? (isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'sm:translate-x-0 sm:relative'} /* Toggle mobile & Positioning desktop */

        // --- Desktop (sm+) ---
        ${isMobile ? '' : (isSidebarExpanded ? 'sm:w-64' : 'sm:w-20')} /* Lebar dinamis di desktop (Expanded vs Collapsed) */
        ${isMobile ? '' : (isSidebarExpanded ? '' : 'sm:overflow-hidden')} /* Sembunyikan overflow saat collapsed desktop */
    `; // Sesuaikan sm:w-20 (lebar mini) dan sm:w-64 (lebar penuh) desktop


     // === Menentukan Class untuk Margin Konten Utama ===
     // Margin kiri dinamis berdasarkan state desktop expanded
     const mainContentClasses = `
         flex-1 flex flex-col p-6 overflow-y-auto /* padding konten & scroll */
         // --- Margin Kiri Dinamis ---
         ${isMobile ? 'ml-0' : (isSidebarExpanded ? 'sm:ml-64' : 'sm:ml-20')} /* Margin kiri 0 mobile, dinamis desktop */
     `; // Sesuaikan sm:ml-20 dan sm:ml-64 sesuai lebar sidebar


    // State expanded yang di-pass ke NavLink/ResponsiveNavLink (untuk kontrol visibilitas teks/ikon)
    // True jika mobile sidebar terbuka ATAU jika desktop sidebar expanded
    const isNavExpanded = isMobile ? isMobileSidebarOpen : isSidebarExpanded;


    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* === Sidebar Kiri === */}
            {/* Pasang ref dan event listener untuk hover/leave di desktop */}
            <div ref={sidebarRef} className={sidebarClasses}>

                {/* Bagian Header Sidebar (Logo/Nama Aplikasi & Pengunci) */}
                {/* Sesuaikan padding & penempatan agar logo/teks terlihat di kedua mode desktop */}
                {/* Menggunakan flex items-center justify-between untuk menata logo/nama dan pengunci */}
                <div className="flex shrink-0 items-center px-4 py-4 border-b border-gray-200 justify-between">
                    <div className="flex items-center"> {/* Container untuk Logo dan Nama */}
                        {/* Logo: Posisi dan warna ikon disesuaikan */}
                        <ApplicationLogo className={`block h-9 w-auto fill-current text-gray-800 ${isNavExpanded ? 'mr-3' : (!isMobile ? 'sm:mr-3' : 'mr-3')}`} /> {/* <--- Ubah sm:mx-auto menjadi sm:mr-3 */}
                        {/* Nama aplikasi: Disembunyikan saat collapsed desktop */}
                         {isNavExpanded && !isMobile && (
                             <span className="text-xl font-semibold text-gray-800 mr-3">SITARUNA</span>
                         )}
                    </div>

                    {/* === Kontrol Pengunci Sidebar (Desktop Only) === */}
                    {/* Tampil hanya di desktop (!isMobile) */}
                    {!isMobile && (
                         <div className="flex items-center ml-auto"> {/* ml-auto untuk mendorong ke kanan */}
                             {/* Menggunakan checkbox yang distyling agar mirip toggle/radio */}
                             {/* Klik pada input atau label akan memanggil toggleSidebarLock */}
                             <input
                                 type="checkbox"
                                 id="sidebar-lock-toggle" // Berikan ID unik
                                 checked={isSidebarLocked} // Status checked berdasarkan state isSidebarLocked
                                 onChange={toggleSidebarLock} // Panggil toggleSidebarLock saat status berubah
                                 className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded-full border-gray-300 focus:ring-blue-500" // Styling dasar checkbox Tailwind
                             />
                             {/* Label untuk checkbox, klik pada label juga akan toggle checkbox */}
                             {/* Label hanya terlihat saat sidebar expanded di desktop */}
                             {/* {isSidebarExpanded && (
                                  <label htmlFor="sidebar-lock-toggle" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                                      Lock
                                  </label>
                             )} */}
                              {/* Opsi: Tampilkan ikon kunci saat collapsed desktop */}
                             {!isSidebarExpanded && (
                                  <label htmlFor="sidebar-lock-toggle" className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800">
                                      {isSidebarLocked ? <IconLock size={20} strokeWidth={1.5} /> : <IconLockOpen size={20} strokeWidth={1.5} />}
                                  </label>
                             )}
                         </div>
                    )}


                    {/* Tombol Tutup Sidebar (Hanya di Mobile, saat Sidebar terbuka) */}
                    {isMobile && isMobileSidebarOpen && (
                         <button
                             onClick={toggleMobileSidebar}
                             className="p-1 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ml-auto"
                         >
                              <IconX size={24} strokeWidth={1.5} />
                         </button>
                    )}
                </div>

                {/* Bagian Navigasi Sidebar */}
                <nav className="flex flex-col flex-1 px-2 py-4 space-y-1">
                    {/* Menggunakan komponen NavLink */}
                    {/* Pass state expanded dan mobile */}

                    {/* Contoh NavLink Dashboard */}
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        isSidebarExpanded={isNavExpanded} // Pass combined state
                        isMobile={isMobile} // Pass state mobile
                        icon={IconDashboard} // Contoh prop ikon
                    >
                        Dashboard {/* Children (teks label) */}
                    </NavLink>

                    {/* NavLink Roles */}
                    {hasAnyPermission(['roles index']) &&
                         <NavLink
                            href={route('roles.index')}
                            active={route().current('roles.index')}
                            isSidebarExpanded={isNavExpanded}
                            isMobile={isMobile}
                            icon={IconUsers}
                        >
                            Roles
                        </NavLink>
                    }
                    {/* Ulangi untuk Permissions, Users, dll. */}
                     {hasAnyPermission(['permissions index']) &&
                         <NavLink href={route('permissions.index')} active={route().current('permissions.index')} isSidebarExpanded={isNavExpanded} isMobile={isMobile} icon={IconShield}>Permissions</NavLink>
                    }
                     {hasAnyPermission(['users index']) &&
                         <NavLink href={route('users.index')} active={route().current('users.index')} isSidebarExpanded={isNavExpanded} isMobile={isMobile} icon={IconList}>Users</NavLink>
                    }

                     {/* Opsi: Tautan Profil/Logout di Bawah Sidebar (Jika perlu di mobile) */}
                     {/* Jika Anda ingin link Profile/Logout di bagian bawah sidebar *hanya di mobile*,
                         aktifkan bagian ini dan pastikan dibungkus kondisi {isMobile && (...) }.
                         Jika profile dropdown selalu di header di semua ukuran, hapus bagian ini. */}
                     {/* {isMobile && (
                         <div className="mt-auto border-t border-gray-200 p-4">
                             <NavLink href={route('profile.edit')} isSidebarExpanded={isNavExpanded} isMobile={isMobile}>Profile</NavLink>
                             <NavLink method="post" href={route('logout')} as="button" isSidebarExpanded={isNavExpanded} isMobile={isMobile}>Log Out</NavLink>
                         </div>
                     )} */}

                </nav>

            </div> {/* === Akhir Sidebar Kiri === */}

            {/* === Overlay Mobile === */}
            {/* Muncul saat mobile sidebar terbuka */}
            {isMobile && isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-25"
                    onClick={toggleMobileSidebar}
                ></div>
            )}

            {/* === Area Konten Utama === */}
            {/* Margin kiri dinamis berdasarkan state expanded desktop */}
            <div className={mainContentClasses}>

                {/* === Top Bar di Area Konten Utama (Header) === */}
                {/* Mengandung Tombol Toggle Sidebar Mobile, Judul Halaman, & Profil User */}
                <header className="w-full bg-white shadow">
                     <div className="flex items-center px-4 py-6 sm:px-6 lg:px-8">

                         {/* Tombol Buka Sidebar Mobile (Hanya di Mobile) */}
                         {isMobile && (
                            <button
                                onClick={toggleMobileSidebar} // Memanggil toggleMobileSidebar untuk membuka sidebar mobile
                                className="-ms-2 mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                 <IconMenu2 size={24} strokeWidth={1.5} />
                            </button>
                         )}

                         {/* Tombol Toggle Sidebar Desktop (Panah) DIHAPUS DARI SINI */}
                         {/* {!isMobile && ( ... tombol panah lama ... )} */}


                        {/* Slot Header Halaman */}
                         <div className="flex-1 px-2 sm:px-0">
                             {header}
                         </div>

                        {/* Pengaturan Pengguna (Molekul Dropdown) */}
                        {/* === Ini di HEADER Area Konten Utama === */}
                        {/* Tampil di semua ukuran dalam implementasi ini */}
                         <div className="ml-auto"> {/* ml-auto untuk dorong ke kanan */}
                             <Dropdown align="right" width="48">
                                 {/* Trigger & Content Dropdown */}
                                  <Dropdown.Trigger> {/* ... User Name & Icon ... */} </Dropdown.Trigger>
                                  <Dropdown.Content> {/* ... Profile & Logout Links ... */}</Dropdown.Content>
                             </Dropdown>
                         </div>

                    </div>
                </header>

                {/* Page Main Content Slot */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>

            </div> {/* End Main Content Area */}

            {/* Konten Navigasi Responsif Asli - DIHAPUS */}

        </div>
    );
}

// --- Pastikan NavLink.jsx sudah diupdate dengan styling dan isSidebarExpanded prop ---
// --- Pastikan ResponsiveNavLink.jsx juga diupdate warnanya jika masih digunakan ---
// --- Pastikan semua ikon yang digunakan (IconMenu2, IconX, IconLock, IconLockOpen, dan ikon di NavLinks) diimpor di AuthenticatedLayout.jsx ---
// Example icon imports (add to the top import section):
// import { IconDashboard, IconUsers, IconShield, IconList } from '@tabler/icons-react'; // Icons for NavLinks
// import { IconMenu2, IconX, IconLock, IconLockOpen } from '@tabler/icons-react'; // Icons for toggle and lock