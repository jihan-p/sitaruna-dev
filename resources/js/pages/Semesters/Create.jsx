import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import PrimaryButton from '@/components/molecules/PrimaryButton';
import TextInput from '@/components/atoms/TextInput';
import Select2 from '@/components/molecules/Select2';
import Checkbox from '@/components/atoms/Checkbox';
import hasAnyPermission from '@/utils/Permissions';

export default function Create({ auth, academicYears }) {
  const { data, setData, post, processing, errors } = useForm({
    nama_semester: '',
    tahun_ajaran_id: '',
    is_active: false,
  });

  const routeResource = 'semesters';

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route(`${routeResource}.store`), {
      onError: () => {
        // focus or other logic
      },
    });
  };

  // Map academicYears to react-select options
  const options = academicYears.map((year) => ({
    value: year.id,
    label: year.nama_tahun_ajaran,
  }));

  return (
    <AuthenticatedLayout
      auth={auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Semester</h2>}
    >
      <Head title="Tambah Semester" />

      <Container>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nama_semester" className="block text-sm font-medium text-gray-700">
                Nama Semester
              </label>
              <TextInput
                id="nama_semester"
                name="nama_semester"
                value={data.nama_semester}
                onChange={(e) => setData('nama_semester', e.target.value)}
                className="mt-1 block w-full"
              />
              {errors.nama_semester && (
                <p className="text-red-600 text-sm mt-1">{errors.nama_semester}</p>
              )}
            </div>

            <div>
              <label htmlFor="tahun_ajaran_id" className="block text-sm font-medium text-gray-700">
                Tahun Ajaran
              </label>
              <Select2
                options={options}
                placeholder="Pilih Tahun Ajaran"
                defaultValue={options.find((o) => o.value === data.tahun_ajaran_id) || null}
                onChange={(option) => setData('tahun_ajaran_id', option ? option.value : '')}
                className="mt-1"
              />
              {errors.tahun_ajaran_id && (
                <p className="text-red-600 text-sm mt-1">{errors.tahun_ajaran_id}</p>
              )}
            </div>

            <div className="flex items-center">
              <Checkbox
                id="is_active"
                name="is_active"
                checked={data.is_active}
                onChange={(e) => setData('is_active', e.target.checked)}
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                Aktif
              </label>
            </div>

            <div className="flex justify-end space-x-2">
              <Link
                href={route(`${routeResource}.index`)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Batal
              </Link>
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
