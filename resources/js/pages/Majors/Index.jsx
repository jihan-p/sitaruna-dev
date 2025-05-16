// resources/js/Pages/Majors/Index.jsx

import React from 'react';
// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path import ini jika berbeda ===
// Import komponen layout dan tabel
import Container from '@/components/atoms/Container'; // === Sesuaikan path import ini jika berbeda ===
import Card from '@/components/organisms/Card';     // === Sesuaikan path import ini jika berbeda ===
import Table from '@/components/organisms/Table';   // === Sesuaikan path import ini jika berbeda ===
import Pagination from '@/components/molecules/Pagination'; // === Sesuaikan path import ini jika berbeda ===
import Search from '@/components/molecules/Search'; // === Sesuaikan path import ini jika berbeda (Opsional untuk Index Jurusan jika list kecil) ===
import AddButton from '@/components/molecules/AddButton'; // === Sesuaikan path import ini jika berbeda ===
import EditButton from '@/components/molecules/EditButton'; // === Sesuaikan path import ini jika berbeda ===
import DeleteButton from '@/components/molecules/DeleteButton'; // === Sesuaikan path import ini jika berbeda ===

// Import hook dan komponen dari Inertia
import { Head, Link, usePage } from '@inertiajs/react'; // Import Link jika Anda menggunakan Link native untuk Detail

// Import utility untuk cek permission
import hasAnyPermission from '@/utils/Permissions'; // === Pastikan path import ini benar ===

// Pastikan komponen-komponen atom/molecule/organism di atas sudah ada dan berfungsi sesuai kebutuhan Anda

export default function Index({auth}) { // Terima prop 'auth' dari Inertia
    // Ambil data 'majors' (hasil paginasi dari controller) dan 'filters' dari props Inertia
    // Data 'majors' dikirim dari MajorController@index
    const { majors, filters } = usePage().props;

    // Definisikan nama resource route yang digunakan di route() helper (sesuai web.php)
    const routeResourceName = 'majors';

    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout
            // Header halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Jurusan</h2>}
        >
            {/* Set title halaman di browser tab */}
            <Head title="Manajemen Jurusan" />

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}
                    {/* === Header Card: Judul, Search, Tombol Tambah === */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
                         <h3 className="text-lg font-semibold text-gray-800">Daftar Jurusan</h3>
                         {/* Container untuk Search dan Tombol Tambah */}
                         <div className="flex flex-col md:flex-row items-center gap-4">
                             {/* Search Component (Opsional untuk Jurusan jika listnya tidak terlalu panjang) */}
                             {/* Jika Anda ingin fitur search untuk Jurusan, uncomment dan sesuaikan */}
                             {/* <Search filters={filters} routeResourceName={routeResourceName} /> */}

                             {/* Tombol Tambah Jurusan - Tampilkan hanya jika user punya permission 'majors create' */}
                              {auth.user && hasAnyPermission([`${routeResourceName} create`]) && ( // Cek permission menggunakan template string `${routeResourceName} create`
                                 // Menggunakan komponen AddButton
                                 <AddButton url={route(`${routeResourceName}.create`)}>Tambah Jurusan</AddButton>
                             )}
                         </div>
                    </div> {/* === Akhir Header Card === */}

                    {/* === Tabel Komponen untuk Menampilkan Data Jurusan === */}
                    <Table> {/* Gunakan komponen Table Anda */}
                        <Table.Thead> {/* Header Tabel */}
                            <tr>
                                <Table.Th>No</Table.Th>
                                <Table.Th>Nama Jurusan</Table.Th>
                                {/* Tambahkan kolom header lain jika diperlukan (misal: Created At, dll) */}
                                <Table.Th>Aksi</Table.Th> {/* Kolom untuk tombol aksi (Edit, Delete) */}
                            </tr>
                        </Table.Thead>
                        <Table.Tbody> {/* Isi Tabel */}
                             {/* Cek apakah ada data Jurusan yang diterima */}
                            {majors && majors.data && majors.data.length > 0 ? (
                                 // Loop data Jurusan menggunakan .map()
                                majors.data.map((major, index) => (
                                    // Baris tabel untuk setiap Jurusan
                                    <tr key={major.id}> {/* Gunakan ID Jurusan sebagai key unik */}
                                        {/* Nomor urut baris, dihitung berdasarkan pagination */}
                                        <Table.Td>{majors.from + index}</Table.Td>
                                        {/* Menampilkan Nama Jurusan */}
                                        <Table.Td>{major.nama_jurusan}</Table.Td>
                                         {/* Tambahkan sel data lain jika ada kolom tambahan */}

                                        {/* Sel untuk tombol aksi */}
                                        <Table.Td>
                                            <div className="flex items-center gap-2"> {/* Flex container untuk menata tombol secara horizontal dengan jarak */}
                                                 {/* Tombol Detail (Opsional jika ada halaman Show) */}
                                                 {/* Jika Anda punya halaman Show untuk Jurusan dan ingin link di sini */}
                                                 {/* Pastikan Anda mengimpor Link dari Inertia jika menggunakan tag <Link> native */}
                                                 {/* Dan import ikon jika menggunakannya */}
                                                 {/* {auth.user && hasAnyPermission([`${routeResourceName} show`]) && // Cek permission
                                                    <Link href={route(`${routeResourceName}.show`, major.id)} title="Detail">
                                                         <IconListDetails size={20} className='text-blue-500 hover:text-blue-700'/> // Ganti dengan ikon Detail Anda
                                                     </Link>
                                                 } */}

                                                {/* Tombol Edit - Tampilkan hanya jika user punya permission 'majors edit' */}
                                                {auth.user && hasAnyPermission([`${routeResourceName} edit`]) && ( // Cek permission
                                                    // Menggunakan komponen EditButton
                                                     <EditButton url={route(`${routeResourceName}.edit`, major.id)}/> // Link ke route edit jurusan dengan ID major
                                                )}

                                                {/* Tombol Delete - Tampilkan hanya jika user punya permission 'majors delete' */}
                                                {auth.user && hasAnyPermission([`${routeResourceName} delete`]) && ( // Cek permission
                                                    // Menggunakan komponen DeleteButton
                                                     <DeleteButton url={route(`${routeResourceName}.destroy`, major.id)}/> // Link ke route destroy jurusan dengan ID major
                                                )}
                                            </div>
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <Table.Empty colSpan={3} message={'Data Jurusan tidak tersedia'}/>
                            )}
                        </Table.Tbody>
                    </Table> {/* === Akhir Tabel Komponen === */}

                    {/* === Komponen Pagination === */}
                    {/* Tampilkan pagination jika jumlah halaman lebih dari 1 */}
                    {majors && majors.last_page > 1 && (
                        <div className='flex items-center justify-center mt-4'> {/* Container untuk menengahkan pagination */}
                            <Pagination links={majors.links}/> {/* Menggunakan komponen Pagination */}
                        </div>
                    )} {/* === Akhir Komponen Pagination === */}

                </Card> {/* Akhir Card */}
            </Container> {/* Akhir Container */}

        </AuthenticatedLayout>
    );
}