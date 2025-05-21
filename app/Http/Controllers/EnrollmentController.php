<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student; // Untuk dropdown siswa
use App\Models\ClassModel; // Untuk dropdown kelas (ingat nama modelnya ClassModel)
use App\Models\AcademicYear; // Untuk dropdown tahun ajaran
use App\Models\Semester; // Untuk dropdown semester
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller implements HasMiddleware
{
    // Middleware untuk otorisasi akses ke setiap method
    public static function middleware(): array
    {
        return [
            new Middleware('permission:enrollments index', only: ['index']),
            new Middleware('permission:enrollments create', only: ['create', 'store']),
            new Middleware('permission:enrollments edit', only: ['edit', 'update']),
            new Middleware('permission:enrollments delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     * Menampilkan daftar resource (Pendaftaran).
     */
    public function index(Request $request)
    {
        $query = Enrollment::query()
                    ->with(['student', 'class.major', 'academicYear', 'semester']); // Memuat relasi

        // Implementasi Pencarian
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('student', function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', '%' . $search . '%')
                  ->orWhere('nisn', 'like', '%' . $search . '%');
            })
            ->orWhereHas('class', function ($q) use ($search) {
                $q->where('nama_kelas', 'like', '%' . $search . '%');
            })
            ->orWhereHas('academicYear', function ($q) use ($search) {
                $q->where('nama_tahun_ajaran', 'like', '%' . $search . '%');
            })
            ->orWhereHas('semester', function ($q) use ($search) {
                $q->where('nama_semester', 'like', '%' . $search . '%');
            })
            ->orWhere('no_absen', 'like', '%' . $search . '%');
        }

        // Implementasi Pagginasi
        $perPage = $request->input('perPage', 10); // Default 10 item per halaman
        $enrollments = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Enrollments/Index', [
            'enrollments' => $enrollments,
            'filters' => $request->only(['search', 'perPage']),
            'perPage' => (int) $perPage,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Menampilkan form untuk membuat resource baru.
     */
    public function create()
    {
        $students = Student::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']);
        $classes = ClassModel::with('major')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'major_id']);
        $academicYears = AcademicYear::orderBy('nama_tahun_ajaran', 'desc')->get(['id', 'nama_tahun_ajaran']);
        $semesters = Semester::orderBy('nama_semester')->get(['id', 'nama_semester']);

        return Inertia::render('Enrollments/Create', [
            'students' => $students,
            'classes' => $classes,
            'academicYears' => $academicYears,
            'semesters' => $semesters,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Menyimpan resource yang baru dibuat ke database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'integer', 'exists:students,id'],
            'class_id' => ['required', 'integer', 'exists:classes,id'],
            'academic_year_id' => ['required', 'integer', 'exists:academic_years,id'],
            'semester_id' => ['required', 'integer', 'exists:semesters,id'],
            'no_absen' => [
                'nullable',
                'integer',
                // Pastikan no_absen unik per kelas, tahun ajaran, dan semester
                Rule::unique('enrollments')->where(fn ($query) => $query->where('class_id', $request->class_id)
                                                                       ->where('academic_year_id', $request->academic_year_id)
                                                                       ->where('semester_id', $request->semester_id)),
            ],
        ]);

        // Tambahkan validasi unik untuk student_id per tahun ajaran dan semester
        $existingEnrollment = Enrollment::where('student_id', $validated['student_id'])
                                        ->where('academic_year_id', $validated['academic_year_id'])
                                        ->where('semester_id', $validated['semester_id'])
                                        ->first();

        if ($existingEnrollment) {
            return redirect()->back()->withErrors([
                'student_id' => 'Siswa ini sudah terdaftar pada tahun ajaran dan semester yang sama.',
            ]);
        }

        Enrollment::create($validated);

        return redirect()->route('enrollments.index')
                         ->with('success', 'Pendaftaran berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     * Menampilkan form untuk mengedit resource yang ditentukan.
     */
    public function edit(Enrollment $enrollment)
    {
        $students = Student::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']);
        $classes = ClassModel::with('major')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'major_id']);
        $academicYears = AcademicYear::orderBy('nama_tahun_ajaran', 'desc')->get(['id', 'nama_tahun_ajaran']);
        $semesters = Semester::orderBy('nama_semester')->get(['id', 'nama_semester']);

        // Muat relasi untuk enrollment yang akan diedit
        $enrollment->load(['student', 'class.major', 'academicYear', 'semester']);

        return Inertia::render('Enrollments/Edit', [
            'enrollment' => $enrollment,
            'students' => $students,
            'classes' => $classes,
            'academicYears' => $academicYears,
            'semesters' => $semesters,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Memperbarui resource spesifik di database.
     */
    public function update(Request $request, Enrollment $enrollment)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'integer', 'exists:students,id'],
            'class_id' => ['required', 'integer', 'exists:classes,id'],
            'academic_year_id' => ['required', 'integer', 'exists:academic_years,id'],
            'semester_id' => ['required', 'integer', 'exists:semesters,id'],
            'no_absen' => [
                'nullable',
                'integer',
                // Pastikan no_absen unik per kelas, tahun ajaran, dan semester, kecuali untuk enrollment ini sendiri
                Rule::unique('enrollments')->where(fn ($query) => $query->where('class_id', $request->class_id)
                                                                       ->where('academic_year_id', $request->academic_year_id)
                                                                       ->where('semester_id', $request->semester_id))
                                        ->ignore($enrollment->id),
            ],
        ]);

        // Tambahkan validasi unik untuk student_id per tahun ajaran dan semester
        // Kecualikan enrollment yang sedang diedit
        $existingEnrollment = Enrollment::where('student_id', $validated['student_id'])
                                        ->where('academic_year_id', $validated['academic_year_id'])
                                        ->where('semester_id', $validated['semester_id'])
                                        ->where('id', '!=', $enrollment->id) // Abaikan enrollment saat ini
                                        ->first();

        if ($existingEnrollment) {
            return redirect()->back()->withErrors([
                'student_id' => 'Siswa ini sudah terdaftar pada tahun ajaran dan semester yang sama.',
            ]);
        }

        $enrollment->update($validated);

        return redirect()->route('enrollments.index')
                         ->with('success', 'Pendaftaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     * Menghapus resource spesifik dari database.
     */
    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return redirect()->route('enrollments.index')
                         ->with('success', 'Pendaftaran berhasil dihapus.');
    }
}