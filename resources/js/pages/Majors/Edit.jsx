// resources/js/Pages/Majors/Edit.jsx

import React from 'react';
// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path import ini jika berbeda ===

// Import hook useForm dan usePage dari Inertia
import { Head, useForm, usePage } from '@inertiajs/react'; // usePage untuk mengambil props 'major'

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

// Utility untuk cek permission (jika digunakan di sini)
// import hasAnyPermission from '@/utils/Permissions'; // === Sesuaikan path import ini jika berbeda ===


export default function Edit({auth}) { // Terima prop 'auth' dari Inertia
    // Ambil data 'major' yang dikirim dari controller MajorController@edit melalui props Inertia
    const { major } = usePage().props;

    // Gunakan useForm hook Inertia untuk manajemen state form dan submit
    // === Inisialisasi state form dengan nilai data 'major' yang ada ===
    const { data, setData, post, errors, processing } = useForm({
        // Isi state dengan data Jurusan yang diterima dari props 'major'
        // Gunakan || '' untuk handle nilai null dari database jika memungkinkan
        nama_jurusan: major.nama_jurusan || '', // Menggunakan nilai dari major.nama_jurusan jika ada, atau string kosong
        // ===========================================================================
        // Tambahkan field lain jika ada kolom yang bisa diedit di tabel majors

        // === Penting: Menandakan metode HTTP yang sebenarnya adalah PUT untuk update resource ===
        // Inertia akan mengirimkan permintaan POST, tetapi Laravel akan menginterpretasikannya sebagai PUT
        _method: 'put',
    });

    // Definisikan nama resource route yang digunakan di route() helper (sesuai web.php)
    const routeResourceName = 'majors';

    // Handler saat form disubmit untuk update data
    const handleUpdateData = async (e) => {
        e.preventDefault();

        // Kirim data form (objek 'data' dari useForm) ke route update majors
        // Menggunakan post() dari useForm
        // Route update memerlukan ID Jurusan yang akan diupdate
        post(route(`${routeResourceName}.update`, major.id), { // Link ke route 'majors.update' dengan ID major
            // Callback saat request berhasil
            onSuccess: () => {
                 console.log("Data Jurusan berhasil diperbarui!");
                 // Opsional: Redirect ke halaman index atau halaman show major setelah update
                 // Inertia.visit(route(`${routeResourceName}.index`)); // Contoh: redirect ke halaman index
                 // Inertia.visit(route(`${routeResourceName}.show`, major.id)); // Contoh: redirect ke halaman detail major ini (jika ada halaman Show)
            },
            // Callback saat request mengalami error validasi atau error lain dari backend
            onError: (errors) => {
                 console.error("Ada error saat memperbarui data Jurusan:", errors);
                 // Objek 'errors' dari useForm akan otomatis terisi dengan pesan error validasi dari Laravel
            },
             // Callback setelah request selesai (sukses atau error)
            onFinish: () => {
                console.log("Proses submit form update selesai.");
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout
            // Header halaman (muncul di top bar layout)
            // Tampilkan nama jurusan di header halaman Edit
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Jurusan: {major.nama_jurusan}</h2>}
        >
            {/* Set title halaman di browser tab */}
             {/* Tampilkan nama jurusan di title halaman Edit */}
            <Head title={`Edit Jurusan: ${major.nama_jurusan}`}/>

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}
                    {/* === Form HTML === */}
                    {/* Pasang handler onSubmit ke tag <form> */}
                    {/* Penting: Gunakan POST dengan _method: 'put' untuk update dengan file upload,
                        tapi karena Jurusan tidak ada file, POST/PUT biasa pun bisa.
                        Kita pakai POST dengan _method:'put' untuk konsistensi dengan cara Inertia menangani form update. */}
                    <form onSubmit={handleUpdateData}>
                        {/* ==== INPUT FIELD UNTUK DATA JURUSAN ==== */}
                        {/* Berdasarkan migrasi, hanya ada satu field input yang bisa diedit: 'nama_jurusan' */}
                        {/* Gunakan komponen FormGroup untuk label dan penanganan error */}
                        {/* Gunakan komponen TextInput untuk input field */}
                        {/* Pastikan prop 'error' diisi dari object 'errors' useForm untuk menampilkan pesan error validasi */}

                        {/* Input Nama Jurusan */}
                        <FormGroup label={'Nama Jurusan'} error={errors.nama_jurusan}>
                            <TextInput
                                id="nama_jurusan" // ID harus unik di halaman
                                name="nama_jurusan" // Penting: nama input harus sama dengan nama kolom di DB dan state useForm
                                type={'text'} // Tipe input teks biasa
                                value={data.nama_jurusan} // === Ambil nilai DARI STATE 'data' useForm (yang sudah diisi dari prop 'major') ===
                                onChange={e => setData('nama_jurusan', e.target.value)} // Update state 'data' saat input berubah
                                placeholder="Input Nama Jurusan.." // Teks placeholder
                                className="mt-1 block w-full capitalize" // Kelas styling Anda
                                // Props lain jika ada (misal: required, disabled, readonly, dll.)
                            />
                        </FormGroup>
                        {/* ======================================= */}


                        {/* ==== END INPUT FIELDS ==== */}


                        {/* === Area Tombol === */}
                        {/* Container untuk menata tombol submit dan batal */}
                        <div className='flex items-center gap-2 mt-4'> {/* Gunakan flexbox, beri jarak antar item (gap-2), margin atas (mt-4) */}
                            {/* Tombol submit form update */}
                            {/* type="submit" agar terpicu saat form disubmit */}
                            {/* disabled={processing} untuk menonaktifkan tombol saat form sedang diproses */}
                            <PrimaryButton type={'submit'} disabled={processing}> Simpan Perubahan </PrimaryButton>

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