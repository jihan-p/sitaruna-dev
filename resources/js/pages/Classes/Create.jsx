// resources/js/Pages/Classes/Create.jsx

import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import FormGroup from '@/components/molecules/FormGroup';
import TextInput from '@/components/atoms/TextInput';
import Select2 from '@/components/molecules/Select2'; // Menggunakan Select2 untuk dropdown
import PrimaryButton from '@/components/molecules/PrimaryButton';
import CancelButton from '@/components/molecules/CancelButton';


export default function Create({ auth, majors }) { // Menerima prop 'majors'
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_kelas: '',
        major_id: '', // State untuk select Jurusan (simpan ID)
    });

    // Format data majors untuk prop 'options' Select2
    const majorOptions = majors.map(major => ({
        value: major.id,
        label: major.nama_jurusan,
    }));

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    // Handler khusus untuk Select2
    const handleSelect2Change = (selectedOption) => {
        setData('major_id', selectedOption ? selectedOption.value : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('classes.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const routeResourceName = 'classes';


    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Kelas</h2>}
        >
            <Head title="Tambah Kelas" />

            <Container>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <FormGroup label="Nama Kelas" htmlFor="nama_kelas" error={errors.nama_kelas}>
                            <TextInput
                                id="nama_kelas"
                                name="nama_kelas"
                                value={data.nama_kelas}
                                onChange={handleInputChange}
                                className="mt-1 block w-full"
                                required
                                isFocused
                            />
                        </FormGroup>

                        <FormGroup label="Jurusan" htmlFor="major_id" error={errors.major_id}>
                            <Select2
                                id="major_id"
                                name="major_id"
                                options={majorOptions}
                                onChange={handleSelect2Change} // Gunakan handler khusus Select2
                                className="mt-1 block w-full"
                                placeholder="Pilih Jurusan"
                                value={majorOptions.find(option => option.value === data.major_id)} // Set nilai awal Select2
                                required
                            />
                        </FormGroup>

                        <div className="flex items-center justify-end mt-4">
                            <Link href={route(`${routeResourceName}.index`)}>
                                <CancelButton className="ms-4">Batal</CancelButton>
                            </Link>

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Simpan
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
