// resources/js/Pages/Students/Edit.jsx

import React from 'react';
// Import komponen DatePicker dan CSS-nya
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import file CSS DatePicker

// Import layout terautentikasi Anda
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // === Sesuaikan path import ini jika berbeda ===

// Import hook useForm, usePage, dan komponen Link dari Inertia
import { Head, useForm, usePage, Link } from '@inertiajs/react'; // Import Link dan usePage

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

// Utility untuk cek permission (jika digunakan di luar layout)
// Pastikan baris import ini TIDAK dikomentari jika Anda menggunakan hasAnyPermission
// import hasAnyPermission from '@/utils/Permissions'; // === Sesuaikan path import ini jika berbeda ===


export default function Edit({auth}) { // Terima prop 'auth' dari Inertia

    // Ambil data 'student' yang dikirim dari controller StudentController@edit melalui props Inertia
    const { student } = usePage().props;
     // Ambil data dropdown jika Anda passing dari controller (opsional, sama seperti create)
    // const { classes, religions, statuses } = usePage().props;

    // Gunakan useForm hook Inertia untuk manajemen state form dan submit
    // === Inisialisasi state form dengan nilai data student yang ada ===
    const { data, setData, post, errors, processing, reset } = useForm({ // Tambah reset jika perlu untuk mereset form state
        // Isi state dengan data siswa yang diterima dari props 'student'
        // Gunakan || '' untuk nilai string kosong, || null untuk tanggal kosong/file upload
        nisn: student.nisn || '',
        nit: student.nit || '',
        nama_lengkap: student.nama_lengkap || '',
        jenis_kelamin: student.jenis_kelamin || '', // Menggunakan string kosong '' jika null
        tempat_lahir: student.tempat_lahir || '',
        tanggal_lahir: student.tanggal_lahir || null, // Menggunakan null jika null dari DB, cocok untuk DatePicker
        agama: student.agama || '',
        no_hp: student.no_hp || '',
        email: student.email || '',
        alamat: student.alamat || '',
        status_akun: student.status_akun || '', // Menggunakan string kosong '' jika null
        // Foto Profil: state ini hanya untuk upload file BARU.
        // Nilai input type="file" tidak bisa diisi programmatically dengan path file lama.
        // Kita set null di state useForm ini. Backend akan menangani jika ada file baru diupload atau tidak.
        foto_profil: null, // Nilai awal null untuk input file

        // user_id tidak biasanya diedit di form ini
        // created_at, updated_at hanya ditampilkan

        // === Penting: Menandakan metode HTTP yang sebenarnya adalah PUT untuk update resource ===
        _method: 'put',
    });

    // Definisikan nama resource route
    const routeResourceName = 'students'; // Sesuai dengan prefix route resource di web.php


    // Handler saat form disubmit untuk update data
    const handleUpdateData = async (e) => {
        e.preventDefault();

        // Kirim data form ke route update students
        // Menggunakan post() dari useForm karena Inertia dengan metode _method: 'put'/'patch' bisa mengirim FormData (untuk file upload)
        // FormData secara otomatis dibuat oleh useForm jika ada file (foto_profil di state tidak null)
        // Route update memerlukan ID siswa yang akan diupdate
        post(route(`${routeResourceName}.update`, student.id), { // Link ke route 'students.update' dengan ID student
             // Opsional: konfigurasi tambahan seperti onSuccess, onError, etc.
             onSuccess: () => {
                 console.log("Data siswa berhasil diperbarui!");
                 // Redirect ke halaman index atau detail setelah update
                 // Inertia.visit(route(`${routeResourceName}.index`)); // Redirect ke index
                 // Inertia.visit(route(`${routeResourceName}.show`, student.id)); // Redirect ke halaman detail siswa yang diupdate
             },
             onError: (errors) => {
                 console.error("Ada error saat memperbarui data siswa:", errors);
                 // Errors akan otomatis tersedia di objek 'errors' dari useForm
             },
             onFinish: () => {
                 console.log("Proses submit form update selesai.");
             }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Pass user prop ke layout (jika dibutuhkan di layout)
            // Header halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Peserta Didik</h2>}
        >
            {/* Set title halaman di browser tab */}
            {/* Tampilkan nama siswa di title halaman Edit */}
            <Head title={`Edit Peserta Didik: ${student.nama_lengkap}`}/>

            <Container> {/* Gunakan komponen Container Anda */}
                <Card> {/* Gunakan komponen Card Anda */}
                    {/* Form HTML, pasang handler onSubmit */}
                    {/* Penting: Form saat update yang ada file upload harus pakai post() di useForm */}
                     <form onSubmit={handleUpdateData}>

                        {/* ==== INPUT FIELDS UNTUK DATA SISWA ==== */}
                        {/* Gunakan komponen FormGroup dan Input/TextInput/SelectInput/TextAreaInput sesuai kebutuhan */}
                         {/* Isi value input dengan data.nama_field */}
                         {/* Pastikan prop 'error' diisi dari object 'errors' useForm untuk menampilkan pesan error validasi */}


                        {/* Input NISN */}
                        <FormGroup label={'NISN'} error={errors.nisn}>
                            <TextInput
                                id="nisn"
                                name="nisn" // Nama input harus sama dengan nama kolom di DB
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
                                yearDropdownItemNumber={15} // Jumlah tahun yang ditampilkan di dropdown (misal 15 tahun ke belakang/depan)
                                // Tambahkan props lain sesuai kebutuhan dari dokumentasi react-datepicker
                            />
                             {/* Tampilkan pesan error validasi jika ada */}
                            {errors.tanggal_lahir && <div className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</div>}
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
                                 className="mt-1 block w-full capitalize" // Kelas styling Anda, tambahkan 'capitalize'
                             />
                              {/* Tampilkan pesan error validasi jika ada */}
                            {errors.agama && <div className="text-red-500 text-sm mt-1">{errors.agama}</div>}
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
                              {/* Tampilkan pesan error validasi jika ada */}
                            {errors.no_hp && <div className="text-red-500 text-sm mt-1">{errors.no_hp}</div>}
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
                             {/* Tampilkan pesan error validasi jika ada */}
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </FormGroup>

                         {/* Input Alamat (menggunakan TextArea) */}
                         <FormGroup label={'Alamat'} error={errors.alamat}>
                            {/* === Ganti TextInput atau input type="text" dengan <textarea> === */}
                            {/* Jika Anda punya komponen TextAreaInput kustom, impor dan gunakan itu */}
                            {/*
                            <TextAreaInput
                                id="alamat"
                                name="alamat"
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                                placeholder="Input alamat.."
                                className="mt-1 block w-full" // Kelas styling
                                rows={3} // Tentukan jumlah baris default
                            />
                            */}
                             {/* Jika tidak ada TextAreaInput, gunakan elemen <textarea> standar */}
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
                            {/* Tampilkan pesan error validasi jika ada */}
                            {errors.alamat && <div className="text-red-500 text-sm mt-1">{errors.alamat}</div>}
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
                                <option value="">Pilih Status Akun</option>
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
                         {/* Grup form untuk label, input, dan error */}
                         <FormGroup label={'Foto Profil'} error={errors.foto_profil}>
                            {/* Input file itu sendiri */}
                            <input
                                id="foto_profil"
                                name="foto_profil" // Nama ini harus sama dengan nama field di backend (request)
                                type={'file'} // Tipe input untuk memilih file
                                // Handler saat user memilih file
                                // Mengambil file pertama yang dipilih (e.target.files[0]) atau null jika dibatalkan
                                onChange={e => setData('foto_profil', e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)}
                                // Kelas styling untuk input file (contoh Tailwind)
                                className={`mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    ${errors.foto_profil ? 'border-red-500' : ''} /* Menambahkan border merah jika ada error */
                                `}
                            />

                            {/* === Logika untuk menampilkan preview gambar === */}

                            {/* Kondisi 1: Tampilkan foto yang sudah ada jika belum ada file baru dipilih */}
                            {/* student.foto_profil adalah URL/path foto dari database */}
                            {/* data.foto_profil === null berarti user belum memilih file baru di form */}
                            {student.foto_profil && data.foto_profil === null && (
                                 // Tag <img> untuk menampilkan gambar yang sudah ada
                                 <img
                                     // URL gambar, pastikan path '/storage/' benar untuk akses file publik
                                     src={`/storage/${student.foto_profil}`} // === Sesuaikan path ini jika cara akses file storage Anda berbeda ===
                                     alt="Existing Photo" // Teks alternatif
                                     // === KELAS STYLING GAMBAR ===
                                     // Kelas-kelas ini mengontrol ukuran, aspek rasio, dan bentuk gambar
                                    //  className="mt-2 h-20 w-auto object-cover rounded shadow" // <== KELAS YANG DIHARAPKAN MEMBUAT GAMBAR KECIL
                                     className="mt-2 w-full max-w-sm md:max-w-xs lg:max-w-sm h-auto rounded-md shadow"
                                     // Jika gambar terlihat terlalu besar, gunakan Developer Tools untuk cek style yang diterapkan!
                                     // ----------------------------
                                 />
                            )}

                            {/* Kondisi 2: Tampilkan preview foto BARU jika user sudah memilih file */}
                            {data.foto_profil instanceof File && (
                                 // Tag <img> untuk menampilkan preview file yang baru dipilih
                                 // URL.createObjectURL() membuat URL sementara untuk file lokal di browser
                                 <img
                                     src={URL.createObjectURL(data.foto_profil)} // URL sementara untuk preview
                                     alt="New Photo Preview" // Teks alternatif
                                     // === Gunakan kelas styling yang konsisten dengan gambar existing ===
                                     className="mt-2 h-20 w-auto object-cover rounded shadow" // <== Terapkan kelas styling yang sama
                                     // ---------------------------------------------
                                 />
                            )}

                            {/* Tampilkan pesan error validasi jika ada */}
                            {errors.foto_profil && <div className="text-red-500 text-sm mt-1">{errors.foto_profil}</div>}

                            {/* === Opsional: Tambahkan checkbox/tombol untuk explicit menghapus foto yang sudah ada === */}
                            {/* Ini memerlukan penyesuaian logic di controller update() untuk mendeteksi request hapus foto */}
                             {/* Tampilkan checkbox hanya jika ada foto lama (student.foto_profil) DAN belum ada file baru dipilih (data.foto_profil === null) */}
                             {/* Jika Anda ingin mengaktifkan fitur ini, Anda juga perlu:
                                 1. Tambahkan `clear_photo: false,` ke state useForm.
                                 2. Tambahkan penanganan untuk field `clear_photo` di metode `update()` di StudentController.php
                                    (misal: jika `clear_photo` true, hapus file foto lama dan set kolom `foto_profil` di DB menjadi null).
                             */}
                             {/* {student.foto_profil && data.foto_profil === null && (
                                 <div className="mt-2">
                                     <label className="inline-flex items-center">
                                         <input
                                             type="checkbox"
                                             className="form-checkbox rounded text-blue-600" // Kelas styling checkbox
                                             onChange={e => setData('clear_photo', e.target.checked)} // Update state useForm
                                             // Tidak perlu 'checked' prop di sini, state 'clear_photo' yang akan mengontrolnya jika ditambahkan
                                         />
                                         <span className="ml-2 text-sm text-gray-600">Hapus Foto yang Ada</span>
                                     </label>
                                 </div>
                             )} */}
                             {/* ================================================================================= */}

                        </FormGroup>


                        {/* ==== END INPUT FIELDS ==== */}


                        {/* Tombol Submit dan Cancel */}
                        <div className='flex items-center gap-2 mt-4'> {/* Tambahkan margin atas */}
                            {/* Tombol submit form update */}
                            <PrimaryButton type={'submit'} disabled={processing}> Simpan Perubahan </PrimaryButton>
                            {/* Tombol kembali ke halaman index siswa */}
                            <Link href={route(`${routeResourceName}.index`)} className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                Kembali
                            </Link>
                             {/* Jika Anda menggunakan komponen CancelButton, ganti Link di atas */}
                            {/* <CancelButton url={route(`${routeResourceName}.index`)}> Kembali </CancelButton> */}
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}