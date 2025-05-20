import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';

import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import PrimaryButton from '@/components/molecules/PrimaryButton';
import TextInput from '@/components/atoms/TextInput';
import EditButton from '@/components/molecules/EditButton';
import DeleteButton from '@/components/molecules/DeleteButton';
import Pagination from '@/components/molecules/Pagination';
import AddButton from '@/components/molecules/AddButton';
import Table from '@/components/organisms/Table'; // Asumsi Anda memiliki komponen Table

import {
    IconEye,
    IconPencil,
    IconTrash,
    IconCalendarStats, // Ikon untuk menu Semester (opsional)
    IconPlus, // Ikon untuk tombol Tambah (opsional)
} from '@tabler/icons-react';

import hasAnyPermission from '@/utils/Permissions';


export default function Index({ auth, semesters, filters, perPage: initialPerPage }) {
    const { flash } = usePage().props;

    const { data, setData, get, processing, errors } = useForm({
        search: filters.search || '',
        perPage: initialPerPage || 10,
    });

    const handleSearchChange = (e) => {
        setData('search', e.target.value);
    };

    const handlePerPageChange = (e) => {
        setData('perPage', e.target.value);
    };

    useEffect(() => {
        get(route('semesters.index'), {
            data: {
                search: data.search,
                perPage: data.perPage,
            },
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [data.search, data.perPage]);


    const handleDelete = (semesterId) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Semester ini?')) {
             useForm().delete(route('semesters.destroy', semesterId), {
                 onSuccess: () => {
                 },
                 onError: (errors) => {
                     alert("Gagal menghapus data. Mungkin data ini sedang digunakan di modul lain.");
                 },
                 onFinish: () => {
                 }
            });
        } else {
        }
    };


    const routeResourceName = 'semesters';


    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Semester</h2>}
        >
            <Head title="Manajemen Semester" />

            <Container>
                {flash && (
                    <>
                        {flash.success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span className="block sm:inline">{flash.success}</span>
                            </div>
                        )}
                        {flash.error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span className="block sm:inline">{flash.error}</span>
                            </div>
                        )}
                    </>
                )}

                <div className='mb-4 flex flex-col md:flex-row items-center justify-between gap-4'>
                    {auth.user && hasAnyPermission([`${routeResourceName} create`]) && (
                         <AddButton url={route(`${routeResourceName}.create`)}>Tambah Semester</AddButton>
                    )}
                    <div className='w-full md:w-auto md:flex-1 flex flex-col sm:flex-row items-center gap-2'>
                        <TextInput
                            type="text"
                            placeholder="Cari Semester..."
                            value={data.search}
                            onChange={handleSearchChange}
                            className="block w-full sm:w-auto"
                        />
                        <select
                            value={data.perPage}
                            onChange={handlePerPageChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm block w-full sm:w-auto text-sm"
                        >
                            <option value="10">10 per halaman</option>
                            <option value="25">25 per halaman</option>
                            <option value="50">50 per halaman</option>
                            {semesters && semesters.total && (
                                <option value={semesters.total}>Semua ({semesters.total})</option>
                            )}
                        </select>
                    </div>
                </div>

                <Card>
                    <div className="overflow-x-auto shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">No</th>
                                    <th scope="col" className="px-6 py-3">Nama Semester</th>
                                    <th scope="col" className="px-6 py-3">Tahun Ajaran</th>
                                    <th scope="col" className="px-6 py-3">Aktif</th>
                                    <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semesters && semesters.data && semesters.data.length > 0 ? (
                                    semesters.data.map((semester, index) => (
                                        <tr key={semester.id} className="bg-white border-b hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {(semesters.current_page - 1) * semesters.per_page + index + 1}
                                            </th>
                                            <td className="px-6 py-4">{semester.nama_semester}</td>
                                            <td className="px-6 py-4">{semester.academic_year ? semester.academic_year.nama_tahun_ajaran : '-'}</td>
                                            <td className="px-6 py-4">{semester.is_active ? 'Ya' : 'Tidak'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    {auth.user && hasAnyPermission([`${routeResourceName} show`]) && (
                                                        <Link
                                                            href={route(`${routeResourceName}.show`, semester.id)}
                                                            className="inline-flex items-center px-2 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                            title="Detail"
                                                        >
                                                            <IconEye size={16} strokeWidth={2} />
                                                        </Link>
                                                    )}
                                                    {auth.user && hasAnyPermission([`${routeResourceName} edit`]) && (
                                                        <EditButton url={route(`${routeResourceName}.edit`, semester.id)} />
                                                    )}
                                                    {auth.user && hasAnyPermission([`${routeResourceName} delete`]) && (
                                                        <DeleteButton url={route(`${routeResourceName}.destroy`, semester.id)} />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data Semester.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {semesters && semesters.last_page > 1 && (
                        <div className='flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm text-gray-500'>
                            {semesters && (
                                <div>
                                    Menampilkan {semesters.from} hingga {semesters.to} dari {semesters.total} data Semester
                                </div>
                            )}
                            <Pagination links={semesters.links} />
                        </div>
                    )}
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
