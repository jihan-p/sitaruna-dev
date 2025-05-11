// resources/js/Pages/Roles/Index.jsx (Setelah disesuaikan agar hanya menampilkan Assigned Permissions dan logika super-admin)

import React from 'react';
// Import template
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // Import template (Langkah 10)
// Import komponen lain yang mungkin tetap di Components (sesuaikan jika dipindah)
import Container from '@/components/atoms/Container'; // Import atom Container

// Import organisme Card dan komponen Table dari lokasi Atomic Design
import Card from '@/components/organisms/Card'; // Mengimpor organisme Card (Langkah 7)
import Table from '@/components/organisms/Table'; // Mengimpor organisme Table (Langkah 7)

// Import molekul (Langkah 1 atau lainnya)
import Pagination from '@/components/molecules/Pagination';
import Search from '@/components/molecules/Search';
// Import molekul Button spesifik (dari Langkah 1)
import AddButton from '@/components/molecules/AddButton'; // Mengganti Button type="add"
import EditButton from '@/components/molecules/EditButton'; // Mengganti Button type="edit"
import DeleteButton from '@/components/molecules/DeleteButton'; // Mengganti Button type="delete"


import { Head, usePage } from '@inertiajs/react';
// Utilitas tetap di Utils
import hasAnyPermission from '@/utils/Permissions'; // Pastikan path ini benar (huruf kecil)


export default function Index({auth}) {

    // destruct roles dan filters dari usepage props
    // Data 'permissions' (semua permission) tidak dibutuhkan di sini untuk tampilan tabel
    const { roles, filters } = usePage().props;


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Roles</h2>} // Sesuaikan header
        >
            <Head title={'Roles'}/>
            <Container> {/* Menggunakan atom Container */}
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['roles create']) &&
                        // Gunakan molekul AddButton (mengganti Button type="add")
                        <AddButton url={route('roles.create')}/>
                    }
                    <div className='w-full md:w-4/6'>
                        {/* Gunakan molekul Search */}
                        <Search url={route('roles.index')} placeholder={'Search roles data by name...'} filter={filters}/>
                    </div>
                </div>

                {/* Gunakan organisme Card untuk membungkus tabel */}
                <Card title={'Roles'}> {/* Menggunakan Card organisme */}
                    {/* Gunakan organisme Table */}
                    <Table>
                        {/* Menggunakan sub-komponen Thead dari Organisme Table */}
                        <Table.Thead>{<tr><Table.Th>#</Table.Th><Table.Th>Role Name</Table.Th><Table.Th>Permissions</Table.Th>{/* Judul kolom Permissions */}<Table.Th className='text-right'>Action</Table.Th>{/* Kolom Action */}</tr>}</Table.Thead>
                        {/* Menggunakan sub-komponen Tbody dari Organisme Table */}
                        <Table.Tbody>
                            {/* Mapping data role ke baris tabel */}
                            {/* Memeriksa apakah roles.data ada dan memiliki elemen */}
                            {roles && roles.data && roles.data.length > 0 ? (
                                roles.data.map((role, i) => (
                                    // Menggunakan elemen tr dasar untuk setiap baris data
                                    // Gunakan ID role sebagai key jika tersedia, fallback ke index
                                    <tr key={role.id || i}><Table.Td>{roles.from + i}</Table.Td>{/* Menggunakan 'from' dari data paginasi */}<Table.Td>{role.name}</Table.Td>{/* <-- Sel data untuk Permissions (menggabungkan logika super-admin) --> */}<Table.Td>
                                             <div className="flex items-center gap-2 flex-wrap">
                                                {/* Logika spesifik: Jika role adalah 'super-admin', tampilkan 'all-permissions' */}
                                                {role.name === "super-admin" ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700">
                                                        all-permissions
                                                    </span>
                                                ) : (
                                                    // Jika bukan 'super-admin', tampilkan izin yang dimiliki role
                                                    // Memeriksa apakah role.permissions ada dan merupakan array
                                                    role.permissions && Array.isArray(role.permissions) && role.permissions.map(
                                                        (permission, permIndex) => ( // Gunakan index terpisah untuk key badge permission
                                                            <span
                                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700"
                                                                key={permission.id || permission.name || permIndex} // Key unik untuk setiap badge permission
                                                            >
                                                                {/* Tampilkan nama permission */}
                                                                {permission.name}
                                                            </span>
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </Table.Td>{/* <-- Akhir sel Permissions --> */}{/* <-- Sel data untuk Tombol Aksi --> */}<Table.Td className='text-right'>
                                            {/* Container untuk tombol aksi */}
                                            <div className='flex items-center justify-end gap-2'>
                                                {/* Tombol Edit (menggunakan molekul EditButton, mengganti Button type="edit") */}
                                                {hasAnyPermission(['roles edit']) && (
                                                     <EditButton url={route('roles.edit', role.id)}/>
                                                )}
                                                {/* Tombol Delete (menggunakan molekul DeleteButton, mengganti Button type="delete") */}
                                                 {hasAnyPermission(['roles delete']) && (
                                                     <DeleteButton url={route('roles.destroy', role.id)}/>
                                                 )}
                                            </div>
                                        </Table.Td>{/* <-- Akhir sel Action --> */}</tr>
                                ))
                            ) : (
                                // Menampilkan pesan Empty jika tidak ada data
                                // colSpan harus sesuai dengan jumlah kolom di header (sekarang 4)
                                <Table.Empty colSpan={4} message={'No data available'}> {/* colSpan 4: #, Role Name, Permissions, Action */}
                                    {/* Opsional: tambahkan ikon atau elemen lain di sini */}
                                </Table.Empty>
                            )}
                        </Table.Tbody>
                    </Table>
                </Card> {/* Penutup Card organisme */}

                {/* Bagian bawah: Pagination (menggunakan molekul) */}
                {/* Menampilkan Pagination hanya jika ada lebih dari 1 halaman */}
                {roles && roles.last_page > 1 && (
                    <div className='flex items-center justify-center mt-4'>
                        {/* Menggunakan molekul Pagination */}
                        <Pagination links={roles.links}/>
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
