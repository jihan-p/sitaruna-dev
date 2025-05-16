// resources/js/Pages/AcademicYears/Index.jsx

import React, { useEffect } from 'react'; // Import useEffect jika perlu
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path layout Anda ===
import { Head, Link, usePage, useForm } from '@inertiajs/react'; // Import usePage dan useForm

// Import komponen styling/form Anda (sesuaikan path)
// === Pastikan path import komponen Anda sesuai dengan struktur proyek Anda ===
import Container from '@/components/atoms/Container'; // Sesuaikan path
import Card from '@/components/organisms/Card';     // Sesuaikan path
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Sesuaikan path
import CancelButton from '@/components/molecules/CancelButton';   // Sesuaikan path (opsional, jika tombol kembali pakai ini)
import TextInput from '@/components/atoms/TextInput'; // Sesuaikan path (untuk search input)
// Jika Anda punya komponen Table kustom, import di sini:
// import Table from '@/components/organisms/Table'; // Sesuaikan path
// =============================================================================

// Import utility untuk cek izin (pastikan path ini benar)
import hasAnyPermission from '@/utils/Permissions'; // === Sesuaikan path utility Anda ===


// Komponen halaman Index untuk Modul Tahun Ajaran
export default function Index({ auth, academicYears, filters, perPage: initialPerPage }) {

    // Ambil flash messages dari props Inertia
    // usePage().props berisi semua data yang dikirim ke halaman Inertia saat ini
    // 'flash' adalah key standar Inertia untuk flash messages dari sesi Laravel
    const { flash } = usePage().props; // Ini sudah benar, flash bisa undefined jika tidak ada pesan

    // Gunakan useForm untuk manajemen state form (di sini untuk filter dan pagination)
    // useForm menyimpan state dan secara otomatis menangani pengiriman data via GET/POST/PUT/DELETE
    // data: object yang berisi state form
    // setData: fungsi untuk mengupdate state data
    // get: method untuk mengirim GET request (digunakan untuk filter dan pagination)
    // processing: boolean, true jika request sedang berjalan
    // errors: object, berisi error validasi dari backend (biasanya untuk form POST/PUT)
    const { data, setData, get, processing, errors } = useForm({
        search: filters.search || '', // State untuk input pencarian (inisialisasi dari filter props atau string kosong)
        perPage: initialPerPage || 10, // State untuk jumlah item per halaman (inisialisasi dari props atau default 10)
    });


    // Handler untuk perubahan nilai pada input pencarian
    const handleSearchChange = (e) => {
        setData('search', e.target.value); // Update state 'search' useForm
        // Perubahan state 'search' akan memicu useEffect di bawah
    };

    // Handler untuk perubahan nilai pada select jumlah item per halaman (perPage)
    const handlePerPageChange = (e) => {
        setData('perPage', e.target.value); // Update state 'perPage' useForm
        // Perubahan state 'perPage' akan memicu useEffect di bawah
    };

    // useEffect hook untuk memicu Inertia GET visit (reload halaman dengan filter baru)
    // Efek ini akan berjalan setiap kali nilai data.search atau data.perPage berubah
    useEffect(() => {
        console.log("Filter or perPage state changed, triggering Inertia GET visit..."); // Log untuk debug
        // Gunakan method get() dari useForm untuk mengirim request GET ke route index saat ini
        // Parameter pertama adalah route, parameter kedua adalah konfigurasi visit
        get(route('academic-years.index'), { // Route ke halaman index Tahun Ajaran (pastikan nama route benar)
            data: { // Kirim state data useForm (search dan perPage) sebagai query parameters di URL
                search: data.search,
                perPage: data.perPage,
            },
            // Konfigurasi visit Inertia (penting untuk pengalaman pengguna)
            preserveState: true, // Mempertahankan state komponen React saat navigasi (agar input/select tidak reset)
            preserveScroll: true, // Mempertahankan posisi scroll halaman
            replace: true, // Mengganti entri terakhir di histori browser (untuk menghindari duplikasi saat filter/pagination)
        });
    }, [data.search, data.perPage]); // Dependency array: effect akan berjalan ulang saat data.search atau data.perPage berubah


    // Handler untuk tombol Hapus data Tahun Ajaran
    const handleDelete = (academicYearId) => {
        // Tampilkan konfirmasi sebelum menghapus
        if (confirm('Apakah Anda yakin ingin menghapus data Tahun Ajaran ini?')) {
            console.log(`Attempting to delete AcademicYear with ID: ${academicYearId}`); // Log untuk debug
            // Gunakan useForm untuk mengirim request DELETE
            // Membuat form sementara dengan metode DELETE dan mengirimkannya ke route destroy
             useForm().delete(route('academic-years.destroy', academicYearId), { // Route ke controller@destroy dengan ID
                 onSuccess: () => {
                     console.log("Data Tahun Ajaran berhasil dihapus!");
                     // Inertia akan otomatis me-render ulang halaman index setelah berhasil delete
                     // Flash message 'success' akan tampil jika dikirim dari controller redirect
                 },
                 onError: (errors) => {
                     console.error("Ada error saat menghapus data Tahun Ajaran:", errors);
                     // Errors akan tersedia di objek errors dari useForm. Anda bisa menampilkan notifikasi di sini.
                     alert("Gagal menghapus data. Mungkin data ini sedang digunakan di modul lain."); // Contoh alert sederhana
                 },
                 onFinish: () => {
                     console.log("Proses penghapusan selesai.");
                 }
            });
        } else {
            console.log("Penghapusan dibatalkan oleh user."); // Log jika user membatalkan
        }
    };


    // Definisikan nama resource route untuk kemudahan
    const routeResourceName = 'academic-years'; // Sesuaikan dengan prefix route resource di web.php


    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout (jika dibutuhkan di layout untuk permission check di menu)
            // Header halaman (muncul di top bar layout)
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Tahun Ajaran</h2>}
        >
            {/* Mengatur judul halaman di browser tab */}
            <Head title="Manajemen Tahun Ajaran" />

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}

                    {/* === Area Flash Message (Dengan Pemeriksaan!) === */}
                    {/* Menampilkan pesan sukses atau error dari controller */}
                    {/* Memeriksa apakah objek 'flash' ada (!flash) sebelum mengakses propertinya */}
                    {flash && ( // <--- Pemeriksaan: Pastikan 'flash' tidak undefined
                        <> {/* Menggunakan React Fragment jika ada lebih dari satu jenis pesan flash */}
                            {flash.success && ( // <--- Error terjadi di baris ini (atau dekat sini) jika 'flash' undefined
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <span className="block sm:inline">{flash.success}</span>
                                </div>
                            )}
                            {flash.error && ( // <--- Atau di baris ini jika 'flash' undefined
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <span className="block sm:inline">{flash.error}</span>
                                </div>
                            )}
                            {/* Tambahkan jenis flash message lain jika Anda menggunakannya (misal: 'warning', 'info') */}
                            {/*
                            {flash.warning && ( ... )}
                            {flash.info && ( ... )}
                            */}
                        </>
                    )}
                    {/* ======================================== */}

                    {/* === Area Kontrol Tabel (Tambah, Search, PerPage) === */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4"> {/* Flex container untuk menata item */}
                        {/* flex-col: tumpuk vertikal di mobile; sm:flex-row: tata horizontal di sm+ */}
                        {/* items-center: Pusatkan item vertikal; justify-between: Beri ruang antara item */}

                        {/* Tombol Tambah (Create) - Tampil hanya jika user punya permission 'academic-years create' */}
                        {auth.user && hasAnyPermission(['academic-years create']) && ( // Cek permission menggunakan utility
                             <Link href={route(`${routeResourceName}.create`)}> {/* Link ke route create Tahun Ajaran */}
                                {/* Gunakan komponen PrimaryButton Anda */}
                                 <PrimaryButton>
                                     Tambah Tahun Ajaran
                                 </PrimaryButton>
                             </Link>
                        )}

                        {/* Area Pencarian dan PerPage */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 sm:mt-0"> {/* Flex container untuk search dan perPage */}
                            {/* mt-4 / sm:mt-0: margin atas di mobile, 0 di sm+ */}
                            {/* gap-2: jarak antar item */}

                            {/* Input Pencarian */}
                            {/* Gunakan komponen TextInput Anda */}
                            <TextInput
                                type="text"
                                placeholder="Cari Tahun Ajaran..."
                                value={data.search} // Value input dari state useForm
                                onChange={handleSearchChange} // Handler perubahan input
                                className="block w-full sm:w-auto" // Styling lebar input
                            />

                            {/* Select PerPage */}
                            {/* Gunakan elemen <select> standar atau komponen SelectInput Anda */}
                             <select
                                value={data.perPage} // Value select dari state useForm
                                onChange={handlePerPageChange} // Handler perubahan select
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm block w-full sm:w-auto text-sm" // Styling select
                             >
                                 <option value="10">10 per halaman</option>
                                 <option value="25">25 per halaman</option>
                                 <option value="50">50 per halaman</option>
                                 {/* Opsional: Opsi untuk menampilkan semua data (tidak direkomendasikan untuk data besar) */}
                                 <option value={academicYears.total}>Semua ({academicYears.total})</option>
                             </select>
                        </div>
                    </div>
                    {/* ================================================== */}

                    {/* === Area Tabel Daftar Tahun Ajaran === */}
                    {/* Gunakan komponen Table Anda jika ada, atau gunakan struktur HTML tabel standar */}
                    <div className="overflow-x-auto shadow-sm sm:rounded-lg"> {/* Tambahkan styling shadow dan rounded */}
                        <table className="w-full text-sm text-left text-gray-500"> {/* Styling tabel */}
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50"> {/* Styling header tabel */}
                                <tr>
                                    <th scope="col" className="px-6 py-3">No</th>
                                    <th scope="col" className="px-6 py-3">Nama Tahun Ajaran</th> {/* Contoh Kolom */}
                                    <th scope="col" className="px-6 py-3">Tahun Mulai</th> {/* Contoh Kolom */}
                                    <th scope="col" className="px-6 py-3">Tahun Selesai</th> {/* Contoh Kolom */}
                                    <th scope="col" className="px-6 py-3 text-right">Aksi</th> {/* Kolom untuk tombol Edit/Hapus */}
                                </tr>
                            </thead><tbody>
                                {academicYears.data.map((academicYear, index) => (
                                    <tr key={academicYear.id} className="bg-white border-b hover:bg-gray-50"> {/* Styling baris */}
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {/* Nomor urut = (Current Page - 1) * PerPage + Index Baris + 1 */}
                                            {(academicYears.current_page - 1) * academicYears.per_page + index + 1}
                                        </th>
                                        <td className="px-6 py-4">{academicYear.nama_tahun_ajaran}</td> {/* Tampilkan Nama Tahun Ajaran */}
                                        <td className="px-6 py-4">{academicYear.tahun_mulai}</td> {/* Tampilkan Tahun Mulai */}
                                        <td className="px-6 py-4">{academicYear.tahun_selesai}</td> {/* Tampilkan Tahun Selesai */}
                                        <td className="px-6 py-4 text-right">
                                            {/* Tombol Aksi (Edit & Hapus) */}
                                            <div className="flex justify-end items-center gap-2"> {/* Gunakan flex untuk menata tombol */}

                                                {/* Tombol Edit - Tampil hanya jika user punya permission 'academic-years edit' */}
                                                {auth.user && hasAnyPermission(['academic-years edit']) && ( // Cek permission menggunakan utility
                                                     <Link
                                                        href={route(`${routeResourceName}.edit`, academicYear.id)} // Link ke route edit Tahun Ajaran ini dengan passing ID
                                                        className="font-medium text-blue-600 hover:underline" // Styling link
                                                     >
                                                         Edit
                                                     </Link>
                                                )}

                                                {/* Tombol Hapus - Tampil hanya jika user punya permission 'academic-years delete' */}
                                                {auth.user && hasAnyPermission(['academic-years delete']) && ( // Cek permission menggunakan utility
                                                     <button
                                                        onClick={() => handleDelete(academicYear.id)} // Panggil handler delete dengan ID
                                                        className="font-medium text-red-600 hover:underline ml-2" // Styling tombol, ml-2 beri jarak dari Edit
                                                        // Opsional: Tambahkan disabled={processing} jika ingin menonaktifkan saat request hapus berjalan
                                                     >
                                                         Hapus
                                                     </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {/* Tampilkan pesan jika tidak ada data */}
                                {academicYears.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data Tahun Ajaran.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* ========================================== */}

                    {/* === Area Pagination === */}
                    {/* Tampilkan link pagination jika ada lebih dari 1 halaman (biasanya links.length > 3 karena ada link prev, 1, next) */}
                    {academicYears.links.length > 3 && ( // Periksa apakah ada cukup link pagination
                         <nav className="flex items-center justify-between mt-4"> {/* Styling pagination */}
                             {/* Container link pagination */}
                            <div className="flex -space-x-px rounded-md shadow-sm">
                                {/* Loop (map) link pagination dari academicYears.links */}
                                {academicYears.links.map((link) => (
                                    // Menggunakan <Link> dari Inertia untuk navigasi antar halaman pagination
                                     <Link
                                        key={link.label} // Gunakan label link sebagai key (unik)
                                        href={link.url} // URL halaman pagination
                                        // Tentukan class aktif dan disabled
                                        className={`px-3 py-2 text-sm leading-tight border border-gray-300 ${
                                             link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700' // Styling aktif dan tidak aktif
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`} // Styling disabled jika tidak ada URL (Prev/Next di ujung)
                                        dangerouslySetInnerHTML={{ __html: link.label }} // Render label HTML (untuk &laquo; Prev dan &raquo; Next)
                                        preserveState={true} // Pertahankan state search/perPage saat klik pagination
                                        preserveScroll={true} // Pertahankan posisi scroll
                                    />
                                ))}
                            </div>
                         </nav>
                    )}
                    {/* ========================= */}

                </Card>
            </Container>

        </AuthenticatedLayout>
    );
}