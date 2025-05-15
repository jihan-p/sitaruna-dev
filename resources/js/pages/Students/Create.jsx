// resources/js/Pages/Students/Create.jsx

import React from 'react';
// Import komponen DatePicker dan CSS-nya
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import file CSS DatePicker

// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path import ini jika berbeda ===

import { Head, useForm, usePage } from '@inertiajs/react';

// Import komponen form dan styling yang Anda miliki (sesuaikan path importnya)
// === Pastikan path import komponen Anda sesuai dengan struktur proyek Anda ===
import Container from '@/components/atoms/Container'; // <== CONTOH PATH: Sesuaikan jika berbeda
import Card from '@/components/organisms/Card';     // <== CONTOH PATH: Sesuaikan jika berbeda
import FormGroup from '@/components/molecules/FormGroup'; // <== CONTOH PATH: Sesuaikan jika berbeda
import TextInput from '@/components/atoms/TextInput'; // <== CONTOH PATH: Sesuaikan jika berbeda
// Jika Anda punya komponen SelectInput kustom, impor di sini:
// import SelectInput from '@/components/atoms/SelectInput'; // <== CONTOH PATH: Sesuaikan jika berbeda
// Jika Anda punya komponen TextAreaInput kustom, impor di sini:
// import TextAreaInput from '@/components/atoms/TextAreaInput'; // <== CONTOH PATH: Sesuaikan jika berbeda
// =============================================================================

import PrimaryButton from '@/components/molecules/PrimaryButton'; // === Pastikan path import ini benar ===
import CancelButton from '@/components/molecules/CancelButton'; // === Pastikan path import ini benar ===


