import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import PrimaryButton from '@/components/molecules/PrimaryButton';
import FormGroup from '@/components/molecules/FormGroup';
import Select2 from '@/components/molecules/Select2';
import CancelButton from '@/components/molecules/CancelButton';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Create({ auth }) {
    const routeResourceName = 'enrollments';

    const { students, classes, academic_years, semesters } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        class_id: '',
        academic_year_id: '',
        semester_id: '',
        no_absen: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('enrollments.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Pendaftaran</h2>}
        >
            <Head title="Tambah Pendaftaran" />

            <Container>
                <Card title="Form Tambah Pendaftaran">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormGroup
                            label="Siswa"
                            htmlFor="student_id"
                            error={errors.student_id}
                        >
                            <Select2
                                id="student_id"
                                value={data.student_id}
                                onChange={(e) => setData('student_id', e.target.value)}
                            >
                                <option value="">-- Pilih Siswa --</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.nisn} - {student.nama_lengkap}
                                    </option>
                                ))}
                            </Select2>
                        </FormGroup>

                        <FormGroup
                            label="Kelas"
                            htmlFor="class_id"
                            error={errors.class_id}
                        >
                            <Select2
                                id="class_id"
                                value={data.class_id}
                                onChange={(e) => setData('class_id', e.target.value)}
                            >
                                <option value="">-- Pilih Kelas --</option>
                                {classes.map((kelas) => (
                                    <option key={kelas.id} value={kelas.id}>
                                        {kelas.nama_kelas} - {kelas.major.nama_jurusan}
                                    </option>
                                ))}
                            </Select2>
                        </FormGroup>

                        <FormGroup
                            label="Tahun Ajaran"
                            htmlFor="academic_year_id"
                            error={errors.academic_year_id}
                        >
                            <Select2
                                id="academic_year_id"
                                value={data.academic_year_id}
                                onChange={(e) => setData('academic_year_id', e.target.value)}
                            >
                                <option value="">-- Pilih Tahun Ajaran --</option>
                                {academic_years.map((year) => (
                                    <option key={year.id} value={year.id}>
                                        {year.nama_tahun_ajaran}
                                    </option>
                                ))}
                            </Select2>
                        </FormGroup>

                        <FormGroup
                            label="Semester"
                            htmlFor="semester_id"
                            error={errors.semester_id}
                        >
                            <Select2
                                id="semester_id"
                                value={data.semester_id}
                                onChange={(e) => setData('semester_id', e.target.value)}
                            >
                                <option value="">-- Pilih Semester --</option>
                                {semesters.map((semester) => (
                                    <option key={semester.id} value={semester.id}>
                                        {semester.nama_semester}
                                    </option>
                                ))}
                            </Select2>
                        </FormGroup>

                        <FormGroup
                            label="Nomor Absen"
                            htmlFor="no_absen"
                            error={errors.no_absen}
                        >
                            <input
                                type="number"
                                id="no_absen"
                                className="input input-bordered w-full"
                                value={data.no_absen}
                                onChange={(e) => setData('no_absen', e.target.value)}
                                placeholder="Masukkan nomor absen"
                            />
                        </FormGroup>

                        <div className="flex justify-end gap-4">
                            <CancelButton href={route(`${routeResourceName}.index`)}>
                                Batal
                            </CancelButton>
                            <PrimaryButton type="submit" disabled={processing}>
                                Simpan
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
