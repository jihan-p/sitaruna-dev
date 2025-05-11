// resources/js/components/molecules/DeleteButton.jsx
import React from 'react';
import Button from '@/components/atoms/Button'; // Import atom Button
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { IconTrash } from '@tabler/icons-react';

export default function DeleteButton({ url, className = '', ...props }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url, {
                    onSuccess: () => {
                         Swal.fire('Deleted!', 'Data has been deleted.', 'success');
                        // Mungkin perlu trigger refresh data di parent
                    },
                    onError: () => {
                         Swal.fire('Error!', 'Failed to delete data.', 'error');
                    }
                });
            }
        });
    };

    return (
        <Button
            onClick={handleDelete}
            className={`bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${className}`} // Styling spesifik delete
            {...props} // Teruskan props lain ke atom Button
        >
            <IconTrash size={16} strokeWidth={1.5}/> {/* Ikon spesifik */}
        </Button>
    );
}