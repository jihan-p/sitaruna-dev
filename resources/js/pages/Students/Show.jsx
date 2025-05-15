// resources/js/Pages/Students/Show.jsx

import React from 'react';
// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path import ini jika berbeda ===

// Import hook Head dan komponen Link dari Inertia
import { Head, Link, usePage } from '@inertiajs/react'; // Import usePage untuk mengambil data student

// Import komponen styling Anda
// === Pastikan path import komponen Anda sesuai dengan struktur proyek Anda ===
import Container from '@/components/atoms/Container'; // <== CONTOH PATH: Sesuaikan jika berbeda
import Card from '@/components/organisms/Card';     // <== CONTOH PATH: Sesuaikan jika berbeda
// =============================================================================

// Import utility untuk cek permission (jika Anda menggunakannya)
// Pastikan baris import ini TIDAK dikomentari jika Anda menggunakan hasAnyPermission
import hasAnyPermission from '@/utils/Permissions'; // === Sesuaikan path import ini jika berbeda ===


export default function Show({ auth }) { // Terima prop 'auth' dari Inertia
    // Ambil data 'student' yang dikirim dari controller StudentController@show melalui props Inertia
    const { student } = usePage().props;

    // Definisikan nama resource route
    const routeResourceName = 'students'; // Sesuai dengan prefix route resource di web.php

    // Helper untuk format jenis kelamin
    const formatJenisKelamin = (jenis_kelamin) => {
        if (jenis_kelamin === 'L') return 'Laki-laki';
        if (jenis_kelamin === 'P') return 'Perempuan';
        return '-'; // Tampilkan '-' jika null atau kosong
    };

    // Helper untuk format tanggal lahir
    const formatTanggalLahir = (tanggal_lahir) => {
         // student.tanggal_lahir diharapkan dalam format string YYYY-MM-DD dari backend
        if (!tanggal_lahir) return '-'; // Tampilkan '-' jika null atau kosong
        try {
            // Buat objek Date dari string tanggal
            const date = new Date(tanggal_lahir);
             // Cek validitas tanggal
            if (isNaN(date.getTime())) {
                return '-'; // Tampilkan '-' jika tanggal tidak valid
            }
            // Format tanggal ke 'dd bulan(lengkap) yyyy' (misal: 14 September 2005)
            return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        } catch (e) {
            console.error("Error formatting date:", e);
            return '-'; // Tampilkan '-' jika terjadi error format
        }
    };


    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout (jika dibutuhkan di layout)
            // Header halaman (muncul di top bar layout)
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Peserta Didik</h2>}
        >
            {/* Mengatur judul halaman di browser tab */}
            {/* Menampilkan nama siswa di judul halaman Detail */}
            <Head title={`Detail Peserta Didik: ${student.nama_lengkap}`} />

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}
                    {/* === Area untuk Menampilkan Detail Siswa === */}
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Informasi Lengkap Peserta Didik</h3>

                        {/* Tampilkan field-field data siswa dalam layout grid responsif */}
                        {/* grid-cols-1 di mobile, md:grid-cols-2 di layar medium ke atas, gap-4 untuk jarak antar item grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Tampilkan Foto Profil jika ada */}
                            {student.foto_profil && (
                                <div className="md:col-span-2 flex justify-center md:justify-start">
                                    <div> {/* Wrapper tambahan jika perlu menata label dan gambar bersamaan */}
                                        <strong>Foto Profil:</strong>
                                        {/* Tag <img> untuk menampilkan gambar */}
                                        <img
                                            // URL gambar, pastikan path '/storage/' benar untuk akses file publik dari storage/app/public
                                            src={`/storage/${student.foto_profil}`} // === Sesuaikan path ini jika file storage Anda diakses dengan URL berbeda ===
                                            alt={`Foto Profil ${student.nama_lengkap}`} // Teks alternatif untuk aksesibilitas
                                            // === Kelas styling untuk gambar agar responsif dan ukurannya terkontrol ===
                                            className="mt-2 w-full max-w-sm md:max-w-xs lg:max-w-sm h-auto object-cover rounded-md shadow"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Tampilkan field data lainnya */}
                            {/* Gunakan || '-' untuk menampilkan tanda hubung jika data dari database null atau kosong */}
                            <p><strong>NISN:</strong> {student.nisn || '-'}</p>
                            <p><strong>NIT:</strong> {student.nit || '-'}</p>
                            <p><strong>Nama Lengkap:</strong> {student.nama_lengkap || '-'}</p>
                            {/* Menggunakan helper untuk format jenis kelamin */}
                            <p><strong>Jenis Kelamin:</strong> {formatJenisKelamin(student.jenis_kelamin)}</p>
                            <p><strong>Tempat Lahir:</strong> {student.tempat_lahir || '-'}</p>
                            {/* Menggunakan helper untuk format tanggal lahir */}
                            <p><strong>Tanggal Lahir:</strong> {formatTanggalLahir(student.tanggal_lahir)}</p>
                            <p><strong>Agama:</strong> {student.agama || '-'}</p>
                            <p><strong>No. HP:</strong> {student.no_hp || '-'}</p>
                            <p><strong>Email:</strong> {student.email || '-'}</p>
                            {/* Menampilkan Alamat - bisa jadi panjang, pastikan layout menanganinya */}
                            {/* Jika Alamat sangat panjang, mungkin perlu layout yang berbeda atau scrollbar */}
                            <p className="md:col-span-2"><strong>Alamat:</strong> {student.alamat || '-'}</p> {/* Opsional: buat alamat mengambil 2 kolom di md+ */}
                            <p><strong>Status:</strong> {student.status_akun || '-'}</p>

                            {/* Tampilkan data relasi di sini jika Anda memuatnya di controller */}
                            {/* Contoh jika Anda memuat relasi 'enrollments' dan relasi 'class', 'academic_year', 'semester' di dalamnya */}
                            {/* Pastikan relasi ini dimuat di StudentController@show dengan eager loading ->with('enrollments.class', 'enrollments.academic_year', 'enrollments.semester') */}
                            {/* {student.enrollments && student.enrollments.length > 0 && (
                                <div className="md:col-span-2 mt-6"> // Ambil 2 kolom di md+ dan beri margin atas
                                    <h4 className="text-md font-semibold mb-2">Riwayat Enrollment</h4>
                                    <ul>
                                        {student.enrollments.map(enrollment => (
                                            // Gunakan enrollment.id sebagai key unik untuk list item
                                            <li key={enrollment.id}>
                                                Kelas: {enrollment.class?.nama_kelas || '-'}, // Gunakan ?. untuk akses aman
                                                Tahun Ajaran: {enrollment.academic_year?.tahun || '-'},
                                                Semester: {enrollment.semester?.nama_semester || '-'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}

                             {/* Opsional: Tampilkan created_at dan updated_at */}
                            {/* <div className="md:col-span-2 mt-6 text-sm text-gray-500">
                                <p><strong>Dibuat Pada:</strong> {student.created_at ? new Date(student.created_at).toLocaleString('id-ID') : '-'}</p>
                                <p><strong>Diperbarui Pada:</strong> {student.updated_at ? new Date(student.updated_at).toLocaleString('id-ID') : '-'}</p>
                            </div> */}


                        </div> {/* Akhir grid layout */}
                    </div> {/* Akhir Area Detail Siswa */}

                    {/* === Area Tombol === */}
                    {/* Gunakan flexbox untuk menata tombol secara responsif */}
                    {/* p-6 bg-white: padding dan background */}
                    {/* flex flex-col: tumpuk vertikal di mobile */}
                    {/* md:flex-row: tata horizontal di layar medium ke atas */}
                    {/* justify-center: tengahkan konten (tombol) secara horizontal di mobile */}
                    {/* md:justify-end: geser konten (tombol) ke kanan di layar medium ke atas */}
                    {/* gap-2: beri jarak 0.5rem (8px) antar item flex (tombol) */}
                    <div className="p-6 bg-white flex flex-col md:flex-row justify-center md:justify-end gap-2">

                        {/* Tombol Kembali ke Daftar Siswa */}
                        {/* Menggunakan komponen Link dari Inertia */}
                        <Link
                            href={route('students.index')} // Link ke route 'students.index'
                            // === Kelas Styling Tombol Kembali ===
                            // inline-flex items-center justify-center: buat tombol inline-block dan tengahkan konten (teks/ikon)
                            // px-4 py-2: padding horizontal dan vertikal
                            // bg-gray-200: background abu-abu muda
                            // border border-transparent: border transparan
                            // rounded-md: sudut membulat medium
                            // font-semibold text-xs uppercase tracking-widest: styling teks (semi-bold, extra small, uppercase, spasi antar huruf)
                            // text-gray-800: warna teks abu-abu gelap
                            // hover:bg-gray-300: ubah background saat hover
                            // focus:outline-none focus:ring-2 ...: styling saat fokus (untuk aksesibilitas)
                            // transition ease-in-out duration-150: animasi transisi smooth
                            // w-full: ambil lebar penuh di mobile
                            // md:w-auto: lebar otomatis (sesuai konten) di layar medium ke atas
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full md:w-auto"
                             // Kelas 'mr-2' dihapus karena 'gap-2' pada parent flex container yang mengatur jarak
                        >
                            Kembali ke Daftar
                        </Link>

                        {/* Tombol Edit (Opsional, hanya tampil jika user punya permission 'students edit') */}
                        {/* Menggunakan hasAnyPermission() untuk cek apakah user memiliki izin 'students edit' */}
                        {/* Pastikan Anda mengimpor utility hasAnyPermission jika menggunakannya */}
                        {auth.user && hasAnyPermission(['students edit']) && (
                            // Menggunakan komponen Link dari Inertia
                            <Link
                                href={route('students.edit', student.id)} // Link ke route 'students.edit' dengan parameter ID siswa
                                // === Kelas Styling Tombol Edit (contoh warna kuning) ===
                                // Styling mirip dengan tombol Kembali, hanya beda warna background
                                className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full md:w-auto"
                            >
                                Edit
                            </Link>
                        )}
                    </div> {/* Akhir Area Tombol */}
                    {/* ===================== */}
                </Card> {/* Akhir Card */}
            </Container> {/* Akhir Container */}

        </AuthenticatedLayout>
    );
}