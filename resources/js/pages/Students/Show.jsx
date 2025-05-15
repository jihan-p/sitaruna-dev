// resources/js/Pages/Students/Show.jsx

import React from 'react';
// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // Sesuaikan path jika berbeda
import { Head, Link } from '@inertiajs/react';
// Import komponen styling Anda
import Container from '@/components/atoms/Container'; // Sesuaikan path
import Card from '@/components/organisms/Card'; // Sesuaikan path

import hasAnyPermission from '@/utils/Permissions';

export default function Show({ auth, student }) {
    // student prop berisi data siswa dari controller

    return (
        <AuthenticatedLayout
            user={auth.user}
            // Header halaman (muncul di top bar layout)
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Peserta Didik</h2>}
        >
            {/* Mengatur judul halaman di browser tab */}
            <Head title={`Detail Peserta Didik: ${student.nama_lengkap}`} />

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}
                    {/* === Area untuk Menampilkan Detail Siswa === */}
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Informasi Lengkap Peserta Didik: {student.nama_lengkap}</h3>

                        {/* Tampilkan field-field data siswa */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Contoh layout grid */}
                            {/* Tampilkan Foto Profil jika ada */}
                            {student.foto_profil && (
                                // Gunakan flex dan justify-center untuk menengahkan di layar kecil
                                // md:justify-start untuk menggeser ke kiri di layar medium ke atas (jika di dalam grid md:col-span-2)
                                <div className="md:col-span-2 flex justify-center md:justify-start"> {/* Flex container */}
                                    <div> {/* Wrapper untuk konten (label dan gambar) */}
                                        <strong>Foto Profil:</strong>
                                        <img
                                            src={`/storage/${student.foto_profil}`} // === Sesuaikan path ini jika file storage Anda diakses dengan URL berbeda ===
                                            alt={`Foto Profil ${student.nama_lengkap}`}
                                            // === Sesuaikan kelas ukuran gambar agar responsif ===
                                            // Contoh: Lebar penuh (w-full) di mobile, dengan max-width berbeda di breakpoint (sm, md, lg)
                                            className="mt-2 w-full max-w-sm md:max-w-xs lg:max-w-sm h-auto rounded-md shadow" // <-- Contoh penyesuaian ukuran
                                            // max-w-sm: max lebar di layar >= sm, md:max-w-xs: override di layar >= md, lg:max-w-sm: override di layar >= lg
                                        />
                                    </div>
                                </div>
                            )}

                            <p><strong>NISN:</strong> {student.nisn || '-'}</p> {/* Gunakan || '-' jika data bisa null/kosong */}
                            <p><strong>NIT:</strong> {student.nit || '-'}</p>
                            <p><strong>Jenis Kelamin:</strong> {student.jenis_kelamin === 'L' ? 'Laki-laki' : (student.jenis_kelamin === 'P' ? 'Perempuan' : '-')}</p> {/* Tampilkan L/P sebagai teks penuh */}
                            <p><strong>Tempat Lahir:</strong> {student.tempat_lahir || '-'}</p>
                            {/* Format tanggal_lahir jika tidak null/kosong */}
                            <p><strong>Tanggal Lahir:</strong> {student.tanggal_lahir ? new Date(student.tanggal_lahir).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</p> {/* Contoh format tanggal */}
                            <p><strong>Agama:</strong> {student.agama || '-'}</p>
                            <p><strong>No. HP:</strong> {student.no_hp || '-'}</p>
                            <p><strong>Email:</strong> {student.email || '-'}</p>
                            <p><strong>Alamat:</strong> {student.alamat || '-'}</p>
                            <p><strong>Status Akun:</strong> {student.status_akun || '-'}</p>

                            {/* Tampilkan data relasi di sini jika Anda memuatnya di controller */}
                            {/* Contoh jika Anda memuat enrollments: */}
                            {/* {student.enrollments && student.enrollments.length > 0 && (
                                <div className="md:col-span-2 mt-6">
                                    <h4 className="text-md font-semibold mb-2">Riwayat Enrollment</h4>
                                    <ul>
                                        {student.enrollments.map(enrollment => (
                                            <li key={enrollment.id}>
                                                Kelas: {enrollment.class?.nama_kelas || '-'},
                                                Tahun Ajaran: {enrollment.academic_year?.tahun || '-'},
                                                Semester: {enrollment.semester?.nama_semester || '-'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}

                        </div>
                    </div>
                    {/* === Area Tombol === */}
                    {/* === Sesuaikan kelas styling tombol agar responsif === */}
                    {/* Menggunakan flexbox untuk menata tombol secara responsif */}
                    <div className="p-6 bg-white flex flex-col md:flex-row justify-center md:justify-end gap-2"> {/* Flex container untuk tombol */}
                        {/* flex-col: tumpuk vertikal di mobile; md:flex-row: tata horizontal di md+ */}
                        {/* justify-center: tengahkan di mobile; md:justify-end: geser ke kanan di md+ */}
                        {/* gap-2: beri jarak antar item flex (tombol) */}

                        {/* Tombol Kembali ke Daftar Siswa */}
                        <Link
                            href={route('students.index')}
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full md:w-auto" // Tambah justify-center agar teks di tengah tombol, dan w-full di mobile, w-auto di md+
                            // Kelas 'mr-2' dihapus karena 'gap-2' di parent flex container yang mengatur jarak antar tombol
                        >
                            Kembali ke Daftar
                        </Link>

                        {/* Tombol Edit (Opsional, hanya tampil jika user punya permission 'students edit') */}
                        {auth.user && hasAnyPermission(['students edit']) && // Menggunakan hasAnyPermission untuk cek izin
                            <Link
                                href={route('students.edit', student.id)} // Link ke route edit siswa ini
                                className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150 w-full md:w-auto" // Tambah justify-center, w-full di mobile, w-auto di md+
                            >
                                Edit
                            </Link>
                        }
                    </div>
                </Card>
            </Container>

        </AuthenticatedLayout>
    );
}