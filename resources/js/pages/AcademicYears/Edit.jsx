// resources/js/Pages/AcademicYears/Create.jsx

import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import FormGroup from '@/components/molecules/FormGroup';
import SubmitButton from '@/components/molecules/SubmitButton';
import CancelButton from '@/components/molecules/CancelButton';

export default function Edit({ auth, academicYear }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_tahun_ajaran: '',
        tahun_mulai: '',
        tahun_selesai: '',
    });

    // Use useEffect to populate the form when the academicYear prop changes
    React.useEffect(() => {
        if (academicYear) {
            setData({
                nama_tahun_ajaran: academicYear.nama_tahun_ajaran,
                tahun_mulai: academicYear.tahun_mulai,
                tahun_selesai: academicYear.tahun_selesai,
            });
        }
    }, [academicYear]); // Rerun this effect when academicYear prop changes

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('academic-years.update', academicYear.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Tahun Ajaran</h2>}
        >
            <Head title="Edit Tahun Ajaran" />

            <Container>
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormGroup
                            label="Nama Tahun Ajaran"
                            htmlFor="nama_tahun_ajaran"
                            error={errors.nama_tahun_ajaran}
                        >
                            <input
                                id="nama_tahun_ajaran"
                                type="text"
                                value={data.nama_tahun_ajaran}
                                onChange={(e) => setData('nama_tahun_ajaran', e.target.value)}
                                className="form-input w-full"
                            />
                        </FormGroup>

                        <FormGroup
                            label="Tahun Mulai"
                            htmlFor="tahun_mulai"
                            error={errors.tahun_mulai}
                        >
                            <input
                                id="tahun_mulai"
                                type="number"
                                value={data.tahun_mulai}
                                onChange={(e) => setData('tahun_mulai', e.target.value)}
                                className="form-input w-full"
                            />
                        </FormGroup>

                        <FormGroup
                            label="Tahun Selesai"
                            htmlFor="tahun_selesai"
                            error={errors.tahun_selesai}
                        >
                            <input
                                id="tahun_selesai"
                                type="number"
                                value={data.tahun_selesai}
                                onChange={(e) => setData('tahun_selesai', e.target.value)}
                                className="form-input w-full"
                            />
                        </FormGroup>

                        <div className="flex items-center justify-end gap-4">
                            <CancelButton href={route('academic-years.index')} />
                            <SubmitButton processing={processing}>Perbarui</SubmitButton>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}