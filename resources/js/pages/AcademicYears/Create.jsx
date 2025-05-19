// resources/js/Pages/AcademicYears/Create.jsx

import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import FormGroup from '@/components/molecules/FormGroup';
import SubmitButton from '@/components/molecules/SubmitButton'; // Ganti dengan PrimaryButton jika itu komponen Anda
import CancelButton from '@/components/molecules/CancelButton';

export default function Create({ auth }) { // Menerima prop 'auth'
    const { data, setData, post, processing, errors } = useForm({
        nama_tahun_ajaran: '',
        tahun_mulai: '',
        tahun_selesai: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('academic-years.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth} // <--- PERBAIKAN: Lewatkan seluruh objek 'auth' sebagai prop bernama 'auth'
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Tahun Ajaran</h2>}
        >
            <Head title="Tambah Tahun Ajaran" />

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
                                className="form-input w-full" // Sesuaikan class styling input Anda
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
                                className="form-input w-full" // Sesuaikan class styling input Anda
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
                                className="form-input w-full" // Sesuaikan class styling input Anda
                            />
                        </FormGroup>

                        <div className="flex items-center justify-end gap-4">
                            {/* Gunakan Link dari Inertia jika CancelButton adalah komponen Link */}
                            <CancelButton href={route('academic-years.index')} />
                            {/* Gunakan PrimaryButton jika SubmitButton adalah komponen PrimaryButton */}
                            <SubmitButton processing={processing}>Simpan</SubmitButton>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
