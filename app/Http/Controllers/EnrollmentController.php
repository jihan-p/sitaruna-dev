<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student;
use App\Models\ClassModel;
use App\Models\AcademicYear;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:enrollments index', only: ['index']),
            new Middleware('permission:enrollments create', only: ['create', 'store']),
            new Middleware('permission:enrollments edit', only: ['edit', 'update']),
            new Middleware('permission:enrollments delete', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $query = Enrollment::query();

        $query->with(['student', 'class.major', 'academicYear', 'semester']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('student', function ($q) use ($search) {
                $q->where('nisn', 'like', '%' . $search . '%')
                  ->orWhere('nama_lengkap', 'like', '%' . $search . '%');
            })->orWhereHas('class', function ($q) use ($search) {
                $q->where('nama_kelas', 'like', '%' . $search . '%')
                  ->orWhereHas('major', function ($subQ) use ($search) {
                      $subQ->where('nama_jurusan', 'like', '%' . $search . '%');
                  });
            })->orWhereHas('academicYear', function ($q) use ($search) {
                $q->where('nama_tahun_ajaran', 'like', '%' . $search . '%');
            })->orWhereHas('semester', function ($q) use ($search) {
                $q->where('nama_semester', 'like', '%' . $search . '%');
            })->orWhere('no_absen', 'like', '%' . $search . '%');
        }

        $perPage = $request->input('perPage', 10);
        $enrollments = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Enrollments/Index', [
            'enrollments' => $enrollments,
            'filters' => $request->only(['search']),
            'perPage' => $perPage,
        ]);
    }

    public function create()
    {
        $students = Student::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']);
        $classes = ClassModel::with('major')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'major_id']);
        $academicYears = AcademicYear::orderBy('nama_tahun_ajaran', 'desc')->get(['id', 'nama_tahun_ajaran']);
        $semesters = Semester::orderBy('nama_semester')->get(['id', 'nama_semester']);

        return Inertia::render('Enrollments/Create', [
            'students' => $students,
            'classes' => $classes,
            'academic_years' => $academicYears, // <<< PERBAIKAN DI SINI
            'semesters' => $semesters,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => ['required', 'integer', 'exists:students,id'],
            'class_id' => ['required', 'integer', 'exists:classes,id'],
            'academic_year_id' => ['required', 'integer', 'exists:academic_years,id'],
            'semester_id' => [
                'required',
                'integer',
                'exists:semesters,id',
                Rule::unique('enrollments')->where(function ($query) use ($request) {
                    return $query->where('student_id', $request->student_id)
                                 ->where('academic_year_id', $request->academic_year_id)
                                 ->where('semester_id', $request->semester_id);
                }),
            ],
            'no_absen' => [
                'nullable',
                'integer',
                'min:1',
                Rule::unique('enrollments')->where(function ($query) use ($request) {
                    return $query->where('class_id', $request->class_id)
                                 ->where('academic_year_id', $request->academic_year_id)
                                 ->where('semester_id', $request->semester_id);
                })
            ],
        ], [
            'semester_id.unique' => 'Siswa ini sudah terdaftar di tahun ajaran dan semester yang sama.',
            'no_absen.unique' => 'Nomor absen ini sudah digunakan di kelas, tahun ajaran, dan semester yang sama.',
        ]);

        Enrollment::create($request->all());

        return redirect()->route('enrollments.index')
                         ->with('success', 'Pendaftaran Siswa berhasil ditambahkan.');
    }

    public function show(Enrollment $enrollment)
    {
        // Jika Anda akan membuat halaman show/detail, tambahkan eager loading di sini
        // $enrollment->load(['student', 'class.major', 'academicYear', 'semester']);
        // return Inertia::render('Enrollments/Show', ['enrollment' => $enrollment]);
    }

    public function edit(Enrollment $enrollment)
    {
        $enrollment->load(['student', 'class.major', 'academicYear', 'semester']);

        $students = Student::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']);
        $classes = ClassModel::with('major')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'major_id']);
        $academicYears = AcademicYear::orderBy('nama_tahun_ajaran', 'desc')->get(['id', 'nama_tahun_ajaran']);
        $semesters = Semester::orderBy('nama_semester')->get(['id', 'nama_semester']);

        return Inertia::render('Enrollments/Edit', [
            'enrollment' => $enrollment,
            'students' => $students,
            'classes' => $classes,
            'academic_years' => $academicYears, // <<< PERBAIKAN DI SINI
            'semesters' => $semesters,
        ]);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $request->validate([
            'student_id' => ['required', 'integer', 'exists:students,id'],
            'class_id' => ['required', 'integer', 'exists:classes,id'],
            'academic_year_id' => ['required', 'integer', 'exists:academic_years,id'],
            'semester_id' => [
                'required',
                'integer',
                'exists:semesters,id',
                Rule::unique('enrollments')->where(function ($query) use ($request) {
                    return $query->where('student_id', $request->student_id)
                                 ->where('academic_year_id', $request->academic_year_id)
                                 ->where('semester_id', $request->semester_id);
                })->ignore($enrollment->id),
            ],
            'no_absen' => [
                'nullable',
                'integer',
                'min:1',
                Rule::unique('enrollments')->where(function ($query) use ($request) {
                    return $query->where('class_id', $request->class_id)
                                 ->where('academic_year_id', $request->academic_year_id)
                                 ->where('semester_id', $request->semester_id);
                })->ignore($enrollment->id),
            ],
        ], [
            'semester_id.unique' => 'Siswa ini sudah terdaftar di tahun ajaran dan semester yang sama.',
            'no_absen.unique' => 'Nomor absen ini sudah digunakan di kelas, tahun ajaran, dan semester yang sama.',
        ]);

        $enrollment->update($request->all());

        return redirect()->route('enrollments.index')
                         ->with('success', 'Pendaftaran Siswa berhasil diperbarui.');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return redirect()->route('enrollments.index')
                         ->with('success', 'Pendaftaran Siswa berhasil dihapus.');
    }
}