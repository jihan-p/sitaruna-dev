// resources/js/Pages/Auth/Login.jsx (Setelah penerapan FormGroup)

// Import komponen Atomic Design dari lokasi baru
import Checkbox from '@/components/atoms/Checkbox';
import TextInput from '@/components/atoms/TextInput'; // Yang sudah distandarisasi (Langkah 2)
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Jika sudah jadi molekul (Langkah 1)
import FormGroup from '@/components/molecules/FormGroup'; // Import molekul FormGroup (Langkah 3)
import GuestLayout from '@/templates/GuestLayout'; // Import template (Hasil restrukturisasi direktori)

import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Gunakan FormGroup untuk input email */}
                {/* FormGroup akan merender label dan error secara otomatis */}
                <FormGroup label="Email" error={errors.email}>
                    {/* Elemen input itu sendiri menjadi children dari FormGroup */}
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {/* InputLabel dan InputError tidak lagi ditulis di sini */}
                </FormGroup>

                {/* Gunakan FormGroup untuk input password */}
                 <FormGroup label="Password" error={errors.password}>
                     {/* Elemen input itu sendiri menjadi children dari FormGroup */}
                     <TextInput
                         id="password"
                         type="password"
                         name="password"
                         value={data.password}
                         className="mt-1 block w-full"
                         autoComplete="current-password"
                         onChange={(e) => setData('password', e.target.value)}
                     />
                     {/* InputLabel dan InputError tidak lagi ditulis di sini */}
                 </FormGroup>


                <div className="mt-4 block">
                    <label className="flex items-center">
                        {/* Checkbox mungkin tetap atom */}
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    {/* Gunakan molekul PrimaryButton jika sudah dibuat */}
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}