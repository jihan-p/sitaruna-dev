// resources/js/components/atoms/TextInput.jsx
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
// Import InputLabel atau InputError TIDAK lagi diperlukan di sini setelah ada FormGroup

// Ini adalah komponen atom TextInput dasar.
// Hanya fokus pada elemen <input> HTML, ref, dan fokus.
export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props }, // Prop label & error DIHAPUS dari sini
    ref,
) {
     const localRef = useRef(null);

     // Memungkinkan parent component untuk memanggil method focus()
     useImperativeHandle(ref, () => ({ focus: () => localRef.current?.focus() }));

     // Logic untuk auto-focus saat isFocused bernilai true
     useEffect(() => {
         if (isFocused) {
             localRef.current?.focus();
         }
     }, [isFocused]);

     return (
         // Ini hanya elemen input dasar dengan fitur ref/fokus.
         // Penanganan render label, error, dan div pembungkus dilakukan oleh molekul FormGroup.
         <input
             {...props} // Menerima semua props standar HTML input (value, onChange, id, name, disabled, placeholder, dll.)
             type={type} // Menentukan tipe input (text, email, password, dll.)
             className={`w-full px-4 py-2 border text-sm rounded-md focus:outline-none focus:ring-0 bg-white text-gray-700 focus:border-gray-200 border-gray-200 ${className}`} // Sesuaikan class Tailwind
             ref={localRef} // Mengaitkan ref dengan elemen input
         />
     );
 });    