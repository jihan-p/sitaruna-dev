// resources/js/components/atoms/ApplicationLogo.jsx
import React from 'react'; // Diperlukan untuk komponen ini

// === IMPORT FILE LOGO BARU ANDA DI SINI ===
// Sesuaikan path ('@/assets/logo-sitaruna-smk2.png') dengan lokasi file Anda
import logoSMKN2Sbg from '@/assets/logo-smkn2subang.jpg';

export default function ApplicationLogo(props) {
    return (
        // === GUNAKAN TAG <img> UNTUK MENAMPILKAN GAMBAR ===
        <img
            {...props} // Meneruskan props seperti className, style, dll. (untuk mengatur ukuran, margin, dll.)
            src={logoSMKN2Sbg} // Menggunakan gambar yang diimpor sebagai sumber gambar
            alt="SMKN 2 Subang" // Sangat penting untuk aksesibilitas
            // Anda bisa menambahkan width={...} atau height={...} di sini jika perlu,
            // tapi biasanya lebih fleksibel diatur via className dari parent.
        />
        // ============================================
    );
}