// resources/js/Pages/Students/Create.jsx

import React from 'react';
// Import komponen DatePicker dan CSS-nya
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import file CSS DatePicker
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // Pastikan path import ini benar
import Container from '@/components/atoms/Container'; // Pastikan path import ini benar
import { Head, useForm, usePage } from '@inertiajs/react';

// Import komponen form yang Anda miliki (sesuaikan path importnya)
import TextInput from '@/components/atoms/TextInput'; // Contoh: untuk input teks
// import SelectInput from '@/components/atoms/SelectInput'; // Contoh: untuk dropdown
// import TextAreaInput from '@/components/atoms/TextAreaInput'; // Contoh: untuk textarea

import PrimaryButton from '@/components/molecules/PrimaryButton'; // Pastikan path import ini benar
import CancelButton from '@/components/molecules/CancelButton'; // Pastikan path import ini benar
import Card from '@/components/organisms/Card'; // Pastikan path import ini benar
import FormGroup from '@/components/molecules/FormGroup'; // Asumsi komponen FormGroup ada dan path importnya benar

export default function Create({auth}) {
    // Gunakan useForm hook Inertia untuk manajemen state form dan submit
    const { data, setData, post, errors, processing } = useForm({
        // Inisialisasi state form dengan nilai kosong untuk setiap field tabel 'students'
        nisn: '',
        nit: '',
        // user_id: '', // Jika user_id di-link di sini, butuh logic tambahan
        nama_lengkap: '',
        jenis_kelamin: '', // Mungkin perlu nilai default atau opsi pertama dari dropdown
        tempat_lahir: '',
        tanggal_lahir: '', // Format 'YYYY-MM-DD' untuk input type="date"
        agama: '',
        no_hp: '',
        email: '',
        alamat: '',
        status_akun: '', // Mungkin perlu nilai default atau opsi pertama dari dropdown
        foto_profil: null, // Untuk upload file (nilai awal null)

        // Fields untuk enrollments (jika manajemen enrollment digabung di sini, tapi disarankan terpisah)
        // kelas_id: '',
        // tahun_ajaran_id: '',
        // semester_id: '',
        // no_absen: '',
    });

    // Definisikan nama resource route
    const routeResourceName = 'students';

    // Handler saat form disubmit
    const handleStoreData = async (e) => {
        e.preventDefault();

        // Kirim data form ke route store students
        // Menggunakan post karena Inertia dengan metode _method: 'put'/'patch' bisa mengirim FormData (untuk file upload)
        post(route(`${routeResourceName}.store`)); // Link ke route 'students.store' (misal: /students)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            // Header halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Peserta Didik</h2>}
        >
            {/* Set title halaman di browser tab */}
            <Head title={'Tambah Peserta Didik'}/>

            <Container>
                <Card>
                    {/* Form HTML */}
                    <form onSubmit={handleStoreData}>
                        {/* ==== INPUT FIELDS UNTUK DATA SISWA ==== */}
                        {/* Gunakan komponen FormGroup dan Input/TextInput/SelectInput/TextAreaInput sesuai kebutuhan */}
                        {/* Pastikan prop 'error' diisi dari object 'errors' useForm */}

                        {/* Contoh Input NISN */}
                        <FormGroup label={'NISN'} error={errors.nisn}>
                            <TextInput
                                id="nisn"
                                name="nisn" // Penting: nama input harus sama dengan nama kolom di DB
                                type={'text'}
                                value={data.nisn} // Ambil nilai dari state 'data' useForm
                                onChange={e => setData('nisn', e.target.value)} // Update state 'data' saat input berubah
                                placeholder="Input NISN.."
                            />
                        </FormGroup>

                         {/* Contoh Input NIT */}
                        <FormGroup label={'NIT'} error={errors.nit}>
                            <TextInput
                                id="nit"
                                name="nit"
                                type={'text'}
                                value={data.nit}
                                onChange={e => setData('nit', e.target.value)}
                                placeholder="Input NIT.."
                            />
                        </FormGroup>

                        {/* Contoh Input Nama Lengkap */}
                         <FormGroup label={'Nama Lengkap'} error={errors.nama_lengkap}>
                            <TextInput
                                id="nama_lengkap"
                                name="nama_lengkap"
                                type={'text'}
                                value={data.nama_lengkap}
                                onChange={e => setData('nama_lengkap', e.target.value)}
                                placeholder="Input Nama Lengkap.."
                            />
                        </FormGroup>

                        {/* === GANTI BLOK INPUT JENIS KELAMIN INI === */}
                        <FormGroup label={'Jenis Kelamin'} error={errors.jenis_kelamin}>
                            {/* Jika Anda punya komponen SelectInput kustom, gunakan ini */}
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
                                }`}
                            >
                                <option value="">Pilih Jenis Kelamin</option> {/* Opsi kosong */}
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                            {/* Optional: Tampilkan pesan error di bawah select jika perlu */}
                            {errors.jenis_kelamin && <div className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</div>}
                        </FormGroup>
                        {/* ============================================ */}

                        {/* === GANTI BLOK INPUT TANGGAL LAHIR INI DENGAN DatePicker === */}
                        <FormGroup label={'Tanggal Lahir'} error={errors.tanggal_lahir}>
                            {/* Ganti elemen input Anda dengan komponen DatePicker */}
                            <DatePicker
                                id="tanggal_lahir" // Tetap beri ID jika Anda menggunakannya (misal untuk label)
                                // name="tanggal_lahir" // Atribut name tidak selalu diperlukan oleh DatePicker jika pakai useForm
                                // Value yang diterima oleh 'selected' DatePicker adalah objek Date
                                // Konversi string tanggal_lahir (YYYY-MM-DD atau null) dari state useForm menjadi objek Date
                                selected={data.tanggal_lahir ? new Date(data.tanggal_lahir) : null}
                                // Callback saat tanggal dipilih
                                onChange={(date) => {
                                    // 'date' adalah objek Date yang dipilih oleh pengguna
                                    // Konversi objek Date kembali ke format YYYY-MM-DD (string) untuk state useForm
                                    // Gunakan toISOString() lalu ambil bagian tanggalnya (split('T')[0])
                                    const formattedDateForState = date ? date.toISOString().split('T')[0] : null;
                                    setData('tanggal_lahir', formattedDateForState); // Update state useForm
                                }}
                                // === Konfigurasi Format Tampilan ===
                                dateFormat="dd/MM/yyyy" // Format tampilan yang Anda inginkan
                                // === Konfigurasi Lain (Opsional) ===
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

                         {/* Contoh Input Email */}
                         <FormGroup label={'Email'} error={errors.email}>
                            <TextInput
                                id="email"
                                name="email"
                                type={'email'}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="Input email.."
                            />
                        </FormGroup>

                         {/* Contoh Input Alamat (Sebaiknya pakai TextAreaInput) */}
                         <FormGroup label={'Alamat'} error={errors.alamat}>
                            {/* Jika Anda punya komponen TextAreaInput: */}
                            {/* <TextAreaInput
                                id="alamat"
                                name="alamat"
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                                placeholder="Input alamat.."
                            /> */}
                             {/* Jika tidak ada TextAreaInput, pakai TextInput type="text" multiline */}
                              <TextInput
                                id="alamat"
                                name="alamat"
                                type={'text'} // Ganti type jika pakai textarea
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                                placeholder="Input alamat.."
                            />
                        </FormGroup>

                         {/* Contoh Input Foto Profil (pakai type="file") */}
                         <FormGroup label={'Foto Profil'} error={errors.foto_profil}>
                            <input // Input type file seringkali tidak pakai komponen custom yang kompleks
                                id="foto_profil"
                                name="foto_profil" // Penting: nama input file
                                type={'file'}
                                onChange={e => setData('foto_profil', e.target.files[0])} // Ambil file pertama yang dipilih
                            />
                            {/* Opsional: Tampilkan preview gambar jika user memilih file */}
                            {data.foto_profil instanceof File && ( // Cek apakah foto_profil adalah objek File
                                 <img src={URL.createObjectURL(data.foto_profil)} alt="Preview" className="mt-2 h-20 w-20 object-cover" />
                            )}
                        </FormGroup>

                         {/* === TAMBAHKAN BLOK INPUT STATUS AKUN INI === */}
                        <FormGroup label={'Status Akun'} error={errors.status_akun}>
                            {/* Jika Anda punya komponen SelectInput kustom, gunakan ini */}
                            {/*
                            <SelectInput
                                id="status_akun"
                                name="status_akun"
                                value={data.status_akun}
                                onChange={e => setData('status_akun', e.target.value)}
                                options={[
                                    { value: 'Aktif', label: 'Aktif' },
                                    { value: 'Nonaktif', label: 'Nonaktif' },
                                    { value: 'Lulus', label: 'Lulus' },
                                    { value: 'Keluar', label: 'Keluar' },
                                    { value: 'Mutasi', label: 'Mutasi' },
                                ]}
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
                                }`}
                            >
                                <option value="">Pilih Status Akun</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                                <option value="Lulus">Lulus</option>
                                <option value="Keluar">Keluar</option>
                                <option value="Mutasi">Mutasi</option>
                            </select>
                            {/* Optional: Tampilkan pesan error di bawah select jika perlu */}
                            {errors.status_akun && <div className="text-red-500 text-sm mt-1">{errors.status_akun}</div>}
                        </FormGroup>
                        {/* ============================================ */}



                        {/* ... Tambahkan input fields lainnya untuk:
                            - tempat_lahir
                            - agama
                            - no_hp
                            - status_akun (sebaiknya Select Input)
                        ... */}


                        {/* ==== END INPUT FIELDS ==== */}


                        {/* Tombol Submit dan Cancel */}
                        <div className='flex items-center gap-2 mt-4'> {/* Tambahkan margin atas */}
                            <PrimaryButton type={'submit'} disabled={processing}> Simpan Data </PrimaryButton> {/* Tombol submit form */}
                            <CancelButton url={route(`${routeResourceName}.index`)}> Kembali </CancelButton> {/* Tombol kembali ke halaman index */}
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}