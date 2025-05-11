// resources/js/Pages/Auth/ForgotPassword.jsx (Setelah penerapan FormGroup)

// Import komponen Atomic Design dari lokasi baru
// Hapus InputError dari impor
// import InputError from '@/Components/InputError';
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Jika sudah jadi molekul (Langkah 1)
import TextInput from '@/components/atoms/TextInput'; // Yang sudah distandarisasi (Langkah 2)
import FormGroup from '@/components/molecules/FormGroup'; // Import molekul FormGroup (Langkah 3)
import GuestLayout from '@/templates/GuestLayout'; // Import template (Hasil restrukturisasi direktori)

import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* Gunakan FormGroup untuk input Email */}
                <FormGroup label="Email" error={errors.email}>
                     <TextInput
                         id="email"
                         type="email"
                         name="email"
                         value={data.email}
                         className="mt-1 block w-full"
                         isFocused={true}
                         onChange={(e) => setData('email', e.target.value)}
                     />
                     {/* InputLabel dan InputError tidak lagi ditulis di sini */}
                </FormGroup>


                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}