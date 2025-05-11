// resources/js/components/molecules/FormGroup.jsx
import React from 'react';
import InputLabel from '@/components/atoms/InputLabel'; // Mengimpor atom InputLabel
import InputError from '@/components/atoms/InputError'; // Mengimpor atom InputError

// FormGroup adalah molekul yang mengkomposisikan Atom (InputLabel, InputError)
// dan membungkus elemen input (yang juga merupakan Atom seperti TextInput, Textarea)
export default function FormGroup({ label, error, children, className = '' }) {
    return (
        // Wrapper div untuk satu grup form field
        <div className={`flex flex-col gap-1 ${className}`}> {/* Tambahkan styling dasar untuk grup, sesuaikan gap */}
            {/* Render atom InputLabel jika prop label ada */}
            {label && (
                <InputLabel value={label} />
            )}

            {/* Render elemen input (children adalah elemen input itu sendiri, misal <TextInput>, <Textarea>, <Select2>) */}
            {children}

            {/* Render atom InputError jika prop error ada */}
            {error && <InputError message={error} className="mt-1" />} {/* Menggunakan atom InputError */}
        </div>
    );
}