import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import Table from '@/components/organisms/Table';
import Pagination from '@/components/molecules/Pagination';
import TextInput from '@/components/atoms/TextInput';
import AddButton from '@/components/molecules/AddButton';
import EditButton from '@/components/molecules/EditButton';
import DeleteButton from '@/components/molecules/DeleteButton';

import { Head, Link, usePage, useForm } from '@inertiajs/react';

import { IconEye } from '@tabler/icons-react';

import hasAnyPermission from '@/utils/Permissions';


export default function Index({ auth, majors, filters, perPage: initialPerPage }) {
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
        get(route('majors.index'), {
            data: {
                search: data.search,
                perPage: data.perPage,
            },
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [data.search, data.perPage]);


    const handleDelete = (majorId) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Jurusan ini?')) {
             useForm().delete(route('majors.destroy', majorId), {
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


    const routeResourceName = 'majors';


    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Jurusan</h2>}
        >
            <Head title="Manajemen Jurusan" />

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
                        <AddButton url={route(`${routeResourceName}.create`)}>Tambah Jurusan</AddButton>
                    )}
                     <div className='w-full md:w-auto md:flex-1 flex flex-col sm:flex-row items-center gap-2'>
                         <TextInput
                            type="text"
                            placeholder={'Cari jurusan berdasarkan nama...'}
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
                             {majors && majors.total && (
                                 <option value={majors.total}>Semua ({majors.total})</option>
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
                                    <th scope="col" className="px-6 py-3">Nama Jurusan</th>
                                    <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {majors && majors.data && majors.data.length > 0 ? (
                                    majors.data.map((major, index) => (
                                        <tr key={major.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                                {(majors.current_page - 1) * majors.per_page + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{major.nama_jurusan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                     {/* {auth.user && hasAnyPermission([`${routeResourceName} show`]) && (
                                                        <Link
                                                            href={route(`${routeResourceName}.show`, major.id)}
                                                            className="inline-flex items-center px-2 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                            title="Detail"
                                                        >
                                                            <IconEye size={16} strokeWidth={2} />
                                                        </Link>
                                                     )} */}


                                                    {auth.user && hasAnyPermission([`${routeResourceName} edit`]) && (
                                                         <EditButton url={route(`${routeResourceName}.edit`, major.id)}/>
                                                    )}

                                                    {auth.user && hasAnyPermission([`${routeResourceName} delete`]) && (
                                                         <DeleteButton url={route(`${routeResourceName}.destroy`, major.id)}/>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data Jurusan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {majors && majors.last_page > 1 && (
                    <div className='flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm text-gray-500'>
                        <div>
                           Menampilkan {majors.from} hingga {majors.to} dari {majors.total} data Jurusan
                        </div>
                        <Pagination links={majors.links}/>
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
