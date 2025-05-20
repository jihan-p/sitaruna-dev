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
import Search from '@/components/molecules/Search';
import AddButton from '@/components/molecules/AddButton';
import Table from '@/components/organisms/Table';

import {
    IconEye,
    IconPencil,
    IconTrash,
    IconUsersGroup,
    IconPlus,
} from '@tabler/icons-react';

import hasAnyPermission from '@/utils/Permissions';


export default function Index({ auth, students, filters, perPage: initialPerPage }) {

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
        get(route('students.index'), {
            data: {
                search: data.search,
                perPage: data.perPage,
            },
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [data.search, data.perPage]);


    const handleDelete = (studentId) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Peserta Didik ini?')) {
             useForm().delete(route('students.destroy', studentId), {
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


    const routeResourceName = 'students';


    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Peserta Didik</h2>}
        >
            <Head title={'Manajemen Peserta Didik'}/>

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
                    {auth.user && hasAnyPermission([`${routeResourceName} create`]) &&
                        <AddButton url={route(`${routeResourceName}.create`)}/>
                    }
                    <div className='w-full md:w-auto md:flex-1 flex flex-col sm:flex-row items-center gap-2'>
                         <TextInput
                            type="text"
                            placeholder={'Cari peserta didik berdasarkan nama, NISN, NIT...'}
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
                             {students && students.total && (
                                 <option value={students.total}>Semua ({students.total})</option>
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
                                    <th scope="col" className="px-6 py-3">NISN</th>
                                    <th scope="col" className="px-6 py-3">NIT</th>
                                    <th scope="col" className="px-6 py-3">Nama Lengkap</th>
                                    <th scope="col" className="px-6 py-3">Jenis Kelamin</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students && students.data && students.data.length > 0 ? (
                                    students.data.map((student, index) => (
                                        <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {(students.current_page - 1) * students.per_page + index + 1}
                                            </th>
                                            <td className="px-6 py-4">{student.nisn}</td>
                                            <td className="px-6 py-4">{student.nit}</td>
                                            <td className="px-6 py-4">{student.nama_lengkap}</td>
                                            <td className="px-6 py-4">{student.jenis_kelamin}</td>
                                            <td className="px-6 py-4">{student.status_akun}</td>
                                            <td className='px-6 py-4 text-right'>
                                                <div className='flex items-center justify-end gap-2'>
                                                    {auth.user && hasAnyPermission([`${routeResourceName} show`]) &&
                                                        <Link
                                                            href={route(`${routeResourceName}.show`, student.id)}
                                                            className="inline-flex items-center px-2 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                            title="Detail"
                                                        >
                                                            <IconEye size={16} strokeWidth={2} />
                                                        </Link>
                                                    }
                                                    {auth.user && hasAnyPermission([`${routeResourceName} edit`]) &&
                                                        <EditButton url={route(`${routeResourceName}.edit`, student.id)}/>
                                                    }
                                                    {auth.user && hasAnyPermission([`${routeResourceName} delete`]) &&
                                                        <DeleteButton url={route(`${routeResourceName}.destroy`, student.id)}/>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data Peserta Didik.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {students && students.last_page > 1 && (
                    <div className='flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm text-gray-500'>
                        <div>
                           Menampilkan {students.from} hingga {students.to} dari {students.total} data Peserta Didik
                        </div>
                        <Pagination links={students.links}/>
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
