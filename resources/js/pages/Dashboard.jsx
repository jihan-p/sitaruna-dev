// resources/js/Pages/Dashboard.jsx

import AuthenticatedLayout from '@/templates/AuthenticatedLayout'; // Import layout Anda
import { Head } from '@inertiajs/react'; // Import Head dari Inertia

// Komponen halaman ini menerima props dari controller/Inertia.
// Pastikan Anda menerima prop 'auth' di sini.
export default function Dashboard({ auth }) { // <--- TAMBAHKAN { auth } di sini

    return (
        // Panggil AuthenticatedLayout dan LEWATKAN prop 'auth' yang diterima
        <AuthenticatedLayout
            auth={auth} // <--- LEWATKAN prop 'auth' ke layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} // Judul halaman
        >
            <Head title="Dashboard" /> {/* Judul di tab browser */}

            {/* === Konten Spesifik Halaman Ini === */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
            {/* ================================ */}

        </AuthenticatedLayout>
    );
}

// === Catatan ===
// Untuk halaman Index modul (AcademicYears/Index.jsx, Semesters/Index.jsx, dll.),
// Anda juga akan menerima prop lain seperti 'academicYears', 'semesters', 'filters', dll.
// Pastikan prop 'auth' tetap diterima dan dilewatkan ke AuthenticatedLayout.
// Contoh di AcademicYears/Index.jsx:
// export default function Index({ auth, academicYears, filters, perPage: initialPerPage }) {
//     // ... kode lainnya ...
//     return (
//         <AuthenticatedLayout
//             auth={auth} // <--- Tetap lewatkan prop 'auth'
//             header={<h2 className="...">Manajemen Tahun Ajaran</h2>}
//         >
//             // ... konten halaman Index Tahun Ajaran ...
//         </AuthenticatedLayout>
//     );
// }
