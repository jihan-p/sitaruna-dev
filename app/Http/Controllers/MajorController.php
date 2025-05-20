<?php

namespace App\Http\Controllers;

use App\Models\Major; // Pastikan import Model Major
use Illuminate\Http\Request;
use Inertia\Inertia; // Pastikan import Inertia
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission; // Pastikan import Permission jika digunakan untuk middleware

class MajorController extends Controller implements HasMiddleware
{
    // === Tambahkan Middleware Permission di sini menggunakan static method middleware() ===
    public static function middleware()
    {
        return [
            // PERBAIKAN: Pastikan nama permission sesuai dengan yang didefinisikan di seeder
            new Middleware('permission:majors index', only: ['index']),
            new Middleware('permission:majors create', only: ['create', 'store']),
            new Middleware('permission:majors edit', only: ['edit', 'update']),
            new Middleware('permission:majors delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     * Menampilkan daftar resource (Major).
     */
    public function index(Request $request)
    {
        $query = Major::query();

        // === Implementasi Pencarian ===
        // Asumsi ada input 'search' dari frontend melalui request
        if ($request->has('search')) {
            $query->where('nama_jurusan', 'like', '%' . $request->search . '%');
            // Tambahkan pencarian berdasarkan kolom lain jika perlu
        }

        // === Implementasi Pagination ===
        $perPage = $request->input('perPage', 10); // Ambil nilai perPage dari request atau default 10

        $majors = $query->orderBy('nama_jurusan') // Urutkan berdasarkan nama jurusan
                        ->paginate($perPage)
                        ->withQueryString(); // Penting agar filter/perPage tetap ada di link pagination

        // Render halaman Index Majors menggunakan Inertia
        return Inertia::render('Majors/Index', [
            'majors' => $majors, // Kirim data Jurusan ke komponen React
            // === PERBAIKAN: Kirim objek filters yang aktif kembali ke frontend ===
            'filters' => $request->only(['search', 'perPage']), // Kirim filter search dan perPage
            // ====================================================================
            'perPage' => (int) $perPage, // Kirim kembali nilai perPage yang aktif
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Menampilkan form untuk membuat resource baru (Major).
     */
    public function create()
    {
        // Implementasi untuk menampilkan form create Major
        // Render halaman Create Majors menggunakan Inertia
        return Inertia::render('Majors/Create');
    }

    /**
     * Store a newly created resource in storage.
     * Menyimpan resource yang baru dibuat ke database.
     */
    public function store(Request $request)
    {
        // Implementasi untuk validasi dan penyimpanan data Major baru

        // === Validasi Input ===
        $request->validate([
            'nama_jurusan' => ['required', 'string', 'max:255', 'unique:majors'], // Contoh: 'Rekayasa Perangkat Lunak', 'Teknik Komputer dan Jaringan'
            // Tambahkan validasi lain jika ada kolom lain
        ]);
        // ======================

        // === Buat dan Simpan Data Baru ===
        Major::create($request->all()); // Gunakan mass assignment (pastikan $fillable di Model sudah benar)
        // ===============================


        // Redirect ke halaman index setelah berhasil menyimpan
        return redirect()->route('majors.index')
                         ->with('success', 'Data Jurusan berhasil ditambahkan.'); // Opsional: Kirim flash message
    }

    /**
     * Display the specified resource.
     * Menampilkan resource spesifik (Major).
     *
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function show(Major $major)
    {
        // Implementasi untuk menampilkan detail Major
        // Render halaman Show Major menggunakan Inertia
        return Inertia::render('Majors/Show', [
            'major' => $major, // Kirim objek Major ke komponen React
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * Menampilkan form untuk mengedit resource spesifik (Major).
     *
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function edit(Major $major)
    {
        // Implementasi untuk menampilkan form edit Major
        // Render halaman Edit Majors menggunakan Inertia
        return Inertia::render('Majors/Edit', [
            'major' => $major, // Kirim objek Major ke komponen React
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Memperbarui resource spesifik di database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Major $major)
    {
        // Implementasi untuk validasi dan pembaruan data Major

        // === Validasi Input ===
        $request->validate([
            'nama_jurusan' => ['required', 'string', 'max:255', 'unique:majors,nama_jurusan,' . $major->id], // Unique kecuali data saat ini
            // Tambahkan validasi lain jika ada kolom lain
        ]);
        // ======================


        // === Update Data ===
        $major->update($request->all()); // Gunakan mass assignment
        // ===================


        // Redirect ke halaman index setelah berhasil mengupdate
         return redirect()->route('majors.index')
                          ->with('success', 'Data Jurusan berhasil diperbarui.'); // Opsional: Kirim flash message
    }

    /**
     * Remove the specified resource from storage.
     * Menghapus resource spesifik dari database.
     *
     * @param  \App\Models\Major  $major
     * @return \Illuminate\Http\Response
     */
    public function destroy(Major $major)
    {
        // Implementasi untuk penghapusan data Major

        // === Hapus Data ===
        $major->delete();
        // ==================

        // Redirect kembali ke halaman index setelah berhasil menghapus
        return redirect()->route('majors.index')
                         ->with('success', 'Data Jurusan berhasil dihapus.'); // Opsional: Kirim flash message
    }
}
