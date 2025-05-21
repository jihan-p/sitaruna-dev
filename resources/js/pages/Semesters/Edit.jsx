import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import FormGroup from '@/components/molecules/FormGroup';
import TextInput from '@/components/atoms/TextInput';
import Select2 from '@/components/molecules/Select2';
import CheckboxInput from '@/components/atoms/Checkbox';
import PrimaryButton from '@/components/molecules/PrimaryButton';
import CancelButton from '@/components/molecules/CancelButton';
import hasAnyPermission from '@/utils/Permissions';

export default function Edit({ auth, semester, academicYears }) {
  // Format options for Select2
  const academicYearOptions = academicYears.map(year => ({
    value: year.id,
    label: year.nama_tahun_ajaran,
  }));

  // Initialize form with existing semester data
  const { data, setData, put, processing, errors } = useForm({
    nama_semester: semester.nama_semester,
    tahun_ajaran_id: semester.tahun_ajaran_id,
    is_active: semester.is_active,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('semesters.update', semester.id), {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  const routeResource = 'semesters';

  return (
    <AuthenticatedLayout
      auth={auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Semester</h2>}
    >
      <Head title="Edit Semester" />
      <Container>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormGroup label="Nama Semester" htmlFor="nama_semester" error={errors.nama_semester}>
              <TextInput
                id="nama_semester"
                name="nama_semester"
                value={data.nama_semester}
                onChange={e => setData('nama_semester', e.target.value)}
                className="mt-1 block w-full"
                required
              />
            </FormGroup>

            <FormGroup label="Tahun Ajaran" htmlFor="tahun_ajaran_id" error={errors.tahun_ajaran_id}>
              <Select2
                options={academicYearOptions}
                value={academicYearOptions.find(o => o.value === data.tahun_ajaran_id) || null}
                onChange={option => setData('tahun_ajaran_id', option ? option.value : '')}
                placeholder="Pilih Tahun Ajaran"
                className="mt-1"
              />
            </FormGroup>

            <FormGroup label="Aktif" htmlFor="is_active" error={errors.is_active}>
              <div className="flex items-center">
                <CheckboxInput
                  id="is_active"
                  name="is_active"
                  checked={data.is_active}
                  onChange={e => setData('is_active', e.target.checked)}
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700"></label>
              </div>
            </FormGroup>

            <div className="flex justify-end space-x-2">
              <CancelButton href={route(`${routeResource}.index`)}>Batal</CancelButton>
              <PrimaryButton type="submit" disabled={processing}>Perbarui</PrimaryButton>
            </div>
          </form>
        </Card>
      </Container>
    </AuthenticatedLayout>
  );
}
