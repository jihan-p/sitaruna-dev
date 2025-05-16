// resources/js/templates/AuthenticatedLayout.jsx

import React from 'react';
// Import komponen-komponen atom/molecule/organism yang Anda miliki (sesuaikan path importnya)
// === Pastikan path import komponen Anda sesuai dengan struktur proyek Anda ===
import ApplicationLogo from '@/components/atoms/ApplicationLogo'; // Logo aplikasi di sidebar
import Dropdown from '@/components/molecules/Dropdown';       // Dropdown user di header
import NavLink from '@/components/atoms/NavLink';             // Komponen untuk link navigasi di sidebar
import ResponsiveNavLink from '@/components/atoms/ResponsiveNavLink'; // Opsional: untuk link profil/logout di mobile sidebar jika diinginkan
// =============================================================================

// Import hook dan komponen dari Inertia
import { Link, usePage } from '@inertiajs/react'; // Link untuk navigasi, usePage untuk akses global props (seperti auth)
import { useState, useEffect, useRef } from 'react'; // Import hook React

// Import ikon dari Tabler Icons (sesuaikan dengan ikon yang Anda gunakan)
// === Pastikan Anda sudah menginstal paket @tabler/icons-react ===
import {
    IconMenu2, // Ikon burger untuk toggle mobile sidebar
    IconX,     // Ikon close untuk menutup mobile sidebar
    IconLock,  // Ikon kunci tertutup
    IconLockOpen, // Ikon kunci terbuka
    IconDashboard, // Ikon Dashboard
    IconUsers,     // Ikon Users/Roles (contoh)
    IconShield,    // Ikon Permissions (contoh)
    IconList,      // Ikon List (contoh)
    IconUsersGroup, // Ikon Peserta Didik (contoh)
    IconBuildingSkyscraper, // Ikon Jurusan (contoh)
    IconHeart, // Ikon hati untuk footer
    IconCalendar
} from '@tabler/icons-react';
// ==============================================================

// Import utility untuk cek izin menggunakan Spatie (sesuaikan path importnya)
// === Pastikan path import utility hasAnyPermission Anda benar ===
import hasAnyPermission from '@/utils/Permissions';
// ============================================================


