<?php

namespace App\Http\Controllers;

use App\Models\Major; // === Import Model Major ===
use Illuminate\Http\Request;
use Inertia\Inertia; // Import Inertia
use Illuminate\Support\Facades\Gate; // Jika pakai Gate untuk permission


class MajorController extends Controller
{
    // === Tambahkan Middleware Permission di sini jika Anda menggunakan Spatie ===
    // Atau gunakan Gate/Policy di dalam setiap method jika lebih suka itu.
    public function __construct()
    {
        // Contoh: Gunakan middleware 'permission' dari Spatie
        $this->middleware('permission:majors index')->only('index');
        $this->middleware('permission:majors create')->only(['create', 'store']);
        $this->middleware('permission:majors edit')->only(['edit', 'update']);
        $this->middleware('permission:majors delete')->only('destroy');
        // $this->middleware('permission:majors show')->only('show'); // Jika ada halaman show
    }
    // ==========================================================================

    /**
     * Menampilkan daftar Jurusan.
     */
    public function index()
    {
        // Permission check menggunakan Gate jika tidak pakai middleware di construct
        // Gate::authorize('majors index'); // Pastikan user punya permission ini

        // Query data Jurusan
        $majors = Major::query()
            // Tambahkan logika pencarian atau filter di sini nanti jika diperlukan
            // ->when(request()->search, function ($query, $search) {
            //     $query->where('nama_jurusan', 'like', '%'.$search.'%'); // Cari berdasarkan nama_jurusan
            // })
            ->latest() // Urutkan berdasarkan data terbaru
            ->paginate(10); // Paginasi 10 item per halaman

        // Render halaman Inertia 'Majors/Index'
        return Inertia::render('Majors/Index', [
            'majors' => $majors,
            // Kirim kembali parameter filter/search jika ada
            // 'filters' => request()->only(['search']),
        ]);
    }

    /**
     * Menampilkan form tambah Jurusan.
     */
    public function create()
    {
        // Permission check: Gate::authorize('majors create');

        // Render halaman Inertia 'Majors/Create'
        return Inertia::render('Majors/Create');
    }

    /**
     * Menyimpan data Jurusan baru.
     */
    public function store(Request $request)
    {
        // Permission check: Gate::authorize('majors create');

        // Validasi data dari request
        $validatedData = $request->validate([
            // === Aturan validasi untuk 'nama_jurusan' sesuai migrasi (wajib, string, unik di tabel 'majors') ===
            'nama_jurusan' => 'required|string|max:255|unique:majors,nama_jurusan',
            // ===============================================================================================
            // Tambahkan aturan validasi untuk kolom lain jika ada
        ]);

        // Simpan data ke database menggunakan Model Major
        Major::create($validatedData);

        // Redirect kembali ke halaman index Jurusan dengan pesan sukses
        return redirect()->route('majors.index')->with('success', 'Data Jurusan berhasil ditambahkan!');
    }

    /**
     * Menampilkan detail Jurusan tertentu (Opsional jika Anda membuat halaman Show).
     */
    // public function show(Major $major) // Gunakan Route Model Binding dengan Model Major
    // {
    //     // Permission check: Gate::authorize('majors show');

    //     // Render halaman Inertia 'Majors/Show' dan kirim data Jurusan
    //     return Inertia::render('Majors/Show', ['major' => $major]);
    // }

    /**
     * Menampilkan form edit Jurusan.
     */
    public function edit(Major $major) // Gunakan Route Model Binding dengan Model Major
    {
        // Permission check: Gate::authorize('majors edit');

        // Render halaman Inertia 'Majors/Edit' dan kirim data Jurusan
        return Inertia::render('Majors/Edit', ['major' => $major]);
    }

    /**
     * Memperbarui data Jurusan.
     */
    public function update(Request $request, Major $major) // Gunakan Route Model Binding dengan Model Major
    {
        // Permission check: Gate::authorize('majors edit');

         // Validasi data dari request
         $validatedData = $request->validate([
             // === Aturan validasi untuk 'nama_jurusan' (unik, kecuali untuk data Jurusan ini sendiri) ===
             'nama_jurusan' => 'required|string|max:255|unique:majors,nama_jurusan,' . $major->id,
             // ======================================================================================
             // Tambahkan aturan validasi untuk kolom lain jika ada
         ]);

        // Perbarui data di database
        $major->update($validatedData);

        // Redirect kembali ke halaman index atau detail dengan pesan sukses
        return redirect()->route('majors.index')->with('success', 'Data Jurusan berhasil diperbarui!');
    }

    /**
     * Menghapus data Jurusan.
     */
    public function destroy(Major $major) // Gunakan Route Model Binding dengan Model Major
    {
        // Permission check: Gate::authorize('majors delete');

        try {
            // Hapus data dari database
            $major->delete();
            // Redirect kembali dengan pesan sukses
            return back()->with('success', 'Data Jurusan berhasil dihapus!');
        } catch (\Illuminate\Database\QueryException $e) {
            // Tangani error jika data jurusan masih terhubung dengan data lain (misal: di tabel 'classes')
            // Error code 23503 adalah kode standar PostgreSQL untuk foreign key violation
             if ($e->getCode() === '23503') {
                 return back()->with('error', 'Gagal menghapus data Jurusan. Masih ada Kelas yang terhubung dengan Jurusan ini.');
             }
             // Jika error lainnya
            return back()->with('error', 'Terjadi kesalahan saat menghapus data Jurusan.');
        } catch (\Exception $e) {
             // Tangani error umum lainnya
             return back()->with('error', 'Terjadi kesalahan yang tidak terduga saat menghapus data Jurusan.');
        }
    }
}