export default function Create({auth}) { // Terima prop 'auth' dari Inertia
    // Gunakan useForm hook Inertia untuk manajemen state form dan submit
    const { data, setData, post, errors, processing } = useForm({
        // === Inisialisasi state form dengan nilai kosong untuk setiap field tabel 'students' ===
        // Sesuaikan nilai awal (misal: '' untuk string, null untuk tanggal/file, dll.)
        nisn: '',
        nit: '',
        nama_lengkap: '',
        jenis_kelamin: '', // Menggunakan string kosong '' untuk nilai awal select placeholder
        tempat_lahir: '',
        tanggal_lahir: null, // Menggunakan null untuk nilai awal DatePicker (tidak ada tanggal dipilih)
        agama: '',
        no_hp: '',
        email: '',
        alamat: '',
        status_akun: '', // Menggunakan string kosong '' untuk nilai awal select placeholder
        foto_profil: null, // Untuk upload file (nilai awal null)

        // user_id tidak biasanya diinput di form ini, dikelola di backend jika perlu
        // created_at, updated_at diatur otomatis oleh Laravel
    });

    // Definisikan nama resource route
    const routeResourceName = 'students'; // Sesuai dengan prefix route resource di web.php

    // Handler saat form disubmit
    const handleStoreData = async (e) => {
        e.preventDefault();

        // Kirim data form ke route store students
        // Menggunakan post karena Inertia dengan metode _method: 'put'/'patch' bisa mengirim FormData (untuk file upload)
        // FormData secara otomatis dibuat oleh useForm jika ada file (foto_profil)
        post(route(`${routeResourceName}.store`), { // Link ke route 'students.store' (misal: /students)
            // Opsional: konfigurasi tambahan seperti onSuccess, onError, etc.
            onSuccess: () => {
                 // Lakukan sesuatu setelah sukses, misal redirect atau reset form
                console.log("Data siswa berhasil ditambahkan!");
                 // reset(); // Jika ingin mereset form setelah submit
                 // Inertia.visit(route(`${routeResourceName}.index`)); // Redirect ke halaman index
            },
            onError: (errors) => {
                 console.error("Ada error saat menambahkan data siswa:", errors);
                 // Errors akan otomatis tersedia di objek 'errors' dari useForm
            },
            onFinish: () => {
                 // Lakukan sesuatu setelah request selesai (sukses atau error)
                console.log("Proses submit form selesai.");
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout (jika dibutuhkan di layout)
            // Header halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Peserta Didik</h2>}
        >
            {/* Set title halaman di browser tab */}
            <Head title={'Tambah Peserta Didik'}/>

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}
                    {/* Form HTML, pasang handler onSubmit */}
                    <form onSubmit={handleStoreData}>
                        {/* ==== INPUT FIELDS UNTUK DATA SISWA ==== */}
                        {/* Gunakan komponen FormGroup dan Input/TextInput/SelectInput/TextAreaInput sesuai kebutuhan */}
                        {/* Pastikan prop 'error' diisi dari object 'errors' useForm untuk menampilkan pesan error validasi */}

                        {/* Input NISN */}
                        <FormGroup label={'NISN'} error={errors.nisn}>
                            <TextInput
                                id="nisn"
                                name="nisn" // Penting: nama input harus sama dengan nama kolom di DB
                                type={'text'}
                                value={data.nisn} // Ambil nilai dari state 'data' useForm
                                onChange={e => setData('nisn', e.target.value)} // Update state 'data' saat input berubah
                                placeholder="Input NISN.."
                                className="mt-1 block w-full" // Kelas styling Anda
                            />
                        </FormGroup>

                         {/* Input NIT */}
                        <FormGroup label={'NIT'} error={errors.nit}>
                            <TextInput
                                id="nit"
                                name="nit"
                                type={'text'}
                                value={data.nit}
                                onChange={e => setData('nit', e.target.value)}
                                placeholder="Input NIT.."
                                className="mt-1 block w-full" // Kelas styling Anda
                            />
                        </FormGroup>

                        {/* Input Nama Lengkap */}
                         <FormGroup label={'Nama Lengkap'} error={errors.nama_lengkap}>
                            <TextInput
                                id="nama_lengkap"
                                name="nama_lengkap"
                                type={'text'}
                                value={data.nama_lengkap}
                                onChange={e => setData('nama_lengkap', e.target.value)}
                                placeholder="Input Nama Lengkap.."
                                className="mt-1 block w-full uppercase" // Kelas styling Anda
                            />
                        </FormGroup>

                        {/* Input Jenis Kelamin (menggunakan elemen <select> standar) */}
                        <FormGroup label={'Jenis Kelamin'} error={errors.jenis_kelamin}>
                            {/* Jika Anda punya komponen SelectInput kustom, gunakan itu */}
                            {/*
                            <SelectInput
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                value={data.jenis_kelamin}
                                onChange={e => setData('jenis_kelamin', e.target.value)}
                                options={[
                                    { value: '', label: 'Pilih Jenis Kelamin' }, // Opsi kosong untuk placeholder
                                    { value: 'L', label: 'Laki-laki' },
                                    { value: 'P', label: 'Perempuan' },
                                ]}
                                className="mt-1 block w-full" // Kelas styling
                            />
                            */}
                            {/* Jika belum punya komponen SelectInput kustom, gunakan elemen <select> standar */}
                            <select
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                value={data.jenis_kelamin}
                                onChange={e => setData('jenis_kelamin', e.target.value)}
                                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm mt-1 block w-full ${
                                    errors.jenis_kelamin ? 'border-red-500' : ''
                                }`} // Tambahkan class error
                            >
                                <option value="">Pilih Jenis Kelamin</option> {/* Opsi kosong untuk placeholder */}
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                            {/* Tampilkan pesan error validasi jika ada */}
                            {errors.jenis_kelamin && <div className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</div>}
                        </FormGroup>
                        {/* ============================================ */}

                         {/* Input Tempat Lahir */}
                         <FormGroup label={'Tempat Lahir'} error={errors.tempat_lahir}>
                             <TextInput
                                 id="tempat_lahir"
                                 name="tempat_lahir"
                                 type="text" // Tipe teks biasa
                                 value={data.tempat_lahir}
                                 onChange={e => setData('tempat_lahir', e.target.value)}
                                 placeholder="Input Tempat Lahir.."
                                 className="mt-1 block w-full" // Kelas styling Anda
                             />
                         </FormGroup>
                         {/* ========================== */}


                        {/* Input Tanggal Lahir (menggunakan DatePicker) */}
                        <FormGroup label={'Tanggal Lahir'} error={errors.tanggal_lahir}>
                            {/* Menggunakan komponen DatePicker */}
                            <DatePicker
                                id="tanggal_lahir" // Tetap beri ID jika Anda menggunakannya
                                // name="tanggal_lahir" // Atribut name tidak selalu diperlukan oleh DatePicker jika pakai useForm
                                // Value DatePicker (selected) harus berupa objek Date atau null
                                // Konversi string tanggal_lahir (YYYY-MM-DD atau null) dari state useForm menjadi objek Date
                                selected={data.tanggal_lahir ? new Date(data.tanggal_lahir) : null}
                                // Callback saat tanggal dipilih
                                onChange={(date) => {
                                    // 'date' adalah objek Date yang dipilih
                                    // Konversi objek Date kembali ke format YYYY-MM-DD (string) untuk state useForm
                                    // Gunakan toISOString() lalu ambil bagian tanggalnya (split('T')[0])
                                    const formattedDateForState = date ? date.toISOString().split('T')[0] : null;
                                    setData('tanggal_lahir', formattedDateForState); // Update state useForm
                                }}
                                // === Konfigurasi Format Tampilan DatePicker ===
                                dateFormat="dd/MM/yyyy" // Format tampilan di input DatePicker
                                // === Konfigurasi Lain DatePicker (Opsional) ===
                                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm mt-1 block w-full ${
                                    errors.tanggal_lahir ? 'border-red-500' : ''
                                }`} // Terapkan class styling Anda
                                placeholderText="dd/mm/yyyy" // Teks placeholder
                                isClearable // Memungkinkan pengguna menghapus tanggal yang dipilih
                                showYearDropdown // Menampilkan dropdown untuk memilih tahun
                                scrollableYearDropdown // Membuat dropdown tahun bisa di-scroll
                                yearDropdownItemNumber={15} // Jumlah tahun yang ditampilkan di dropdown
                                // Tambahkan props lain sesuai kebutuhan dari dokumentasi react-datepicker
                            />
                        </FormGroup>
                        {/* ============================================================== */}


                         {/* Input Agama */}
                          <FormGroup label={'Agama'} error={errors.agama}>
                             <TextInput
                                 id="agama"
                                 name="agama"
                                 type="text" // Tipe teks biasa (atau bisa dropdown nanti jika opsi fix)
                                 value={data.agama}
                                 onChange={e => setData('agama', e.target.value)}
                                 placeholder="Input agama.."
                                 className="mt-1 block w-full capitalize" // Kelas styling Anda
                             />
                         </FormGroup>
                         {/* ============================= */}

                         {/* Input No. HP */}
                         <FormGroup label={'Nomor HP'} error={errors.no_hp}>
                             <TextInput
                                 id="no_hp"
                                 name="no_hp"
                                 type="tel" // Tipe 'tel' untuk keyboard mobile yang relevan
                                 value={data.no_hp}
                                 onChange={e => setData('no_hp', e.target.value)}
                                 placeholder="Input nomor HP.."
                                 className="mt-1 block w-full" // Kelas styling Anda
                             />
                         </FormGroup>
                         {/* ============================== */}


                         {/* Input Email */}
                         <FormGroup label={'Email'} error={errors.email}>
                            <TextInput
                                id="email"
                                name="email"
                                type={'email'}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="Input email.."
                                className="mt-1 block w-full lowercase" // Kelas styling Anda
                            />
                        </FormGroup>

                         {/* Input Alamat (Sebaiknya pakai TextAreaInput jika punya) */}
                         <FormGroup label={'Alamat'} error={errors.alamat}>
                            {/* Jika Anda punya komponen TextAreaInput: */}
                            {/*
                            <TextAreaInput
                                id="alamat"
                                name="alamat"
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                                placeholder="Input alamat.."
                                className="mt-1 block w-full" // Kelas styling Anda
                            />
                            */}
                            <textarea
                                id="alamat"
                                name="alamat"
                                // Textarea tidak menggunakan prop 'type'
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                                placeholder="Input alamat.."
                                // === Gunakan kelas styling yang sama dengan TextInput ===
                                // Sesuaikan jika perlu, dan tambahkan prop 'rows' untuk tinggi
                                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm mt-1 block w-full ${
                                    errors.alamat ? 'border-red-500' : ''
                                }`}
                                rows={3} // === Tentukan jumlah baris default (tinggi) textarea ===
                            >
                                {/* Penting: Jangan letakkan children di dalam tag <textarea> jika Anda menggunakan prop 'value' */}
                            </textarea>
                        </FormGroup>


                         {/* Input Status Akun (menggunakan elemen <select> standar) */}
                         <FormGroup label={'Status'} error={errors.status_akun}>
                            {/* Jika Anda punya komponen SelectInput kustom, gunakan itu */}
                            {/*
                            <SelectInput
                                id="status_akun"
                                name="status_akun"
                                value={data.status_akun}
                                onChange={e => setData('status_akun', e.target.value)}
                                options={[
                                     { value: '', label: 'Pilih Status Akun' }, // Opsi kosong
                                     { value: 'Aktif', label: 'Aktif' },
                                    { value: 'Nonaktif', label: 'Nonaktif' },
                                    { value: 'Lulus', label: 'Lulus' },
                                    { value: 'Keluar', label: 'Keluar' },
                                    { value: 'Mutasi', label: 'Mutasi' },
                                ]}
                                className="mt-1 block w-full" // Kelas styling
                            />
                            */}
                            {/* Jika belum punya komponen SelectInput kustom, gunakan elemen <select> standar */}
                            <select
                                id="status_akun"
                                name="status_akun"
                                value={data.status_akun}
                                onChange={e => setData('status_akun', e.target.value)}
                                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm mt-1 block w-full ${
                                    errors.status_akun ? 'border-red-500' : ''
                                }`} // Tambahkan class error
                            >
                                <option value="">Pilih Status</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                                <option value="Lulus">Lulus</option>
                                <option value="Mutasi">Mutasi</option>
                                <option value="Keluar">Keluar</option>
                            </select>
                             {/* Tampilkan pesan error validasi jika ada */}
                            {errors.status_akun && <div className="text-red-500 text-sm mt-1">{errors.status_akun}</div>}
                        </FormGroup>
                         {/* ============================================ */}


                         {/* Input Foto Profil (pakai type="file") */}
                         <FormGroup label={'Foto Profil'} error={errors.foto_profil}>
                            {/* Input type file seringkali tidak pakai komponen custom yang kompleks */}
                            <input
                                id="foto_profil"
                                name="foto_profil" // Penting: nama input file
                                type={'file'}
                                // Pastikan tipe 'file' selalu null di state useForm,
                                // karena Anda hanya bisa set file object saat onChange
                                onChange={e => setData('foto_profil', e.target.files ? e.target.files[0] : null)} // Ambil file pertama yang dipilih atau null jika dibatalkan
                                className={`mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    ${errors.foto_profil ? 'border-red-500' : ''}
                                `} // Contoh styling file input dengan Tailwind
                            />
                            {/* Opsional: Tampilkan preview gambar jika user memilih file */}
                            {/* Jika ingin menampilkan preview file lama di halaman Edit, logicnya ada di Edit.jsx */}
                            {data.foto_profil instanceof File && ( // Cek apakah foto_profil di state adalah objek File (dari input)
                                 <img src={URL.createObjectURL(data.foto_profil)} alt="Preview" className="mt-2 w-full max-w-sm md:max-w-xs lg:max-w-sm h-auto rounded-md shadow" />
                            )}
                            {/* Tampilkan pesan error validasi jika ada */}
                            {errors.foto_profil && <div className="text-red-500 text-sm mt-1">{errors.foto_profil}</div>}
                        </FormGroup>
                         {/* ============================================= */}


                        {/* ==== END INPUT FIELDS ==== */}


                        {/* Tombol Submit dan Cancel */}
                        <div className='flex items-center gap-2 mt-4'> {/* Tambahkan margin atas */}
                            <PrimaryButton type={'submit'} disabled={processing}> Simpan Data </PrimaryButton> {/* Tombol submit form */}
                            {/* Gunakan Link Inertia untuk tombol kembali agar navigasi mulus */}
                            <CancelButton url={route(`${routeResourceName}.index`)}> Kembali </CancelButton> {/* Tombol kembali ke halaman index */}
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}