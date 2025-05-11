// resources/js/Pages/Auth/ResetPassword.jsx (Setelah penerapan FormGroup)

// Import komponen Atomic Design dari lokasi baru
// Hapus InputError dan InputLabel dari impor
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Jika sudah jadi molekul (Langkah 1)
import TextInput from '@/components/atoms/TextInput'; // Yang sudah distandarisasi (Langkah 2)
import FormGroup from '@/components/molecules/FormGroup'; // Import molekul FormGroup (Langkah 3)
import GuestLayout from '@/templates/GuestLayout'; // Import template (Hasil restrukturisasi direktori)

import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                {/* Gunakan FormGroup untuk input Email */}
                {/* Meskipun tidak ada label di form asli, kita tetap bisa pakai FormGroup jika mau konsisten */}
                 <FormGroup label="Email" error={errors.email}> {/* Atau sesuaikan jika layout tidak perlu label di sini */}
                     <TextInput
                         id="email"
                         type="email"
                         name="email"
                         value={data.email}
                         className="mt-1 block w-full"
                         autoComplete="username"
                         onChange={(e) => setData('email', e.target.value)}
                     />
                 </FormGroup>


                {/* Gunakan FormGroup untuk input Password */}
                <FormGroup label="Password" error={errors.password} className="mt-4"> {/* Tambahkan margin atas */}
                     <TextInput
                         id="password"
                         type="password"
                         name="password"
                         value={data.password}
                         className="mt-1 block w-full"
                         autoComplete="new-password"
                         isFocused={true}
                         onChange={(e) => setData('password', e.target.value)}
                     />
                </FormGroup>

                {/* Gunakan FormGroup untuk input Konfirmasi Password */}
                <FormGroup label="Confirm Password" error={errors.password_confirmation} className="mt-4"> {/* Tambahkan margin atas */}
                     <TextInput
                         type="password"
                         id="password_confirmation"
                         name="password_confirmation"
                         value={data.password_confirmation}
                         className="mt-1 block w-full"
                         autoComplete="new-password"
                         onChange={(e) =>
                             setData('password_confirmation', e.target.value)
                         }
                     />
                 </FormGroup>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}