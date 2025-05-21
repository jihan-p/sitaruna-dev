<?php

namespace App\Http\Controllers;

use App\Models\ClassModel; // Using 'ClassModel' because 'Class' is a reserved keyword
use App\Models\Major; // Import Major Model for dropdown relation
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule; // Import Rule for unique validation

class ClassController extends Controller implements HasMiddleware
{
    // Middleware for authorizing access to each method
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
     * Displays the list of resources (Classes).
     */
    public function index(Request $request)
    {
        $query = ClassModel::query(); // Using ClassModel

        // Search Implementation
        if ($request->has('search')) {
            $query->where('nama_kelas', 'like', '%' . $request->search . '%')
                  ->orWhereHas('major', function ($q) use ($request) {
                      $q->where('nama_jurusan', 'like', '%' . $request->search . '%');
                  });
        }

        // Pagination Implementation
        $perPage = $request->input('perPage', 10);

        $classes = $query->with('major') // Eager load major relation
                         ->orderBy('nama_kelas') // Order by class name
                         ->paginate($perPage)
                         ->withQueryString(); // Preserve query string (filter, perPage) in pagination links

        // Render Class Index page using Inertia
        return Inertia::render('Classes/Index', [
            'classes' => $classes, // Send Class data to React component
            'filters' => $request->only(['search']), // Send active filters back to frontend
            'perPage' => (int) $perPage, // Send back active perPage value
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Displays the form for creating a new resource (Class).
     */
    public function create()
    {
        // Get list of Majors for the dropdown in the form
        $majors = Major::orderBy('nama_jurusan')->get(['id', 'nama_jurusan']);

        // Render Class Create page using Inertia
        return Inertia::render('Classes/Create', [
            'majors' => $majors, // Send list of Majors to frontend
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Stores the newly created resource to the database.
     */
    public function store(Request $request)
    {
        // Input Validation
        $request->validate([
            'nama_kelas' => [
                'required',
                'string',
                'max:255',
                Rule::unique('classes')->where(fn ($query) => $query->where('major_id', $request->major_id)),
            ],
            'major_id' => ['required', 'integer', 'exists:majors,id'], // Ensure Major ID is valid
        ]);

        // Create and Save New Data
        ClassModel::create($request->all()); // Using ClassModel

        // Redirect to index page with success flash message
        return redirect()->route('classes.index')
                         ->with('success', 'Class data successfully added.');
    }

    /**
     * Display the specified resource.
     * Displays the specified resource (Class).
     *
     * @param  \App\Models\ClassModel  $class
     * @return \Illuminate\Http\Response
     */
    public function show(ClassModel $class)
    {
        // The show method is not used in this CRUD flow
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     * Displays the form for editing the specified resource (Class).
     *
     * @param  \App\Models\ClassModel  $class
     * @return \Illuminate\Http\Response
     */
    public function edit(ClassModel $class)
    {
        // Eager load Major relation if needed to be displayed in the edit form
        $class->load('major');

        // Get list of Majors for the dropdown
        $majors = Major::orderBy('nama_jurusan')->get(['id', 'nama_jurusan']);

        // Render Class Edit page using Inertia
        return Inertia::render('Classes/Edit', [
            'class' => $class, // Send Class object to React component
            'majors' => $majors, // Send list of Majors to frontend
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Updates the specified resource in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassModel  $class
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassModel $class)
    {
        // Input Validation
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
        $class->update($request->all()); // Using ClassModel

        // Redirect to index page after successful update
        return redirect()->route('classes.index')
                         ->with('success', 'Class data successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     * Deletes the specified resource from the database.
     *
     * @param  \App\Models\ClassModel  $class
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassModel $class)
    {
        // Delete Data
        $class->delete(); // Using ClassModel

        // Redirect back to index page with success flash message
        return redirect()->route('classes.index')
                         ->with('success', 'Class data successfully deleted.');
    }
}
