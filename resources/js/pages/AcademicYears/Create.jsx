// resources/js/Pages/AcademicYears/Create.jsx

import React from 'react';
// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // Sesuaikan path layout Anda

// Import hook dan komponen dari Inertia
import { Head, useForm } from '@inertiajs/react'; // Tidak perlu usePage di halaman create karena tidak menerima props data awal

// Import komponen form dan styling Anda (sesuaikan path)
// === Pastikan path import komponen Anda sesuai dengan struktur proyek Anda ===
import Container from '@/components/atoms/Container'; // Sesuaikan path
import Card from '@/components/organisms/Card';     // Sesuaikan path
import FormGroup from '@/components/molecules/FormGroup'; // Sesuaikan path
import TextInput from '@/components/atoms/TextInput'; // Sesuaikan path
// Jika Anda punya komponen InputNumber atau SelectInput, impor di sini jika perlu
// import InputNumber from '@/components/atoms/InputNumber'; // Contoh
// =============================================================================

// Import komponen tombol submit dan batal
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Sesuaikan path
import CancelButton from '@/components/molecules/CancelButton'; // Sesuaikan path

// Utility untuk cek permission (jika digunakan untuk kondisi tampilan di form)
// import hasAnyPermission from '@/utils/Permissions'; // Sesuaikan path utility Anda


export default function Create({auth}) { // Terima prop 'auth' untuk layout
    // Gunakan useForm hook Inertia untuk manajemen state form, submit, dan error validasi
    const { data, setData, post, errors, processing, reset } = useForm({
        // === Inisialisasi state form dengan nilai kosong untuk setiap field input ===
        tahun_mulai: '',
        tahun_selesai: '',
        nama_tahun_ajaran: '',
        // =========================================================================
    });

    // Definisikan nama resource route (sesuai web.php)
    const routeResourceName = 'academic-years';

    // Handler saat form disubmit
    const handleStoreData = async (e) => {
        e.preventDefault();

        // Kirim data form (objek 'data' dari useForm) ke route store Tahun Ajaran (POST)
        post(route(`${routeResourceName}.store`), { // Link ke route 'academic-years.store'
            onSuccess: () => {
                 console.log("Data Tahun Ajaran berhasil ditambahkan!");
                 // Opsional: Reset form setelah berhasil submit
                 reset();
                 // Inertia akan otomatis redirect ke halaman index (sesuai logika controller)
            },
            onError: (errors) => {
                 console.error("Ada error saat menambahkan data Tahun Ajaran:", errors);
                 // Objek 'errors' dari useForm akan terisi dengan pesan error validasi dari backend
                 // Pesan error akan ditampilkan oleh komponen FormGroup jika prop error diisi
            },
            onFinish: () => {
                console.log("Proses submit form selesai.");
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout
            // Header halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Tahun Ajaran</h2>}
        >
            {/* Set judul halaman di browser tab */}
            <Head title="Tambah Tahun Ajaran" />

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}

                    {/* === Form HTML === */}
                    {/* Pasang handler onSubmit ke tag <form> */}
                    <form onSubmit={handleStoreData}>

                        {/* ==== INPUT FIELDS UNTUK DATA TAHUN AJARAN ==== */}
                        {/* Gunakan komponen FormGroup dan TextInput atau InputNumber */}
                        {/* Pastikan prop 'error' diisi dari object 'errors' useForm */}

                        {/* Input Tahun Mulai */}
                        <FormGroup label="Tahun Mulai" error={errors.tahun_mulai}>
                            <TextInput
                                id="tahun_mulai" // ID unik
                                name="tahun_mulai" // Name harus sesuai kolom DB
                                type="number" // Tipe input number untuk tahun
                                value={data.tahun_mulai} // Ambil nilai dari state useForm
                                onChange={e => setData('tahun_mulai', e.target.value)} // Update state useForm
                                placeholder="Input Tahun Mulai (ex: 2024)"
                                className="mt-1 block w-full" // Styling
                            />
                        </FormGroup>

                        {/* Input Tahun Selesai */}
                        <FormGroup label="Tahun Selesai" error={errors.tahun_selesai}>
                             <TextInput
                                id="tahun_selesai" // ID unik
                                name="tahun_selesai" // Name harus sesuai kolom DB
                                type="number" // Tipe input number
                                value={data.tahun_selesai} // Ambil nilai dari state useForm
                                onChange={e => setData('tahun_selesai', e.target.value)} // Update state useForm
                                placeholder="Input Tahun Selesai (ex: 2025)"
                                className="mt-1 block w-full" // Styling
                            />
                        </FormGroup>

                         {/* Input Nama Tahun Ajaran */}
                         <FormGroup label="Nama Tahun Ajaran" error={errors.nama_tahun_ajaran}>
                             <TextInput
                                id="nama_tahun_ajaran" // ID unik
                                name="nama_tahun_ajaran" // Name harus sesuai kolom DB
                                type="text" // Tipe input teks
                                value={data.nama_tahun_ajaran} // Ambil nilai dari state useForm
                                onChange={e => setData('nama_tahun_ajaran', e.target.value)} // Update state useForm
                                placeholder="Input Nama Tahun Ajaran (ex: 2024/2025)"
                                className="mt-1 block w-full" // Styling
                            />
                        </FormGroup>
                        {/* ============================================= */}


                        {/* ==== END INPUT FIELDS ==== */}


                        {/* === Area Tombol === */}
                        <div className='flex items-center gap-2 mt-4'> {/* Flex container untuk tombol */}
                            {/* Tombol submit form */}
                            <PrimaryButton type="submit" disabled={processing}> Simpan Data </PrimaryButton>

                            {/* Tombol kembali ke halaman index */}
                            <CancelButton url={route(`${routeResourceName}.index`)}> Kembali </CancelButton>
                        </div>
                        {/* ===================== */}
                    </form> {/* === Akhir Form HTML === */}

                </Card>
            </Container>

        </AuthenticatedLayout>
    );
}