import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import PrimaryButton from '@/components/molecules/PrimaryButton';
import TextInput from '@/components/atoms/TextInput';
import EditButton from '@/components/molecules/EditButton';
import DeleteButton from '@/components/molecules/DeleteButton';
import Pagination from '@/components/molecules/Pagination';
import hasAnyPermission from '@/utils/Permissions';


export default function Index({ auth, academicYears, filters, perPage: initialPerPage }) {
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
        get(route('academic-years.index'), {
            data: {
                search: data.search,
                perPage: data.perPage,
            },
            preserveState: true,
            replace: true,
        });
    }, [data.search, data.perPage]);


    const routeResourceName = 'academic-years';

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Tahun Ajaran</h2>}
        >
            <Head title="Manajemen Tahun Ajaran" />

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
                        <Link href={route(`${routeResourceName}.create`)}>
                            <PrimaryButton>Tambah Tahun Ajaran</PrimaryButton>
                        </Link>
                    )}
                    <div className='w-full md:w-auto md:flex-1 flex flex-col sm:flex-row items-center gap-2'>
                        <TextInput
                            type="text"
                            placeholder="Cari Tahun Ajaran..."
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
                            {academicYears && academicYears.total && (
                                <option value={academicYears.total}>Semua ({academicYears.total})</option>
                            )}
                        </select>
                    </div>
                </div>

                <Card title="Daftar Tahun Ajaran">
                    <div className="overflow-x-auto shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">No</th>
                                    <th scope="col" className="px-6 py-3">Nama Tahun Ajaran</th>
                                    <th scope="col" className="px-6 py-3">Tahun Mulai</th>
                                    <th scope="col" className="px-6 py-3">Tahun Selesai</th>
                                    <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicYears && academicYears.data && academicYears.data.length > 0 ? (
                                    academicYears.data.map((academicYear, index) => (
                                        <tr key={academicYear.id} className="bg-white border-b hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {(academicYears.current_page - 1) * academicYears.per_page + index + 1}
                                            </th>
                                            <td className="px-6 py-4">{academicYear.nama_tahun_ajaran}</td>
                                            <td className="px-6 py-4">{academicYear.tahun_mulai}</td>
                                            <td className="px-6 py-4">{academicYear.tahun_selesai}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    {auth.user && hasAnyPermission([`${routeResourceName} edit`]) && (
                                                        <EditButton url={route(`${routeResourceName}.edit`, academicYear.id)} />
                                                    )}
                                                    {auth.user && hasAnyPermission([`${routeResourceName} delete`]) && (
                                                        <DeleteButton url={route(`${routeResourceName}.destroy`, academicYear.id)} />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data Tahun Ajaran.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className='flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm text-gray-500'>
                    {academicYears && (
                        <div>
                            Menampilkan {academicYears.from} hingga {academicYears.to} dari {academicYears.total} data Tahun Ajaran
                        </div>
                    )}
                    {academicYears && academicYears.last_page > 1 && (
                        <Pagination links={academicYears.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
