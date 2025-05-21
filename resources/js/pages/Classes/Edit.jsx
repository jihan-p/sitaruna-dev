// resources/js/Pages/Classes/Edit.jsx

import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import FormGroup from '@/components/molecules/FormGroup';
import TextInput from '@/components/atoms/TextInput';
import Select2 from '@/components/molecules/Select2'; // Menggunakan Select2 untuk dropdown
import PrimaryButton from '@/components/molecules/PrimaryButton';
import CancelButton from '@/components/molecules/CancelButton';


export default function Edit({ auth, class: classData, majors }) { // Menerima prop 'class' dan 'majors'
    // Menggunakan 'classData' sebagai nama prop untuk menghindari konflik dengan reserved keyword 'class'
    const { data, setData, put, processing, errors, reset } = useForm({
        nama_kelas: '',
        major_id: '',
    });

    // Format data majors untuk prop 'options' Select2
    const majorOptions = majors.map(major => ({
        value: major.id,
        label: major.nama_jurusan,
    }));

    // Isi form saat komponen dimuat atau data 'classData' berubah
    useEffect(() => {
        if (classData) {
            setData({
                nama_kelas: classData.nama_kelas,
                major_id: classData.major_id,
            });
        }
    }, [classData]);

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
        put(route('classes.update', classData.id), { // Kirim request PUT ke route update
            onSuccess: () => {
                // Inertia akan otomatis me-redirect ke halaman index
            },
        });
    };

    const routeResourceName = 'classes';


    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Kelas</h2>}
        >
            <Head title="Edit Kelas" />

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
                            />
                        </FormGroup>

                        <FormGroup label="Jurusan" htmlFor="major_id" error={errors.major_id}>
                            <Select2
                                id="major_id"
                                name="major_id"
                                options={majorOptions}
                                onChange={handleSelect2Change}
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
                                Perbarui
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
