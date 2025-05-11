// resources/js/Pages/Users/Edit.jsx (Setelah penerapan FormGroup)

import React ,{useEffect, useState }from 'react';
// Import komponen Atomic Design dari lokasi baru
import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // Import template
import Container from '@/components/atoms/Container'; // Jika Container tetap di Components (sesuaikan jika dipindah)
import { Head, useForm, usePage } from '@inertiajs/react';
// import Input from '@/components/atoms/Input'; // Input.jsx sudah digabung ke TextInput (Langkah 2)
import TextInput from '@/components/atoms/TextInput'; // Import TextInput (Langkah 2)
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Jika sudah jadi molekul (Langkah 1)
import CancelButton from '@/components/molecules/CancelButton'; // Jika sudah jadi molekul (Langkah 1)
import Card from '@/components/organisms/Card'; // Jika Card sudah jadi organisme (Langkah 7)
import FormGroup from '@/components/molecules/FormGroup'; // Import molekul FormGroup (Langkah 3)
import Select2 from '@/components/molecules/Select2'; // Import molekul Select2 (Langkah 8)
import Swal from 'sweetalert2';

export default function Edit({auth}) {

    // destruct roles and user from usepage props
    const { user, roles } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors, processing } = useForm({
        name : user.name,
        email: user.email,
        // selectedRoles harus berisi array NAMA peran (string) untuk dikirim ke backend
        selectedRoles : user.roles.map(role => role.name), // Initial state: array of role names
        // filterRole adalah format data yang dibutuhkan oleh defaultValue Select2 (array objek {value, label})
        filterRole : user.roles.map(role => ({
            value: role.name,
            label: role.name
        })),
        _method: 'put' // Untuk method PUT
    });

    // Format data roles dari backend untuk prop options Select2
    const formattedRoles = roles.map(role => ({
        value: role.name, // Nilai yang akan disimpan
        label: role.name  // Teks yang ditampilkan
    }));

    // define method handleSelectedroles saat Select2 berubah
    const handleSelectedRoles = (selectedOptions) => {
        // selectedOptions adalah array objek {value, label} dari react-select
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : []; // Ekstrak hanya valuenya
        setData('selectedRoles', selectedValues); // Update state form dengan array of strings (nama peran)
    }

    // define method handleUpdateData
    const handleUpdateData = async (e) => {
        e.preventDefault();

        // Gunakan method post Inertia dengan _method: 'put'
        post(route('users.update', user.id), {
             // Menggunakan _method: 'put' dalam useForm akan membuat method PUT
             // Jadi pemanggilannya tetap post ke route yang benar
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
             onError: (errors) => {
                console.error('Validation Errors:', errors);
                // Inertia secara otomatis akan mengisi errors state, FormGroup akan menampilkannya
             }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit User</h2>} // Sesuaikan header
        >
            <Head title={'Edit Users'}/>
             <Container> {/* Asumsi Container tetap di Components atau dipindah */}
                <Card title={'Edit user'}> {/* Asumsi Card adalah organisme (Langkah 7) */}
                    <form onSubmit={handleUpdateData}>
                        {/* Gunakan FormGroup untuk input Nama */}
                         <div className='mb-4'> {/* Tambahkan margin bawah */}
                             <FormGroup label={'Name'} error={errors.name}>
                                 <TextInput
                                     id="name" // Tambahkan ID
                                     name="name" // Tambahkan name
                                     type={'text'}
                                     value={data.name}
                                     onChange={e => setData('name', e.target.value)}
                                     placeholder="Input name user.."
                                     // props lain
                                 />
                             </FormGroup>
                         </div>

                         {/* Gunakan FormGroup untuk input Email */}
                        <div className='mb-4'> {/* Tambahkan margin bawah */}
                            <FormGroup label={'Email'} error={errors.email}>
                                <TextInput
                                    id="email" // Tambahkan ID
                                    name="email" // Tambahkan name
                                    type={'email'}
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="Input email user.."
                                     // props lain
                                />
                            </FormGroup>
                        </div>

                        {/* Gunakan FormGroup untuk pemilihan Roles */}
                         <div className='mb-4'> {/* Tambahkan margin bawah */}
                             {/* FormGroup membungkus Select2 */}
                             <FormGroup label={'Roles'} error={errors.selectedRoles}> {/* Passing error untuk field selectedRoles */}
                                 <Select2
                                     options={formattedRoles} // Opsi tersedia
                                     onChange={handleSelectedRoles} // Handler saat pilihan berubah
                                     defaultValue={data.filterRole} // Nilai awal peran yang dimiliki user (dalam format {value, label})
                                     placeholder="Pilih Role..."
                                     isMulti={true} // Pastikan isMulti di sini jika Select2 mendukung
                                     // className, id, name bisa diteruskan
                                 />
                             </FormGroup>
                         </div>

                        {/* Password fields biasanya TIDAK ditampilkan di form edit profil user,
                             hanya di form UpdatePasswordForm.
                             Jika perlu reset password oleh admin, mungkin beda form atau di sini.
                             Jika ada, terapkan FormGroup juga. */}

                        <div className='flex items-center gap-2'>
                            {/* Gunakan molekul Button jika sudah dibuat (Langkah 1) */}
                            <PrimaryButton type={'submit'} disabled={processing}> Save Data </PrimaryButton>
                            <CancelButton url={route('users.index')}> Go Back </CancelButton>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
