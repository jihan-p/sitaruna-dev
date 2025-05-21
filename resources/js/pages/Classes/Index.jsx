// resources/js/Pages/Classes/Index.jsx

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

import { IconEye } from '@tabler/icons-react'; // Jika Anda ingin tombol detail

import hasAnyPermission from '@/utils/Permissions';


export default function Index({ auth, classes, filters, perPage: initialPerPage }) {
    const { flash } = usePage().props;

    const { data, setData, get } = useForm({
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
        get(route('classes.index'), {
            data: {
                search: data.search,
                perPage: data.perPage,
            },
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [data.search, data.perPage]);


    const handleDelete = (classId) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Kelas ini?')) {
            useForm().delete(route('classes.destroy', classId), {
                onSuccess: () => {
                    // Inertia akan otomatis me-render ulang halaman index
                },
                onError: (errors) => {
                    alert("Gagal menghapus data. Mungkin data ini sedang digunakan di modul lain.");
                },
            });
        }
    };


    const routeResourceName = 'classes';


    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Kelas</h2>}
        >
            <Head title={'Manajemen Kelas'}/>

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
                        <AddButton url={route(`${routeResourceName}.create`)}>Tambah Kelas</AddButton>
                    }
                    <div className='w-full md:w-auto md:flex-1 flex flex-col sm:flex-row items-center gap-2'>
                        <TextInput
                            type="text"
                            placeholder={'Cari kelas berdasarkan nama atau jurusan...'}
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
                            {classes && classes.total && (
                                <option value={classes.total}>Semua ({classes.total})</option>
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
                                    <th scope="col" className="px-6 py-3">Nama Kelas</th>
                                    <th scope="col" className="px-6 py-3">Jurusan</th>
                                    <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes && classes.data && classes.data.length > 0 ? (
                                    classes.data.map((classItem, index) => (
                                        <tr key={classItem.id} className="bg-white border-b hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {(classes.current_page - 1) * classes.per_page + index + 1}
                                            </th>
                                            <td className="px-6 py-4">{classItem.nama_kelas}</td>
                                            <td className="px-6 py-4">{classItem.major ? classItem.major.nama_jurusan : '-'}</td>
                                            <td className='px-6 py-4 text-right'>
                                                <div className='flex items-center justify-end gap-2'>
                                                    {/* Tombol Detail (Opsional) */}
                                                    {/* {auth.user && hasAnyPermission([`${routeResourceName} show`]) &&
                                                        <Link
                                                            href={route(`${routeResourceName}.show`, classItem.id)}
                                                            className="inline-flex items-center px-2 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                            title="Detail"
                                                        >
                                                            <IconEye size={16} strokeWidth={2} />
                                                        </Link>
                                                    } */}
                                                    {auth.user && hasAnyPermission([`${routeResourceName} edit`]) &&
                                                        <EditButton url={route(`${routeResourceName}.edit`, classItem.id)}/>
                                                    }
                                                    {auth.user && hasAnyPermission([`${routeResourceName} delete`]) &&
                                                        <DeleteButton url={route(`${routeResourceName}.destroy`, classItem.id)}/>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data Kelas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {classes && classes.last_page > 1 && (
                    <div className='flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm text-gray-500'>
                        <div>
                           Menampilkan {classes.from} hingga {classes.to} dari {classes.total} data Kelas
                        </div>
                        <Pagination links={classes.links}/>
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
