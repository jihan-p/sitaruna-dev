<?php

namespace App\Http\Controllers;

use App\Models\Classes; // Menggunakan 'Classes' karena 'Class' adalah reserved keyword
use App\Models\Major; // Import Model Major untuk relasi dropdown
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule; // Import Rule untuk validasi unik

class ClassController extends Controller implements HasMiddleware
{
    // Middleware untuk otorisasi akses ke setiap method
    public static function middleware()
    {
        return [
            new Middleware('permission:classes index', only: ['index']),
            new Middleware('permission:classes create', only: ['create', 'store']),
            new Middleware('permission:classes edit', only: ['edit', 'update']),
            new Middleware('permission:classes delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     * Menampilkan daftar resource (Kelas).
     */
    public function index(Request $request)
    {
        $query = Classes::query(); // Menggunakan Model Classes

        // Implementasi Pencarian
        if ($request->has('search')) {
            $query->where('nama_kelas', 'like', '%' . $request->search . '%')
                  ->orWhereHas('major', function ($q) use ($request) {
                      $q->where('nama_jurusan', 'like', '%' . $request->search . '%');
                  });
        }

        // Implementasi Pagination
        $perPage = $request->input('perPage', 10);

        $classes = $query->with('major') // Eager load relasi major
                         ->orderBy('nama_kelas') // Urutkan berdasarkan nama kelas
                         ->paginate($perPage)
                         ->withQueryString(); // Pertahankan query string (filter, perPage) di link pagination

        // Render halaman Index Kelas menggunakan Inertia
        return Inertia::render('Classes/Index', [
            'classes' => $classes, // Kirim data Kelas ke komponen React
            'filters' => $request->only(['search']), // Kirim filter yang aktif kembali ke frontend
            'perPage' => (int) $perPage, // Kirim kembali nilai perPage yang aktif
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Menampilkan form untuk membuat resource baru (Kelas).
     */
    public function create()
    {
        // Ambil daftar Jurusan untuk dropdown di form
        $majors = Major::orderBy('nama_jurusan')->get(['id', 'nama_jurusan']);

        // Render halaman Create Kelas menggunakan Inertia
        return Inertia::render('Classes/Create', [
            'majors' => $majors, // Kirim daftar Jurusan ke frontend
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Menyimpan resource yang baru dibuat ke database.
     */
    public function store(Request $request)
    {
        // Validasi Input
        $request->validate([
            'nama_kelas' => [
                'required',
                'string',
                'max:255',
                Rule::unique('classes')->where(fn ($query) => $query->where('major_id', $request->major_id)),
            ],
            'major_id' => ['required', 'integer', 'exists:majors,id'], // Pastikan ID Jurusan valid
        ]);

        // Buat dan Simpan Data Baru
        Classes::create($request->all()); // Menggunakan Model Classes

        // Redirect ke halaman index dengan flash message sukses
        return redirect()->route('classes.index')
                         ->with('success', 'Data Kelas berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     * Menampilkan resource spesifik (Kelas).
     *
     * @param  \App\Models\Classes  $class
     * @return \Illuminate\Http\Response
     */
    public function show(Classes $class)
    {
        // Method show tidak digunakan dalam alur CRUD ini
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     * Menampilkan form untuk mengedit resource spesifik (Kelas).
     *
     * @param  \App\Models\Classes  $class
     * @return \Illuminate\Http\Response
     */
    public function edit(Classes $class)
    {
        // Eager load relasi Major jika perlu ditampilkan di form edit
        $class->load('major');

        // Ambil daftar Jurusan untuk dropdown
        $majors = Major::orderBy('nama_jurusan')->get(['id', 'nama_jurusan']);

        // Render halaman Edit Kelas menggunakan Inertia
        return Inertia::render('Classes/Edit', [
            'class' => $class, // Kirim objek Kelas ke komponen React
            'majors' => $majors, // Kirim daftar Jurusan ke frontend
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Memperbarui resource spesifik di database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Classes  $class
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Classes $class)
    {
        // Validasi Input
        $request->validate([
            'nama_kelas' => [
                'required',
                'string',
                'max:255',
                Rule::unique('classes')->where(fn ($query) => $query->where('major_id', $request->major_id))->ignore($class->id),
            ],
            'major_id' => ['required', 'integer', 'exists:majors,id'],
        ]);

        // Update Data
        $class->update($request->all()); // Menggunakan Model Classes

        // Redirect ke halaman index setelah berhasil mengupdate
        return redirect()->route('classes.index')
                         ->with('success', 'Data Kelas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     * Menghapus resource spesifik dari database.
     *
     * @param  \App\Models\Classes  $class
     * @return \Illuminate\Http\Response
     */
    public function destroy(Classes $class)
    {
        // Hapus Data
        $class->delete(); // Menggunakan Model Classes

        // Redirect kembali ke halaman index dengan flash message sukses
        return redirect()->route('classes.index')
                         ->with('success', 'Data Kelas berhasil dihapus.');
    }
}
