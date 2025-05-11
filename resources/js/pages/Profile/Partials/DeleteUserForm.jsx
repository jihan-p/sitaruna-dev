// resources/js/Pages/Profile/Partials/DeleteUserForm.jsx (Setelah refine penggunaan Modal)

// Import komponen Atomic Design
// Hapus InputError dan InputLabel dari impor jika sudah tidak digunakan langsung
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// Import molekul Button (Langkah 1)
import DangerButton from '@/components/molecules/DangerButton';
import SecondaryButton from '@/components/molecules/SecondaryButton';
// Import atom TextInput (Langkah 2)
import TextInput from '@/components/atoms/TextInput';
// Import molekul FormGroup (Langkah 3)
import FormGroup from '@/components/molecules/FormGroup';
// Import molekul Modal (Langkah 9)
import Modal from '@/components/molecules/Modal';


import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    // State untuk mengontrol tampilan modal
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef(); // Ref untuk input password

    // useForm Inertia untuk form delete
    const {
        data,
        setData,
        delete: destroy, // Alias delete method Inertia
        processing, // Status processing
        reset, // Reset form
        errors, // Error validasi
        clearErrors, // Clear errors
    } = useForm({
        password: '', // State untuk password konfirmasi
    });

    // Handler untuk menampilkan modal konfirmasi
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    // Handler untuk submit form delete
    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true, // Pertahankan posisi scroll
            onSuccess: () => closeModal(), // Tutup modal saat sukses
            onError: () => passwordInput.current.focus(), // Fokus input password saat error
            onFinish: () => reset(), // Reset form setelah selesai (sukses/gagal)
        });
    };

    // Handler untuk menutup modal
    const closeModal = () => {
        setConfirmingUserDeletion(false); // Sembunyikan modal

        clearErrors(); // Hapus error validasi
        reset(); // Reset state form password
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and
                    data will be permanently deleted. Please enter your
                    password to confirm you would like to permanently delete
                    your account.
                </p>
            </header>

            {/* Gunakan molekul DangerButton untuk memicu modal */}
            <DangerButton onClick={confirmUserDeletion}>
                Delete Account
            </DangerButton>

            {/* Gunakan molekul Modal untuk menampilkan konfirmasi */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}> {/* Menggunakan props show dan onClose */}
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        {/* Gunakan FormGroup untuk input Password Konfirmasi Hapus */}
                        {/* Label di sini disetel 'sr-only' (screen reader only) */}
                        <FormGroup label="Password" error={errors.password} className="sr-only"> {/* Atur sr-only di sini atau di FormGroup */}
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput} // Mengaitkan ref
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-1 block w-3/4" // Sesuaikan lebar
                                isFocused // Auto-fokus saat modal muncul
                                placeholder="Password"
                            />
                        </FormGroup>
                    </div>

                    <div className="mt-6 flex justify-end">
                        {/* Gunakan molekul SecondaryButton untuk batal */}
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                         {/* Gunakan molekul DangerButton untuk submit delete */}
                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
