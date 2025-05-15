// resources/js/Pages/Students/Index.jsx

import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // Pastikan path import ini benar
import Container from '@/components/atoms/Container'; // Pastikan path import ini benar
import Card from '@/components/organisms/Card'; // Pastikan path import ini benar
import Table from '@/components/organisms/Table'; // Pastikan komponen Table ada
import Pagination from '@/components/molecules/Pagination'; // Pastikan komponen Pagination ada
import Search from '@/components/molecules/Search'; // Pastikan komponen Search ada
import AddButton from '@/components/molecules/AddButton'; // Pastikan komponen AddButton ada
import EditButton from '@/components/molecules/EditButton'; // Pastikan komponen EditButton ada
import DeleteButton from '@/components/molecules/DeleteButton'; // Pastikan komponen DeleteButton ada

import { Head, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/utils/Permissions'; // Pastikan path import ini benar

// Pastikan komponen-komponen atom/molecule/organism di atas sudah ada dan berfungsi sesuai kebutuhan Anda

export default function Index({auth}) {
    // Ambil data 'students' (hasil paginasi dari controller) dan 'filters' dari props
    const { students, filters } = usePage().props;

    // Definisikan nama resource route yang digunakan di route() helper
    const routeResourceName = 'students';

    return (
        <AuthenticatedLayout
            user={auth.user}
            // Header halaman ini
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Data Peserta Didik</h2>}
        >
            {/* Set title halaman di browser tab */}
            <Head title={'Data Peserta Didik'}/>

            {/* Container untuk konten utama */}
            <Container>
                {/* Bagian Header Halaman (Tombol Tambah & Search) */}
                <div className='mb-4 flex flex-col md:flex-row items-center justify-between gap-4'>
                    {/* Tombol Tambah Data */}
                    {/* Tampilkan tombol hanya jika user punya permission 'students create' */}
                    {auth.user && hasAnyPermission([`${routeResourceName} create`]) &&
                        <AddButton url={route(`${routeResourceName}.create`)}/> // Link ke route 'students.create'
                    }
                    {/* Komponen Search */}
                    <div className='w-full md:w-auto md:flex-1'> {/* Sesuaikan lebar search */}
                        <Search
                            url={route(`${routeResourceName}.index`)} // Route index 'students'
                            placeholder={'Cari peserta didik berdasarkan nama, NISN, NIT...'} // Placeholder yang relevan
                            filter={filters.search} // Ambil nilai filter search
                        />
                    </div>
                </div>

                {/* Card yang membungkus Tabel Data */}
                <Card>
                    {/* Komponen Tabel */}
                    <Table>
                        {/* Header Tabel */}
                        <Table.Thead>
                            <tr>
                                {/* Sesuaikan Header Kolom Tabel */}
                                <Table.Th>NISN</Table.Th>
                                <Table.Th>NIT</Table.Th>
                                <Table.Th>Nama Lengkap</Table.Th>
                                <Table.Th>Jenis Kelamin</Table.Th>
                                <Table.Th>Status Akun</Table.Th>
                                <Table.Th className='text-right'>Aksi</Table.Th> {/* Kolom Aksi (Edit, Delete) */}
                            </tr>
                        </Table.Thead>
                        {/* Body Tabel */}
                        <Table.Tbody>
                            {/* Cek apakah data students ada dan tidak kosong */}
                            {students && students.data && students.data.length > 0 ? (
                                // Loop melalui setiap item (student) dalam data paginasi
                                students.data.map((student) => (
                                    <tr key={student.id}> {/* Gunakan student.id sebagai key unik untuk setiap baris */}
                                        {/* Tampilkan data di setiap kolom sesuai header */}
                                        <Table.Td>{student.nisn}</Table.Td>
                                        <Table.Td>{student.nit}</Table.Td>
                                        <Table.Td>{student.nama_lengkap}</Table.Td>
                                        <Table.Td>{student.jenis_kelamin}</Table.Td>
                                        <Table.Td>{student.status_akun}</Table.Td>
                                        {/* Kolom Aksi */}
                                        <Table.Td className='text-right'>
                                            <div className='flex items-center justify-end gap-2'>
                                                {/* Tombol Edit */}
                                                {/* Tampilkan tombol hanya jika user punya permission 'students edit' */}
                                                {auth.user && hasAnyPermission([`${routeResourceName} edit`]) &&
                                                    <EditButton url={route(`${routeResourceName}.edit`, student.id)}/> // Link ke route 'students.edit' dengan ID siswa
                                                }
                                                {/* Tombol Delete */}
                                                {/* Tampilkan tombol hanya jika user punya permission 'students delete' */}
                                                {auth.user && hasAnyPermission([`${routeResourceName} delete`]) &&
                                                    <DeleteButton url={route(`${routeResourceName}.destroy`, student.id)}/> // Link ke route 'students.destroy' dengan ID siswa
                                                }
                                            </div>
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <Table.Empty colSpan={6} message={'Data Peserta Didik tidak tersedia'}/> 
                            )}
                        </Table.Tbody>
                    </Table>
                </Card>

                {/* Komponen Pagination */}
                {/* Tampilkan pagination jika jumlah halaman lebih dari 1 */}
                {students && students.last_page > 1 && (
                    <div className='flex items-center justify-center mt-4'>
                        <Pagination links={students.links}/>
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}