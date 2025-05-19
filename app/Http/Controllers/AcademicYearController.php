<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear; // === Import Model AcademicYear ===
use Illuminate\Http\Request;
use Inertia\Inertia; // === Import Inertia ===
use Illuminate\Support\Facades\Gate; // Opsional: Jika menggunakan Gate untuk otorisasi
use Spatie\Permission\Exceptions\PermissionDoesNotExist; // Opsional: Jika menggunakan Spatie Permission

class AcademicYearController extends Controller
{
    // === Tambahkan Middleware Permission di sini jika Anda menggunakan Spatie ===
    public static function middleware()
    {
        return [
            new Middleware('permission:academic-years index', only: ['index']),
            new Middleware('permission:academic-years create', only: ['create', 'store']),
            new Middleware('permission:academic-years edit', only: ['edit', 'update']),
            new Middleware('permission:academic-years delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     * Menampilkan daftar resource (Tahun Ajaran).
     */
    public function index(Request $request)
    {
        // Implementasi untuk mengambil data daftar Tahun Ajaran
        // Anda bisa menambahkan logika pencarian, filter, dan pagination di sini

        $query = AcademicYear::query();

        // === Contoh Implementasi Pencarian Sederhana ===
        // Asumsi ada input 'search' dari frontend melalui request
        if ($request->has('search')) {
            $query->where('nama_tahun_ajaran', 'like', '%' . $request->search . '%')
                  ->orWhere('tahun_mulai', $request->search) // Cari berdasarkan tahun mulai
                  ->orWhere('tahun_selesai', $request->search); // Cari berdasarkan tahun selesai
        }
        // ==============================================


        // === Implementasi Pagination ===
        // Ambil jumlah item per halaman dari request, default ke 10
        $perPage = $request->input('perPage', 10);

        // Ambil data Tahun Ajaran dengan pagination
        // Urutkan berdasarkan tahun_mulai secara descending (tahun terbaru di atas)
        $academicYears = $query->orderBy('tahun_mulai', 'desc')->paginate($perPage);
        // ===============================

        // Render halaman Index AcademicYears menggunakan Inertia
        return Inertia::render('AcademicYears/Index', [
            'academicYears' => $academicYears, // Kirim data Tahun Ajaran ke komponen React
            'filters' => $request->only(['search']), // Kirim filter yang aktif kembali ke frontend untuk mempertahankan state
            'perPage' => (int) $perPage, // Kirim kembali nilai perPage yang aktif
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Menampilkan form untuk membuat resource baru (Tahun Ajaran).
     */
    public function create()
    {
        // Implementasi untuk menampilkan form tambah Tahun Ajaran
        // Mungkin tidak perlu passing data apapun kecuali data dropdown jika ada relasi lain

        // Render halaman Create AcademicYears menggunakan Inertia
        return Inertia::render('AcademicYears/Create');
    }

    /**
     * Store a newly created resource in storage.
     * Menyimpan resource yang baru dibuat ke database.
     */
    public function store(Request $request)
    {
        // Implementasi untuk validasi dan penyimpanan data Tahun Ajaran baru

        // === Validasi Input ===
        $request->validate([
            'tahun_mulai' => ['required', 'integer', 'min:1900', 'max:2100'], // Contoh validasi tahun
            'tahun_selesai' => ['required', 'integer', 'min:1900', 'max:2100', 'gt:tahun_mulai'], // Tahun selesai harus > tahun mulai
            'nama_tahun_ajaran' => ['required', 'string', 'max:255', 'unique:academic_years,nama_tahun_ajaran'], // Nama harus unik di tabel academic_years
        ]);
        // ======================


        // === Buat dan Simpan Data Baru ===
        AcademicYear::create($request->all()); // Gunakan mass assignment (pastikan $fillable di Model sudah benar)
        // ===============================


        // Redirect ke halaman index setelah berhasil menyimpan
        return redirect()->route('academic-years.index')
                         ->with('success', 'Data Tahun Ajaran berhasil ditambahkan.'); // Opsional: Kirim flash message
    }

    /**
     * Display the specified resource.
     * Menampilkan resource spesifik (Tahun Ajaran).
     *
     * @param  \App\Models\AcademicYear  $academicYear
     * @return \Illuminate\Http\Response
     */
    public function show(AcademicYear $academicYear)
    {
        // Implementasi untuk menampilkan detail Tahun Ajaran spesifik (jika ada halaman show)
        // Mungkin tidak diperlukan untuk modul sederhana ini, bisa dilewati.

        // Contoh jika Anda ingin membuat halaman Show:
        // return Inertia::render('AcademicYears/Show', [
        //     'academicYear' => $academicYear, // Kirim objek AcademicYear ke komponen React
        // ]);

        // Jika tidak ada halaman Show, method ini bisa dihapus atau dibiarkan kosong.
    }

    /**
     * Show the form for editing the specified resource.
     * Menampilkan form untuk mengedit resource spesifik (Tahun Ajaran).
     *
     * @param  \App\Models\AcademicYear  $academicYear
     * @return \Illuminate\Http\Response
     */
    public function edit(AcademicYear $academicYear)
    {
        // Implementasi untuk menampilkan form edit Tahun Ajaran
        // Ambil data Tahun Ajaran yang akan diedit dan kirim ke frontend

        // Render halaman Edit AcademicYears menggunakan Inertia
        return Inertia::render('AcademicYears/Edit', [
            'academicYear' => $academicYear, // Kirim objek AcademicYear ke komponen React
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Memperbarui resource spesifik di database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AcademicYear  $academicYear
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AcademicYear $academicYear)
    {
        // Implementasi untuk validasi dan pembaruan data Tahun Ajaran

        // === Validasi Input ===
        $request->validate([
            'tahun_mulai' => ['required', 'integer', 'min:1900', 'max:2100'],
            'tahun_selesai' => ['required', 'integer', 'min:1900', 'max:2100', 'gt:tahun_mulai'],
            // Validasi unique 'nama_tahun_ajaran', tapi abaikan record saat ini (academicYear)
            'nama_tahun_ajaran' => ['required', 'string', 'max:255', 'unique:academic_years,nama_tahun_ajaran,' . $academicYear->id],
        ]);
        // ======================


        // === Update Data ===
        $academicYear->update($request->all()); // Gunakan mass assignment
        // ===================


        // Redirect ke halaman index setelah berhasil mengupdate
         return redirect()->route('academic-years.index')
                          ->with('success', 'Data Tahun Ajaran berhasil diperbarui.'); // Opsional: Kirim flash message
    }

    /**
     * Remove the specified resource from storage.
     * Menghapus resource spesifik dari database.
     *
     * @param  \App\Models\AcademicYear  $academicYear
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademicYear $academicYear)
    {
        // Implementasi untuk penghapusan data Tahun Ajaran

        // === Hapus Data ===
        $academicYear->delete();
        // ==================

        // Redirect kembali ke halaman index setelah berhasil menghapus
        return redirect()->route('academic-years.index')
                         ->with('success', 'Data Tahun Ajaran berhasil dihapus.'); // Opsional: Kirim flash message
    }
}