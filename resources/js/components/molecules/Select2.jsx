// resources/js/components/molecules/Select2.jsx
import React from 'react';
import Select from 'react-select'; // Asumsi library react-select sudah terinstall dan diimpor

// Molekul Select2 yang membungkus react-select
// Props: options (array { value, label }), onChange, placeholder, defaultValue, isMulti, styles
export default function Select2({ options, onChange, placeholder, defaultValue, isMulti = false, styles, className }) { // Tambahkan isMulti dan className
     // Custom Styles (jika ada dan ingin dipertahankan)
     const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#4CAF50' : '#ccc', // Warna border saat fokus
            boxShadow: state.isFocused ? '0 0 5px rgba(76, 175, 80, 0.5)' : 'none',
            outline: 'none', // Menghilangkan garis biru
            '&:hover': {
                borderColor: '#4CAF50', // Warna border saat hover
            },
        }),
        // Tambahkan style lain jika perlu
        // indicatorSeparator: (provided) => ({ ...provided, display: 'none' }), // Contoh menghilangkan separator
        // dropdownIndicator: (provided) => ({ ...provided, color: '#ccc' }), // Contoh warna ikon dropdown
    };

    return (
         // Menggunakan komponen Select dari react-select
        <Select
            options={options} // Data opsi { value, label }
            onChange={onChange} // Handler saat pilihan berubah
            className={`basic-multi-select ${className}`} // Class umum untuk styling, gabungkan dengan className dari props
            defaultValue={defaultValue || null} // Nilai awal (untuk mode edit), null jika tidak ada
            classNamePrefix="select" // Prefix class untuk styling Select2
            placeholder={placeholder || "Pilih opsi..."} // Placeholder
            isMulti={isMulti} // Mode multi-select
            styles={styles || customStyles} // Gunakan customStyles default atau dari props
        />
    );
}