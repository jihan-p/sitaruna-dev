// resources/js/Pages/Enrollments/Edit.jsx

import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import PrimaryButton from '@/components/molecules/PrimaryButton';
import FormGroup from '@/components/molecules/FormGroup';
import Select2 from '@/components/molecules/Select2';
import CancelButton from '@/components/molecules/CancelButton';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ auth, enrollment }) {
    const routeResourceName = 'enrollments';

    // Pastikan nama prop yang di-destructure SAMA PERSIS dengan yang dikirim dari controller
    // Saat ini, controller mengirim 'academic_years' (dengan underscore)
    const { students, classes, academic_years, semesters } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        student_id: enrollment.student_id ?? '',
        class_id: enrollment.class_id ?? '',
        academic_year_id: enrollment.academic_year_id ?? '',
        semester_id: enrollment.semester_id ?? '',
        no_absen: enrollment.no_absen ?? '',
    });

    // === TAMBAHKAN DEFINISI OPTIONS UNTUK SELECT2 DI SINI ===
    // Pastikan Anda memformat data yang diterima dari props ke format yang diharapkan Select2
    const studentOptions = students.map(student => ({
        value: student.id,
        label: `${student.nama_lengkap} (NISN: ${student.nisn})`,
    }));

    const classOptions = classes.map(cls => ({
        value: cls.id,
        label: `${cls.nama_kelas} (${cls.major.nama_jurusan})`, // Pastikan major dimuat jika Anda menampilkannya
    }));

    const academicYearOptions = academic_years.map(year => ({ // Menggunakan academic_years sesuai dengan controller
        value: year.id,
        label: year.nama_tahun_ajaran,
    }));

    const semesterOptions = semesters.map(semester => ({
        value: semester.id,
        label: semester.nama_semester,
    }));
    // === AKHIR DARI DEFINISI OPTIONS ===


    // Handler untuk Select2
    const handleSelect2Change = (name, selectedOption) => {
        setData(name, selectedOption ? selectedOption.value : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('enrollments.update', enrollment.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Pendaftaran</h2>}
        >
            <Head title="Edit Pendaftaran" />

            <Container>
                <Card title="Form Edit Pendaftaran">
                    <form onSubmit={handleSubmit} className="p-4">
                        {/* Dropdown Siswa */}
                        <FormGroup label="Siswa" htmlFor="student_id" error={errors.student_id}>
                            <Select2
                                id="student_id"
                                name="student_id"
                                options={studentOptions}
                                onChange={(selectedOption) => handleSelect2Change('student_id', selectedOption)}
                                className="mt-1 block w-full"
                                placeholder="Pilih Siswa"
                                // SET NILAI AWAL DENGAN MENCARI OBJEK OPSI
                                value={studentOptions.find(option => option.value === data.student_id) || null}
                                required
                            />
                        </FormGroup>

                        {/* Dropdown Kelas */}
                        <FormGroup label="Kelas" htmlFor="class_id" error={errors.class_id}>
                            <Select2
                                id="class_id"
                                name="class_id"
                                options={classOptions}
                                onChange={(selectedOption) => handleSelect2Change('class_id', selectedOption)}
                                className="mt-1 block w-full"
                                placeholder="Pilih Kelas"
                                // SET NILAI AWAL DENGAN MENCARI OBJEK OPSI
                                value={classOptions.find(option => option.value === data.class_id) || null}
                                required
                            />
                        </FormGroup>

                        {/* Dropdown Tahun Ajaran */}
                        <FormGroup label="Tahun Ajaran" htmlFor="academic_year_id" error={errors.academic_year_id}>
                            <Select2
                                id="academic_year_id"
                                name="academic_year_id"
                                options={academicYearOptions}
                                onChange={(selectedOption) => handleSelect2Change('academic_year_id', selectedOption)}
                                className="mt-1 block w-full"
                                placeholder="Pilih Tahun Ajaran"
                                // SET NILAI AWAL DENGAN MENCARI OBJEK OPSI
                                value={academicYearOptions.find(option => option.value === data.academic_year_id) || null}
                                required
                            />
                        </FormGroup>

                        {/* Dropdown Semester */}
                        <FormGroup label="Semester" htmlFor="semester_id" error={errors.semester_id}>
                            <Select2
                                id="semester_id"
                                name="semester_id"
                                options={semesterOptions}
                                onChange={(selectedOption) => handleSelect2Change('semester_id', selectedOption)}
                                className="mt-1 block w-full"
                                placeholder="Pilih Semester"
                                // SET NILAI AWAL DENGAN MENCARI OBJEK OPSI
                                value={semesterOptions.find(option => option.value === data.semester_id) || null}
                                required
                            />
                        </FormGroup>

                        {/* Input Nomor Absen */}
                        <FormGroup
                            label="Nomor Absen"
                            htmlFor="no_absen"
                            error={errors.no_absen}
                        >
                            <input
                                type="number"
                                id="no_absen"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.no_absen}
                                onChange={(e) => setData('no_absen', e.target.value)}
                                placeholder="Masukkan nomor absen (opsional)"
                            />
                        </FormGroup>

                        <div className="flex justify-end gap-4 mt-4">
                            <CancelButton href={route(`${routeResourceName}.index`)}>
                                Batal
                            </CancelButton>
                            <PrimaryButton type="submit" disabled={processing}>
                                Perbarui
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}