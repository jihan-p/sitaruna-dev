import React from 'react';
import AuthenticatedLayout from '@/templates/AuthenticatedLayout';
import Container from '@/components/atoms/Container';
import Card from '@/components/organisms/Card';
import Table from '@/components/organisms/Table';
import Pagination from '@/components/molecules/Pagination';
import Search from '@/components/molecules/Search';
import AddButton from '@/components/molecules/AddButton';
import EditButton from '@/components/molecules/EditButton';
import DeleteButton from '@/components/molecules/DeleteButton';
import { Head, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/utils/Permissions';

export default function Index({ auth }) {
  const { majors, filters } = usePage().props;
  const resource = 'majors';

  return (
    <AuthenticatedLayout
      auth={auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Jurusan</h2>}
    >
      <Head title="Manajemen Jurusan" />

      <Container>
        <div className="mb-4 flex items-center justify-between gap-4">
          {hasAnyPermission([`${resource} create`]) && (
            <AddButton url={route(`${resource}.create`)}>Tambah Jurusan</AddButton>
          )}
          <div className="w-full md:w-4/6">
            <Search
              url={route(`${resource}.index`)}
              placeholder="Cari jurusan berdasarkan nama..."
              filter={filters}
            />
          </div>
        </div>

        <Card title="Daftar Jurusan">
          <Table>
            <Table.Thead>
              <tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Nama Jurusan</Table.Th>
                <Table.Th className="text-right">Aksi</Table.Th>
              </tr>
            </Table.Thead>
            <Table.Tbody>
              {majors.data.length > 0 ? (
                majors.data.map((major, i) => (
                  <tr key={major.id} className="bg-white border-b hover:bg-gray-50">
                    <Table.Td>{majors.from + i}</Table.Td>
                    <Table.Td>{major.nama_jurusan}</Table.Td>
                    <Table.Td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {hasAnyPermission([`${resource} edit`]) && (
                          <EditButton url={route(`${resource}.edit`, major.id)} />
                        )}
                        {hasAnyPermission([`${resource} delete`]) && (
                          <DeleteButton url={route(`${resource}.destroy`, major.id)} />
                        )}
                      </div>
                    </Table.Td>
                  </tr>
                ))
              ) : (
                <Table.Empty colSpan={3} message="Tidak ada data Jurusan." />
              )}
            </Table.Tbody>
          </Table>
        </Card>

        {majors.last_page > 1 && (
          <div className="flex items-center justify-center mt-4">
            <Pagination links={majors.links} />
          </div>
        )}
      </Container>
    </AuthenticatedLayout>
  );
}
