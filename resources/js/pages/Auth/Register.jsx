// resources/js/Pages/Auth/Register.jsx (Setelah penerapan FormGroup)

// Import komponen Atomic Design dari lokasi baru
// Hapus InputError dan InputLabel dari impor
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Jika sudah jadi molekul (Langkah 1)
import TextInput from '@/components/atoms/TextInput'; // Yang sudah distandarisasi (Langkah 2)
import FormGroup from '@/components/molecules/FormGroup'; // Import molekul FormGroup (Langkah 3)
import GuestLayout from '@/templates/GuestLayout'; // Import template (Hasil restrukturisasi direktori)

import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Gunakan FormGroup untuk input Nama */}
                <FormGroup label="Name" error={errors.name}>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                </FormGroup>

                {/* Gunakan FormGroup untuk input Email */}
                <FormGroup label="Email" error={errors.email} className="mt-4"> {/* Tambahkan margin atas */}
                     <TextInput
                         id="email"
                         type="email"
                         name="email"
                         value={data.email}
                         className="mt-1 block w-full"
                         autoComplete="username"
                         onChange={(e) => setData('email', e.target.value)}
                         required
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
                         onChange={(e) => setData('password', e.target.value)}
                         required
                     />
                </FormGroup>

                {/* Gunakan FormGroup untuk input Konfirmasi Password */}
                <FormGroup label="Confirm Password" error={errors.password_confirmation} className="mt-4"> {/* Tambahkan margin atas */}
                     <TextInput
                         id="password_confirmation"
                         type="password"
                         name="password_confirmation"
                         value={data.password_confirmation}
                         className="mt-1 block w-full"
                         autoComplete="new-password"
                         onChange={(e) => setData('password_confirmation', e.target.value)}
                         required
                     />
                </FormGroup>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}