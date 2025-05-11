// resources/js/Pages/Auth/ConfirmPassword.jsx (Setelah penerapan FormGroup)

// Import komponen Atomic Design dari lokasi baru
// Hapus InputError dan InputLabel dari impor
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/components/molecules/PrimaryButton'; // Jika sudah jadi molekul (Langkah 1)
import TextInput from '@/components/atoms/TextInput'; // Yang sudah distandarisasi (Langkah 2)
import FormGroup from '@/components/molecules/FormGroup'; // Import molekul FormGroup (Langkah 3)
import GuestLayout from '@/templates/GuestLayout'; // Import template (Hasil restrukturisasi direktori)

import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                {/* Gunakan FormGroup untuk input Password */}
                <FormGroup label="Password" error={errors.password} className="mt-4"> {/* Tambahkan margin atas */}
                     <TextInput
                         id="password"
                         type="password"
                         name="password"
                         value={data.password}
                         className="mt-1 block w-full"
                         isFocused={true}
                         onChange={(e) => setData('password', e.target.value)}
                     />
                </FormGroup>


                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}