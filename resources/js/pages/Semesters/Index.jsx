// resources/js/Pages/Semesters/Index.jsx

import React, { useEffect } from 'react'; // Import useEffect jika perlu
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path layout Anda ===
import { Head, Link, usePage, useForm } from '@inertiajs/react'; // Import usePage dan useForm

// Import komponen styling/form Anda (sesuaikan path)
// === Pastikan path import komponen Anda sesuai dengan struktur proyek Anda ===
import Container from '@/components/atoms/Container'; // Sesuaikan path
import Card from '@/components/organisms/Card';     // Sesuaikan path
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Sesuaikan path (untuk tombol Tambah)
import CancelButton from '@/components/molecules/CancelButton';   // Sesuaikan path (opsional, jika tombol kembali pakai ini)
import TextInput from '@/components/atoms/TextInput'; // Sesuaikan path (untuk search input)
// Jika Anda punya komponen Table kustom, import di sini:
// import Table from '@/components/organisms/Table'; // Sesuaikan path
// =============================================================================

// Import utility untuk cek izin (pastikan path ini benar)
import hasAnyPermission from '@/utils/Permissions'; // === Sesuaikan path utility Anda ===


// Komponen halaman Index untuk Modul Semester
// Menerima prop 'auth' (dari layout), 'semesters' (objek data Semester dengan pagination dari controller),
// 'filters' (objek filter yang aktif dari controller), dan 'perPage' (nilai perPage yang aktif).
// Pastikan prop 'auth' diterima di sini.
export default function Index({ auth, semesters, filters, perPage: initialPerPage }) { // <--- Pastikan 'auth' diterima sebagai prop

    // Ambil flash messages dari props Inertia
    const { flash } = usePage().props;

    // Gunakan useForm untuk manajemen state form (di sini untuk filter dan pagination)
    const { data, setData, get, processing, errors } = useForm({
        search: filters.search || '',
        perPage: initialPerPage || 10,
    });


    // Handler untuk perubahan nilai pada input pencarian
    const handleSearchChange = (e) => {
        setData('search', e.target.value);
    };

    // Handler untuk perubahan nilai pada select jumlah item per halaman (perPage)
    const handlePerPageChange = (e) => {
        setData('perPage', e.target.value);
    };

    // useEffect hook untuk memicu Inertia GET visit (reload halaman dengan filter baru)
    useEffect(() => {
        console.log("Filter or perPage state changed, triggering Inertia GET visit...");
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


    // Handler untuk tombol Hapus data Semester
    const handleDelete = (semesterId) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Semester ini?')) {
            console.log(`Attempting to delete Semester with ID: ${semesterId}`);
             useForm().delete(route('semesters.destroy', semesterId), {
                 onSuccess: () => {
                     console.log("Data Semester berhasil dihapus!");
                 },
                 onError: (errors) => {
                     console.error("Ada error saat menghapus data Semester:", errors);
                     alert("Gagal menghapus data. Mungkin data ini sedang digunakan di modul lain.");
                 },
                 onFinish: () => {
                     console.log("Proses penghapusan selesai.");
                 }
            });
        } else {
            console.log("Penghapusan dibatalkan oleh user.");
        }
    };


    // Definisikan nama resource route untuk kemudahan
    const routeResourceName = 'semesters';


    return (
        <AuthenticatedLayout
            auth={auth} // <--- PERBAIKAN: Lewatkan seluruh objek 'auth' sebagai prop bernama 'auth'
            // Header halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Semester</h2>}
        >
            {/* Mengatur judul halaman di browser tab */}
            <Head title="Manajemen Semester" />

            <Container>
                <Card>

                    {/* === Area Flash Message (Dengan Pemeriksaan!) === */}
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

                    {/* === Area Kontrol Tabel (Tambah, Search, PerPage) === */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                        {/* Tombol Tambah (Create) - Tampil hanya jika user punya permission 'semesters create' */}
                        {auth.user && hasAnyPermission(['semesters create']) && (
                             <Link href={route(`${routeResourceName}.create`)}>
                                 <PrimaryButton>
                                     Tambah Semester
                                 </PrimaryButton>
                             </Link>
                        )}

                        {/* Area Pencarian dan PerPage */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 sm:mt-0">
                            {/* Input Pencarian */}
                            <TextInput
                                type="text"
                                placeholder="Cari Semester..."
                                value={data.search}
                                onChange={handleSearchChange}
                                className="block w-full sm:w-auto"
                            />

                            {/* Select PerPage */}
                             <select
                                value={data.perPage}
                                onChange={handlePerPageChange}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm block w-full sm:w-auto text-sm"
                             >
                                 <option value="10">10 per halaman</option>
                                 <option value="25">25 per halaman</option>
                                 <option value="50">50 per halaman</option>
                                 <option value={semesters.total}>Semua ({semesters.total})</option>
                             </select>
                        </div>
                    </div>

                    {/* === Area Tabel Daftar Semester === */}
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
                                {semesters.data.map((semester, index) => (
                                    <tr key={semester.id} className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {(semesters.current_page - 1) * semesters.per_page + index + 1}
                                        </th>
                                        <td className="px-6 py-4">{semester.nama_semester}</td>
                                        <td className="px-6 py-4">{semester.academic_year ? semester.academic_year.nama_tahun_ajaran : '-'}</td>
                                        <td className="px-6 py-4">{semester.is_active ? 'Ya' : 'Tidak'}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">

                                                {/* Tombol Edit - Tampil hanya jika user punya permission 'semesters edit' */}
                                                {auth.user && hasAnyPermission(['semesters edit']) && (
                                                     <Link
                                                        href={route(`${routeResourceName}.edit`, semester.id)}
                                                        className="font-medium text-blue-600 hover:underline"
                                                     >
                                                         Edit
                                                     </Link>
                                                )}

                                                {/* Tombol Hapus - Tampil hanya jika user punya permission 'semesters delete' */}
                                                {auth.user && hasAnyPermission(['semesters delete']) && (
                                                     <button
                                                        onClick={() => handleDelete(semester.id)}
                                                        className="font-medium text-red-600 hover:underline ml-2"
                                                     >
                                                         Hapus
                                                     </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {semesters.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data Semester.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* === Area Pagination === */}
                    {semesters.links.length > 3 && (
                         <nav className="flex items-center justify-between mt-4">
                            <div className="flex -space-x-px rounded-md shadow-sm">
                                {semesters.links.map((link) => (
                                     <Link
                                        key={link.label}
                                        href={link.url}
                                        className={`px-3 py-2 text-sm leading-tight border border-gray-300 ${
                                             link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState={true}
                                        preserveScroll={true}
                                    />
                                ))}
                            </div>
                         </nav>
                    )}

                </Card>
            </Container>

        </AuthenticatedLayout>
    );
}