// Komponen Layout Utama yang akan membungkus konten halaman
// Menerima prop 'auth' (dari Inertia via page component), 'header' (konten header), dan 'children' (konten halaman)
export default function AuthenticatedLayout({ user: authUser, header, children }) { // Menggunakan 'authUser' untuk menghindari konflik nama jika ada variabel 'user' lain, tapi di sini bisa langsung {auth, header, children} jika page component pass prop 'auth'

    // === Mengambil user dari props Inertia (cara standar) ===
    // Ini akan selalu mendapatkan user yang sedang login di route terautentikasi
    const { auth } = usePage().props; // Ambil objek 'auth' dari global page props
    const user = auth.user; // Ambil objek user dari auth

    // State untuk toggle sidebar mobile (Hidden/Shown)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // === STATE UNTUK PERILAKU SIDEBAR DESKTOP ===
    // State untuk mengontrol apakah sidebar expanded (baik karena hover atau lock)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    // State untuk mengontrol apakah sidebar dikunci (stay expanded setelah klik ikon kunci)
    const [isSidebarLocked, setIsSidebarLocked] = useState(() => {
        // Baca nilai 'sidebarLocked' dari localStorage saat komponen pertama kali mount
        // Menggunakan try...catch untuk keamanan jika localStorage tidak tersedia (misal: mode private Browse)
        try {
            const storedValue = localStorage.getItem('sidebarLocked');
            // Jika ada nilai di localStorage, gunakan itu (true jika stringnya 'true', false jika stringnya 'false' atau null/undefined)
            if (storedValue !== null) {
                return storedValue === 'true';
            } else {
                // Jika TIDAK ada nilai di localStorage, default ke true (terkunci) HANYA JIKA di desktop.
                // Deteksi awal ukuran layar (mobile vs desktop) saat mount.
                const initialIsMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false; // 640px adalah breakpoint 'sm' default
                return !initialIsMobile; // Default to locked (true) if initially not mobile and no stored value
            }
        } catch (e) {
            console.error("Failed to read from localStorage:", e);
            // Jika gagal membaca dari localStorage, default ke true HANYA JIKA di desktop.
            const initialIsMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
            return !initialIsMobile; // Default to locked (true) if initially not mobile on error
        }
    });

    // State untuk mendeteksi apakah layar berukuran mobile (< sm)
    // Inisialisasi awal client-side detection (typeof window !== 'undefined')
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false); // 640px adalah breakpoint 'sm' default

    // Ref untuk elemen sidebar (agar bisa pasang event listener)
    const sidebarRef = useRef(null);

    // === useEffect 1: Handle Resize Event dan Update isMobile State ===
    useEffect(() => {
        console.log('Resize Listener Effect Triggered'); // LOG Resize Effect

        const handleResize = () => {
            console.log('handleResize called'); // LOG 8
            // Cukup update state isMobile
            const mobile = window.innerWidth < 640;
            setIsMobile(mobile);
            console.log('handleResize: Set isMobile to', mobile);
            // Logika pengaturan isSidebarExpanded dan isSidebarLocked TIDAK DI SINI lagi
        };

        // Tambahkan resize listener
        window.addEventListener('resize', handleResize);
        console.log('Added resize listener');

        // Cleanup: Hapus resize listener saat komponen unmount
        return () => {
            console.log('Resize Listener Effect Cleanup'); // LOG Cleanup Resize Effect
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Dependency array kosong: effect ini hanya berjalan sekali saat mount dan cleanup saat unmount


    // === useEffect 2: Sinkronisasi State isSidebarExpanded ===
    // Efek ini berjalan SETIAP KALI isMobile atau isSidebarLocked berubah
    useEffect(() => {
        console.log('Sync Expanded Effect Triggered', { isMobile_dep: isMobile, isSidebarLocked_dep: isSidebarLocked }); // LOG Sync Effect

        // Logika utama untuk menentukan apakah sidebar harus expanded
        if (!isMobile) { // Jika di Desktop
            console.log('Sync Expanded Effect: On Desktop'); // Log
            // Di desktop, expanded state mengikuti locked state
            if (isSidebarLocked) {
                if (!isSidebarExpanded) { // Hindari update state yang tidak perlu
                    setIsSidebarExpanded(true); // LOG 18a
                    console.log('Sync Expanded Effect: Setting isSidebarExpanded TRUE because isSidebarLocked TRUE on Desktop');
                }
            } else { // Jika di Desktop DAN TIDAK Terkunci
                // Sidebar seharusnya COLLAPSED (kecuali sedang di-hover, yang ditangani listener mouse)
                if (isSidebarExpanded) { // Jika saat ini Expanded (misal setelah unlock), set false
                    setIsSidebarExpanded(false); // LOG 18b
                    console.log('Sync Expanded Effect: Setting isSidebarExpanded FALSE because isSidebarLocked FALSE on Desktop');
                }
            }
        } else { // Jika di Mobile
            console.log('Sync Expanded Effect: On Mobile'); // Log
            // Di mobile, desktop expanded state seharusnya selalu FALSE
            if (isSidebarExpanded) { // Jika saat ini Expanded (tidak seharusnya di mobile), set false
                setIsSidebarExpanded(false); // LOG 18c
                console.log('Sync Expanded Effect: Setting isSidebarExpanded FALSE on Mobile');
            }
            // Note: isMobileSidebarOpen yang mengontrol visual sidebar mobile, bukan isSidebarExpanded
        }
        // Jangan kembalikan fungsi cleanup di sini untuk menghindari bug re-render pada state ini
        // Cleanup listeners ditangani di effect terpisah
    }, [isMobile, isSidebarLocked]); // Dependencies: bereaksi pada perubahan isMobile atau isSidebarLocked


    // === useEffect 3: Kelola Mouse Enter/Leave Listeners ===
    // Efek ini berjalan SETIAP KALI isMobile atau isSidebarLocked berubah (untuk menambah/menghapus listener)
    useEffect(() => {
        console.log('Mouse Listeners Effect Triggered', { isMobile_dep: isMobile, isSidebarLocked_dep: isSidebarLocked, currentIsSidebarExpanded: isSidebarExpanded }); // LOG Mouse Effect
        const sidebarElement = sidebarRef.current;
        if (!sidebarElement) return; // Pastikan ref sudah terisi

        // Handler Mouse Enter (Desktop - hanya jika TIDAK terkunci)
        const handleMouseEnter = () => {
            console.log('handleMouseEnter triggered', { isMobile, isSidebarLocked }); // LOG 5
            if (!isMobile && !isSidebarLocked) {
                setIsSidebarExpanded(true);
                console.log('setIsSidebarExpanded(true) from mouse enter'); // LOG 5a
            }
        };

        // Handler Mouse Leave (Desktop - hanya jika TIDAK terkunci)
        const handleMouseLeave = () => {
            console.log('handleMouseLeave triggered', { isMobile, isSidebarLocked }); // LOG 6
            if (!isMobile && !isSidebarLocked) {
                 // Tambahkan penundaan singkat sebelum meng-collapse
                 setTimeout(() => {
                     console.log('handleMouseLeave setTimeout check', { isSidebarLockedAtTimeout: isSidebarLocked, currentIsSidebarExpanded: isSidebarExpanded }); // LOG 7
                    // Hanya collapse jika TIDAK terkunci DAN sidebar saat ini Expanded
                    if (!isSidebarLocked && isSidebarExpanded) {
                       setIsSidebarExpanded(false);
                       console.log('setIsSidebarExpanded(false) from mouse leave timeout'); // LOG 7a
                    }
                }, 50); // Penundaan 50ms
            }
        };

        // === Tambahkan/Hapus Event Listeners ===
        // Listener untuk hover hanya di desktop (!isMobile) DAN saat TIDAK terkunci (!isSidebarLocked)
        if (!isMobile && !isSidebarLocked) {
             console.log('Mouse Listeners: Adding mouse listeners');
             // Hapus listener lama (penting untuk cleanup saat dependencies berubah)
             sidebarElement.removeEventListener('mouseenter', handleMouseEnter);
             sidebarElement.removeEventListener('mouseleave', handleMouseLeave);
             // Tambahkan listener baru
             sidebarElement.addEventListener('mouseenter', handleMouseEnter);
             sidebarElement.addEventListener('mouseleave', handleMouseLeave);
        } else {
             // Jika kondisi tidak terpenuhi (Mobile ATAU Terkunci), pastikan listener dihapus
             console.log('Mouse Listeners: Removing mouse listeners');
             sidebarElement.removeEventListener('mouseenter', handleMouseEnter);
             sidebarElement.removeEventListener('mouseleave', handleMouseLeave);
        }


        // Cleanup: Hapus listener saat dependencies berubah atau komponen unmount
        return () => {
            console.log('Mouse Listeners Effect Cleanup'); // LOG Cleanup Mouse Effect
            if (sidebarElement) {
                 // Hapus semua listener mouse yang mungkin terpasang
                 sidebarElement.removeEventListener('mouseenter', handleMouseEnter);
                 sidebarElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [isMobile, isSidebarLocked, isSidebarExpanded]); // Dependencies: sertakan state yang dibaca/ditulis di handler


    // === Handler Toggle Sidebar Mobile ===
    const toggleMobileSidebar = () => {
        console.log('toggleMobileSidebar called'); // LOG 14
        setIsMobileSidebarOpen((prevState) => !prevState);
        // State isSidebarExpanded akan diatur menjadi false oleh Sync Expanded Effect saat isMobile jadi true
    };

    // === Handler Toggle Sidebar Lock (Desktop Only) ===
    const toggleSidebarLock = () => {
        const nextLockedState = !isSidebarLocked;
        console.log('toggleSidebarLock called, nextLockedState:', nextLockedState); // LOG 15
        // Update state isSidebarLocked
        setIsSidebarLocked(nextLockedState);
        // Simpan ke localStorage
        try {
             localStorage.setItem('sidebarLocked', nextLockedState.toString());
             console.log('localStorage sidebarLocked set to:', nextLockedState); // LOG 16
        } catch (e) {
             console.error("Failed to write to localStorage:", e);
        }
        // State isSidebarExpanded akan diatur dengan benar oleh Sync Expanded Effect
        // Namun, kita bisa set di sini juga untuk respons UI instan saat klik tombol kunci
        setIsSidebarExpanded(nextLockedState); // LOG 17
        console.log('toggleSidebarLock: Setting isSidebarExpanded to', nextLockedState, 'for immediate UI update');
    };


    // === Menentukan Class untuk Sidebar (Desktop & Mobile) ===
    // Class dinamis berdasarkan state mobile, isMobileSidebarOpen (mobile), dan isSidebarExpanded (desktop)
    const sidebarClasses = `
        fixed inset-y-0 left-0 z-50 border-r border-gray-200 flex flex-col h-screen overflow-y-auto transition-transform ease-in-out duration-300

        // --- Styling Warna Abu-abu Muda ---
        bg-gray-100
        text-gray-800

        // --- Mobile (< sm) ---
        ${isMobile ? 'w-64' : 'sm:w-auto'} /* Lebar saat terbuka di mobile */
        ${isMobile ? (isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'sm:translate-x-0 sm:relative'} /* Toggle mobile (muncul/sembunyi) & Positioning desktop (relative agar konten utama bergeser) */

        // --- Desktop (sm+) ---
        ${isMobile ? '' : (isSidebarExpanded ? 'sm:w-64' : 'sm:w-20')} /* Lebar dinamis di desktop (Expanded vs Collapsed) */
        ${isMobile ? '' : (isSidebarExpanded ? '' : 'sm:overflow-hidden')} /* Sembunyikan overflow (teks/ikon) saat collapsed desktop */
    `; // Sesuaikan sm:w-20 (lebar mini) dan sm:w-64 (lebar penuh) desktop


     // === Menentukan Class untuk Margin Konten Utama (Desktop Only) ===
     // Margin kiri dinamis agar konten utama tidak tertutup sidebar desktop
     const mainContentClasses = `
         flex-1 flex flex-col overflow-y-auto /* padding konten & scroll */
         // --- Margin Kiri Dinamis (Hanya di Desktop) ---
         ${isMobile ? 'ml-0' : (isSidebarExpanded ? 'sm:ml-0' : 'sm:ml-0')} /* Margin kiri 0 mobile, ikuti lebar sidebar di desktop */
     `; // Sesuaikan sm:ml-20 dan sm:ml-64 sesuai lebar mini/penuh sidebar desktop


    // State expanded yang di-pass ke komponen NavLink (untuk kontrol visibilitas teks/ikon)
    // NavLink akan expanded (teks terlihat) jika mobile sidebar terbuka ATAU jika desktop sidebar expanded
    const isNavExpanded = isMobile ? isMobileSidebarOpen : isSidebarExpanded;


    return (
        <div className="flex min-h-screen bg-gray-100"> {/* Container utama flex */}

            {/* === Sidebar Kiri === */}
            {/* Pasang ref untuk mendapatkan elemen DOM sidebar */}
            {/* Pasang className dinamis */}
            <div ref={sidebarRef} className={sidebarClasses}>

                {/* Bagian Header Sidebar (Logo/Nama Aplikasi & Pengunci) */}
                {/* Container flex untuk menata item di header sidebar */}
                <div className="flex shrink-0 items-center px-4 py-6 border-b border-gray-200 justify-between">
                    <div className="flex items-center"> {/* Container untuk Logo dan Nama */}
                        {/* Logo Aplikasi: Gunakan komponen ApplicationLogo Anda */}
                        {/* Sesuaikan margin/penempatan agar terlihat baik di kedua mode desktop */}
                        {/* isNavExpanded mengontrol apakah sidebar sedang dalam mode expanded (baik mobile atau desktop) */}
                        <ApplicationLogo className={`block h-9 w-auto fill-current text-gray-800 ${isNavExpanded ? 'mr-3' : 'sm:mr-3'}`} /> {/* Sesuaikan styling logo */}
                        {/* Nama aplikasi: Disembunyikan saat sidebar collapsed di desktop */}
                         {isNavExpanded && !isMobile && ( // Tampilkan teks nama aplikasi hanya jika sidebar expanded DAN bukan di mobile
                             <span className="text-xl font-semibold text-gray-800 mr-3">SITARUNA</span>
                         )}
                    </div>

                    {/* === Kontrol Pengunci Sidebar (Desktop Only) === */}
                    {/* Tampil hanya di desktop (!isMobile) */}
                    {!isMobile && (
                         // Container flex untuk tombol pengunci
                         <div className={`flex items-center ml-auto ${!isSidebarExpanded ? 'sm:-mr-4' : ''}`}> {/* ml-auto untuk dorong ke kanan, -mr-4 untuk geser sedikit ke kiri saat collapsed */}
                             {/* Checkbox input asli (tersembunyi secara visual) */}
                             {/* ID sidebar-lock-toggle menghubungkan input ini dengan label di bawahnya */}
                             {/* Menggunakan class sr-only (screen reader only) untuk menyembunyikan secara visual */}
                             <input
                                 type="checkbox"
                                 id="sidebar-lock-toggle"
                                 checked={isSidebarLocked} // Checked state mengikuti state isSidebarLocked
                                 onChange={toggleSidebarLock} // Panggil handler saat status checkbox berubah
                                 className="sr-only" // Sembunyikan input asli
                             />
                             {/* Label yang berfungsi sebagai area klik untuk toggle (menggunakan ikon kunci) */}
                             {/* htmlFor harus sama dengan ID input checkbox */}
                             <label
                                 htmlFor="sidebar-lock-toggle"
                                 className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 shrink-0 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors duration-200 mr-3" // Styling label (ikon)
                             >
                                 {/* Tampilkan ikon kunci sesuai state terkunci */}
                                 {isSidebarLocked ? <IconLock size={20} strokeWidth={1.5} /> : <IconLockOpen size={20} strokeWidth={1.5} />}
                             </label>
                         </div>
                    )}


                    {/* Tombol Tutup Sidebar Mobile (Hanya di Mobile, saat Sidebar terbuka) */}
                    {isMobile && isMobileSidebarOpen && ( // Tampilkan hanya jika di mobile DAN sidebar mobile terbuka
                         <button
                             onClick={toggleMobileSidebar} // Panggil handler untuk menutup sidebar mobile
                             className="p-1 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ml-auto" // Styling tombol X
                         >
                              <IconX size={24} strokeWidth={1.5} /> {/* Ikon X */}
                         </button>
                    )}
                </div> {/* === Akhir Header Sidebar === */}

                {/* Bagian Navigasi Utama di Sidebar */}
                {/* Menggunakan komponen NavLink untuk setiap item menu */}
                <nav className="flex flex-col flex-1 px-2 py-4 space-y-1">
                    {/* NavLink Dashboard */}
                    <NavLink
                        href={route('dashboard')} // Link ke route dashboard
                        active={route().current('dashboard')} // Penanda aktif jika route saat ini adalah dashboard
                        isSidebarExpanded={isNavExpanded} // Pass state expanded ke NavLink (untuk kontrol visibilitas teks)
                        isMobile={isMobile} // Pass state mobile
                        icon={IconDashboard} // Contoh prop ikon
                    >
                        Dashboard {/* Children (teks label menu) */}
                    </NavLink>

                    {/* === Contoh NavLink untuk Modul lain dengan Permission Check === */}
                    {/* Pastikan Anda mengimpor utility hasAnyPermission dan objek 'auth' sudah tersedia */}

                    {/* NavLink Roles */}
                    {auth.user && hasAnyPermission(['roles index']) && ( // Tampilkan hanya jika user login DAN punya permission 'roles index'
                         <NavLink
                            href={route('roles.index')}
                            active={route().current('roles.index')}
                            isSidebarExpanded={isNavExpanded}
                            isMobile={isMobile}
                            icon={IconUsers}
                        >
                            Roles
                        </NavLink>
                    )}
                    {/* NavLink Permissions */}
                     {auth.user && hasAnyPermission(['permissions index']) && ( // Tampilkan hanya jika user login DAN punya permission 'permissions index'
                         <NavLink
                            href={route('permissions.index')}
                            active={route().current('permissions.index')}
                            isSidebarExpanded={isNavExpanded}
                            isMobile={isMobile}
                            icon={IconShield}
                         >
                            Permissions
                         </NavLink>
                     )}
                    {/* NavLink Users */}
                     {auth.user && hasAnyPermission(['users index']) && ( // Tampilkan hanya jika user login DAN punya permission 'users index'
                         <NavLink
                            href={route('users.index')}
                            active={route().current('users.index')}
                            isSidebarExpanded={isNavExpanded}
                            isMobile={isMobile}
                            icon={IconList}
                         >
                            Users
                         </NavLink>
                     )}

                     {/* === NavLink untuk Modul Peserta Didik (Sudah ada) === */}
                     {auth.user && hasAnyPermission(['students index']) && ( // Tampilkan hanya jika user login DAN punya permission 'students index'
                         <NavLink
                            href={route('students.index')} // Link ke route index students
                            active={route().current('students.index')} // Cek apakah route saat ini adalah index students
                            isSidebarExpanded={isNavExpanded}
                            isMobile={isMobile}
                            icon={IconUsersGroup} // Gunakan ikon yang sesuai
                        >
                            Peserta Didik {/* Teks menu */}
                        </NavLink>
                     )}
                     {/* ============================================== */}

                     {/* === NavLink untuk Modul Jurusan (Baru Ditambahkan) === */}
                     {auth.user && hasAnyPermission(['majors index']) && ( // Tampilkan hanya jika user login DAN punya permission 'majors index'
                         <NavLink
                            href={route('majors.index')} // Link ke route 'majors.index'
                            active={route().current('majors.index')} // Cek apakah route saat ini adalah 'majors.index'
                            isSidebarExpanded={isNavExpanded}
                            isMobile={isMobile}
                            icon={IconBuildingSkyscraper} // <== Ganti dengan ikon yang Anda impor dan pilih
                        >
                            Jurusan {/* Teks menu */}
                        </NavLink>
                     )}
                     {/* ============================================= */}

                    {/* === Opsi: Tautan Profil/Logout di Bawah Sidebar (Jika perlu di mobile) === */}
                    {/* Jika Anda ingin link Profile/Logout di bagian bawah sidebar *hanya di mobile*,
                        aktifkan bagian ini dan pastikan dibungkus kondisi {isMobile && (...) }.
                        Jika profile dropdown selalu di header (seperti implementasi di sini), bagian ini bisa dihapus. */}
                     {/* {isMobile && (
                         <div className="mt-auto border-t border-gray-200 p-4"> // mt-auto untuk dorong ke bawah, border-t untuk garis di atas
                             <ResponsiveNavLink href={route('profile.edit')} isSidebarExpanded={isNavExpanded} isMobile={isMobile}>Profile</ResponsiveNavLink>
                             <ResponsiveNavLink method="post" href={route('logout')} as="button" isSidebarExpanded={isNavExpanded} isMobile={isMobile}>Log Out</ResponsiveNavLink>
                         </div>
                     )} */}
                    {/* ====================================================================== */}

                    {/* Tambahkan NavLink untuk modul lain di sini (Tahun Ajaran, Semester, Kelas, Enrollment, dll) */}
                    {/* Contoh: */}
                    {auth.user && hasAnyPermission(['academic-years index']) && (
                         <NavLink href={route('academic-years.index')} active={route().current('academic-years.index')} isSidebarExpanded={isNavExpanded} isMobile={isMobile} icon={IconCalendar}>Tahun Ajaran</NavLink>
                     )}
                    {/* {auth.user && hasAnyPermission(['semesters index']) && (
                         <NavLink href={route('semesters.index')} active={route().current('semesters.index')} isSidebarExpanded={isNavExpanded} isMobile={isMobile} icon={IconCalendarStats}>Semester</NavLink>
                     )} */}
                     {/* {auth.user && hasAnyPermission(['classes index']) && (
                         <NavLink href={route('classes.index')} active={route().current('classes.index')} isSidebarExpanded={isNavExpanded} isMobile={isMobile} icon={IconListDetails}>Kelas</NavLink>
                     )} */}
                     {/* {auth.user && hasAnyPermission(['enrollments index']) && (
                         <NavLink href={route('enrollments.index')} active={route().current('enrollments.index')} isSidebarExpanded={isNavExpanded} isMobile={isMobile} icon={IconSchool}>Enrollment</NavLink>
                     )} */}


                </nav> {/* === Akhir Bagian Navigasi === */}

            </div> {/* === Akhir Sidebar Kiri === */}

            {/* === Overlay Mobile === */}
            {/* Muncul saat mobile sidebar terbuka untuk menutup konten utama */}
            {/* Klik pada overlay akan menutup sidebar mobile */}
            {isMobile && isMobileSidebarOpen && ( // Tampilkan overlay hanya jika di mobile DAN sidebar mobile terbuka
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-25" // Fixed position, cover screen, z-index di bawah sidebar, background semi-transparan
                    onClick={toggleMobileSidebar} // Menutup sidebar mobile saat overlay diklik
                ></div>
            )} {/* === Akhir Overlay Mobile === */}


            {/* === Area Konten Utama === */}
            {/* Margin kiri dinamis agar konten utama tidak tertutup sidebar desktop */}
            {/* Gunakan className dinamis */}
            <div className={mainContentClasses}>

                {/* === Top Bar di Area Konten Utama (Header Halaman) === */}
                {/* Mengandung Tombol Toggle Sidebar Mobile, Judul Halaman, & Profil User */}
                <header className="w-full bg-white shadow"> {/* Background putih, shadow di bawah */}
                     <div className="flex items-center px-4 py-6 sm:px-6 lg:px-8"> {/* Padding horizontal responsif */}

                         {/* Tombol Buka Sidebar Mobile (Hanya di Mobile) */}
                         {isMobile && ( // Tampilkan tombol ini hanya jika di mobile
                            <button
                                onClick={toggleMobileSidebar} // Panggil handler untuk membuka sidebar mobile
                                className="-ms-2 mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none" // Styling tombol
                            >
                                 <IconMenu2 size={24} strokeWidth={1.5} /> {/* Ikon burger */}
                            </button>
                         )}

                        {/* Slot Judul Halaman */}
                         <div className="flex-1 px-2 sm:px-0"> {/* flex-1 agar memenuhi ruang, padding horizontal */}
                             {/* Konten dari prop 'header' halaman akan dirender di sini */}
                             {header}
                         </div>

                        {/* Pengaturan Pengguna (Molekul Dropdown) */}
                        {/* === Ini di HEADER Area Konten Utama === */}
                        {/* Tampil di semua ukuran dalam implementasi ini */}
                        <div className="ml-auto"> {/* ml-auto untuk dorong ke kanan maksimal */}
                             <Dropdown align="right" width="48"> {/* Gunakan komponen Dropdown Anda */}
                                 {/* Trigger Dropdown: Tombol dengan nama user dan ikon panah */}
                                  <Dropdown.Trigger> {/* Gunakan komponen Trigger Dropdown Anda */}
                                     <span className="inline-flex rounded-md">
                                         <button
                                             type="button"
                                             className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150" // Styling tombol trigger (nama user)
                                         >
                                             {/* Menampilkan nama user yang sedang login */}
                                             {user ? user.name : 'Guest'} {/* Tampilkan nama user jika ada */}

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
                                  <Dropdown.Content> {/* Gunakan komponen Content Dropdown Anda */}
                                     {/* Link ke halaman Profile */}
                                     <Dropdown.Link href={route('profile.edit')}>
                                         Profile
                                     </Dropdown.Link>
                                     {/* Link untuk Logout */}
                                     <Dropdown.Link
                                         href={route('logout')}
                                         method="post" // Penting untuk logout via POST
                                         as="button" // Render sebagai tombol agar bisa disubmit via POST
                                     >
                                         Log Out
                                     </Dropdown.Link>
                                  </Dropdown.Content>
                             </Dropdown>
                         </div>

                    </div>
                </header> {/* === Akhir Top Bar (Header Area Konten) === */}

                {/* Slot Konten Utama Halaman */}
                {/* Di sinilah prop 'children' (konten halaman spesifik) akan dirender */}
                <main className="flex-1 overflow-y-auto"> {/* flex-1 agar mengambil sisa ruang vertikal, overflow-y-auto agar bisa scroll jika konten melebihi tinggi */}
                    {children}
                </main> {/* === Akhir Konten Utama === */}

                {/* Footer Minimal (Hanya Copyright) */}
                {/* Gunakan tag footer dan kelas styling dasar */}
                <footer className="bg-white py-4 text-center mt-8"> {/* Contoh kelas: background putih, padding atas/bawah, teks di tengah, margin atas */}
                    {/* Gunakan container yang sesuai dengan layout Anda (misal, dari komponen Container atau div bawaan) */}
                    {/* Asumsi layout Anda menggunakan max-w-7xl mx-auto px-4/px-6/px-8 untuk konten utamanya */}
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Sesuaikan container footer jika perlu */}
                        {/* Konten copyright */}
                        {/* Sesuaikan kelas styling jika perlu agar cocok dengan tampilan layout Anda */}
                        <p className="text-gray-600 text-sm"> {/* Contoh kelas untuk warna dan ukuran teks */}
                                Copyright &copy;{new Date().getFullYear()} All rights reserved | made with <IconHeart size={16} strokeWidth={1.5} className="inline-block align-text-bottom" /> by <a href="https://t.me/jhanplv" target="_blank" className="text-blue-600 hover:underline" >jipi</a> @RPL SMKN 2 Subang {/* Ganti dengan teks kontribusi Anda */}
                        </p>
                        
                    </div>
                </footer> {/* === Akhir Footer === */}

            </div> {/* === Akhir Area Konten Utama === */}

            {/* Konten Navigasi Responsif Asli (jika sebelumnya ada di sini) - DIHAPUS */}
            {/* Implementasi sekarang menggunakan toggle sidebar utama */}
            {/* === Akhir Container Utama Flex === */}
        </div> 

    );
}

// --- Catatan Tambahan ---
// - Pastikan komponen NavLink.jsx dan ResponsiveNavLink.jsx (jika digunakan) sudah diupdate dengan styling dan menerima prop isSidebarExpanded dan isMobile.
// - Pastikan semua ikon dari @tabler/icons-react yang digunakan diimpor di bagian atas file ini.
// - Pastikan komponen ApplicationLogo, Dropdown (Trigger, Content, Link), Container, Card, FormGroup, TextInput, PrimaryButton, CancelButton, dll. Anda sudah ada dan berfungsi.
// - Utility hasAnyPermission.js harus bisa mengakses user login (misal, dengan menggunakan usePage().props.auth.user di dalamnya).
// - File ini hanya layout; konten spesifik setiap halaman (tabel, form, detail) datang dari prop 'children' yang dirender di dalam tag <main>.