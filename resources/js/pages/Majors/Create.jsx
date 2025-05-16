// resources/js/Pages/Majors/Create.jsx

import React from 'react';
// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path import ini jika berbeda ===

// Import hook dan komponen dari Inertia
import { Head, useForm } from '@inertiajs/react'; // Tidak perlu usePage di halaman create karena tidak menerima props data awal

// Import komponen form dan styling yang Anda miliki (sesuaikan path importnya)
// === Pastikan path import komponen Anda sesuai dengan struktur proyek Anda ===
import Container from '@/components/atoms/Container'; // <== CONTOH PATH: Sesuaikan jika berbeda
import Card from '@/components/organisms/Card';     // <== CONTOH PATH: Sesuaikan jika berbeda
import FormGroup from '@/components/molecules/FormGroup'; // <== CONTOH PATH: Sesuaikan jika berbeda
import TextInput from '@/components/atoms/TextInput'; // <== CONTOH PATH: Sesuaikan jika berbeda
// Jika ada komponen SelectInput/TextAreaInput atau lainnya, impor di sini
// =============================================================================

// Import komponen tombol submit dan batal
import PrimaryButton from '@/components/molecules/PrimaryButton'; // === Pastikan path import ini benar ===
import CancelButton from '@/components/molecules/CancelButton'; // === Pastikan path import ini benar ===

// Utility untuk cek permission (jika digunakan di sini, misal untuk kondisi tampilan tertentu)
// import hasAnyPermission from '@/utils/Permissions'; // === Sesuaikan path import ini jika berbeda ===


export default function Create({auth}) { // Terima prop 'auth' dari Inertia (untuk layout)
    // Gunakan useForm hook Inertia untuk manajemen state form dan submit
    const { data, setData, post, errors, processing, reset } = useForm({ // Tambahkan 'reset' jika perlu mereset form
        // === Inisialisasi state form dengan nilai kosong untuk kolom 'nama_jurusan' ===
        nama_jurusan: '',
        // ===========================================================================
        // Berdasarkan migrasi, form Tambah Jurusan hanya perlu input 'nama_jurusan'.
        // Kolom 'id', timestamps diatur otomatis.
        // 'major_id' tidak ada di tabel majors itu sendiri.
    });

    // Definisikan nama resource route yang digunakan di route() helper (sesuai web.php)
    const routeResourceName = 'majors';

    // Handler saat form disubmit untuk menyimpan data baru
    const handleStoreData = async (e) => {
        e.preventDefault();

        // Kirim data form (objek 'data' dari useForm) ke route store majors
        // Menggunakan post() dari useForm
        post(route(`${routeResourceName}.store`), { // Link ke route 'majors.store' (misal: /majors)
            // Callback saat request berhasil
            onSuccess: () => {
                 console.log("Data Jurusan berhasil ditambahkan!");
                 // Opsional: Reset form atau redirect ke halaman index/lain
                 reset(); // Contoh: mereset form setelah berhasil
                 // Inertia.visit(route(`${routeResourceName}.index`)); // Contoh: redirect ke halaman index
            },
            // Callback saat request mengalami error validasi atau error lain dari backend
            onError: (errors) => {
                 console.error("Ada error saat menambahkan data Jurusan:", errors);
                 // Objek 'errors' dari useForm akan otomatis terisi dengan pesan error validasi dari Laravel
            },
             // Callback setelah request selesai (sukses atau error)
            onFinish: () => {
                console.log("Proses submit form selesai.");
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout (jika dibutuhkan)
            // Header halaman (muncul di top bar layout)
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Jurusan</h2>}
        >
            {/* Set title halaman di browser tab */}
            <Head title={'Tambah Jurusan'}/>

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}
                    {/* === Form HTML === */}
                    {/* Pasang handler onSubmit ke tag <form> */}
                    <form onSubmit={handleStoreData}>
                        {/* ==== INPUT FIELD UNTUK DATA JURUSAN ==== */}
                        {/* Berdasarkan migrasi, hanya ada satu field input: 'nama_jurusan' */}
                        {/* Gunakan komponen FormGroup untuk label dan penanganan error */}
                        {/* Gunakan komponen TextInput untuk input field */}
                        {/* Pastikan prop 'error' diisi dari object 'errors' useForm untuk menampilkan pesan error validasi */}

                        {/* Input Nama Jurusan */}
                        <FormGroup label={'Nama Jurusan'} error={errors.nama_jurusan}>
                            <TextInput
                                id="nama_jurusan" // ID harus unik di halaman
                                name="nama_jurusan" // Penting: nama input harus sama dengan nama kolom di DB dan state useForm
                                type={'text'} // Tipe input teks biasa
                                value={data.nama_jurusan} // Ambil nilai dari state 'data' useForm
                                onChange={e => setData('nama_jurusan', e.target.value)} // Update state 'data' saat input berubah
                                placeholder="Input Nama Jurusan.." // Teks placeholder di input field
                                className="mt-1 block w-full" // Kelas styling Anda
                                // Props lain jika ada (misal: required, disabled, dll.)
                            />
                        </FormGroup>
                        {/* ======================================= */}


                        {/* ==== END INPUT FIELDS ==== */}


                        {/* === Area Tombol === */}
                        {/* Container untuk menata tombol submit dan batal */}
                        <div className='flex items-center gap-2 mt-4'> {/* Gunakan flexbox, beri jarak antar item (gap-2), margin atas (mt-4) */}
                            {/* Tombol submit form */}
                            {/* type="submit" agar terpicu saat form disubmit */}
                            {/* disabled={processing} untuk menonaktifkan tombol saat form sedang diproses */}
                            <PrimaryButton type={'submit'} disabled={processing}> Simpan Data </PrimaryButton>

                            {/* Tombol kembali ke halaman index Jurusan */}
                            {/* Menggunakan komponen CancelButton atau Link Inertia */}
                            <CancelButton url={route(`${routeResourceName}.index`)}> Kembali </CancelButton> {/* url={...} prop untuk link kembali */}
                        </div>
                        {/* ===================== */}
                    </form> {/* === Akhir Form HTML === */}
                </Card> {/* Akhir Card */}
            </Container> {/* Akhir Container */}

        </AuthenticatedLayout>
    );
}