// resources/js/Pages/Students/Edit.jsx

import React from 'react';
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


export default function Edit({auth}) {

    // Ambil data 'student' dari props yang dikirim controller
    const { student } = usePage().props;
     // Ambil data dropdown jika Anda passing dari controller (opsional)
    // const { classes, religions, statuses } = usePage().props;


    // Gunakan useForm hook Inertia untuk manajemen state form dan submit
    // Inisialisasi state form dengan nilai data student yang ada
    const { data, setData, post, errors, processing } = useForm({
        nisn: student.nisn || '', // Gunakan || '' untuk menghindari null
        nit: student.nit || '',
        // user_id: student.user_id || '', // Jika user_id di-link di sini
        nama_lengkap: student.nama_lengkap || '',
        jenis_kelamin: student.jenis_kelamin || '',
        tempat_lahir: student.tempat_lahir || '',
        tanggal_lahir: student.tanggal_lahir || '', // Pastikan formatnya sudah YYYY-MM-DD jika dari DB
        agama: student.agama || '',
        no_hp: student.no_hp || '',
        email: student.email || '',
        alamat: student.alamat || '',
        status_akun: student.status_akun || '',
        // Foto Profil: untuk upload file baru.
        // Saat edit, nilai input type="file" tidak bisa diisi programmatically dengan nama file lama.
        // Kita set null di sini. Logika update di controller akan menangani jika ada file baru atau tidak.
        foto_profil: null, // Nilai awal null, file baru akan di set saat user memilih file


        // Penting: Menandakan metode HTTP yang sebenarnya adalah PUT untuk update resource
        _method: 'put',
    });

    // Definisikan nama resource route
    const routeResourceName = 'students';


    // Handler saat form disubmit untuk update
    const handleUpdateData = async (e) => {
        e.preventDefault();

        // Kirim data form ke route update students
        // Menggunakan post() dari useForm karena Inertia dengan metode _method: 'put'/'patch' bisa mengirim FormData (untuk file upload)
        post(route(`${routeResourceName}.update`, student.id)); // Link ke route 'students.update' dengan ID student
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            // Header halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Peserta Didik</h2>}
        >
            {/* Set title halaman di browser tab */}
            <Head title={'Edit Peserta Didik'}/>

            <Container>
                <Card>
                    {/* Form HTML */}
                    {/* Penting: Form saat update yang ada file upload harus pakai post() di useForm */}
                     <form onSubmit={handleUpdateData}>

                        {/* ==== INPUT FIELDS UNTUK DATA SISWA ==== */}
                        {/* Gunakan komponen FormGroup dan Input/TextInput/SelectInput/TextAreaInput sesuai kebutuhan */}
                         {/* Isi value input dengan data.nama_field */}
                         {/* Pastikan prop 'error' diisi dari object 'errors' useForm */}


                        {/* Contoh Input NISN */}
                        <FormGroup label={'NISN'} error={errors.nisn}>
                            <TextInput
                                id="nisn"
                                name="nisn" // Nama input harus sama dengan nama kolom di DB
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

                        {/* Contoh Input Tanggal Lahir (pakai type="date") */}
                         <FormGroup label={'Tanggal Lahir'} error={errors.tanggal_lahir}>
                            <TextInput
                                id="tanggal_lahir"
                                name="tanggal_lahir"
                                type={'date'} // Penting untuk input tanggal
                                value={data.tanggal_lahir}
                                onChange={e => setData('tanggal_lahir', e.target.value)}
                            />
                        </FormGroup>

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
                            {/* Tampilkan preview gambar yang sudah ada ATAU preview file baru jika dipilih */}
                            {/* Cek apakah student.foto_profil ada (berarti ada foto lama) DAN state data.foto_profil masih null (belum pilih file baru) */}
                            {student.foto_profil && !data.foto_profil && (
                                 <img src={`/storage/${student.foto_profil}`} alt="Existing Photo" className="mt-2 h-20 w-20 object-cover" />
                            )}
                            {/* Cek apakah state data.foto_profil berisi objek File (berarti sudah pilih file baru) */}
                            {data.foto_profil instanceof File && (
                                 <img src={URL.createObjectURL(data.foto_profil)} alt="New Photo Preview" className="mt-2 h-20 w-20 object-cover" />
                            )}
                            {/* Opsional: Tambahkan checkbox/tombol untuk menghapus foto yang sudah ada */}
                             {/* <label className="ml-2"><input type="checkbox" onChange={e => setData('clear_photo', e.target.checked)} /> Hapus Foto</label> */}
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
                            <PrimaryButton type={'submit'} disabled={processing}> Simpan Perubahan </PrimaryButton> {/* Tombol submit form update */}
                            <CancelButton url={route(`${routeResourceName}.index`)}> Kembali </CancelButton> {/* Tombol kembali ke halaman index */}
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}