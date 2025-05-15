// resources/js/components/organisms/Table.jsx

import React from 'react';
// Import organisme Card yang distandarisasi - digunakan untuk membungkus tabel di halaman
import Card from './Card';

// Komponen utama Table - ini adalah elemen <table> itu sendiri
const Table = ({ children }) => {
    return (
        <div className="w-full overflow-hidden overflow-x-auto border-collapse rounded-b-lg border border-t-0">
            <table className="w-full text-sm">
                {/* Filter whitespace text nodes */}
                {React.Children.toArray(children).filter(child => 
                    typeof child !== 'string' || child.trim() !== ''
                )}
            </table>
        </div>
    );
};

// Sub-komponen spesifik untuk elemen tabel (<thead>, <tbody>, <td>, <th>, pesan kosong)
// Komponen-komponen ini tetap didefinisikan di file Table.jsx
const Thead = ({ className, children }) => {
    return (
        <thead className={`${className} border-b bg-gray-50`}>
            {/* Filter whitespace text nodes from tr children */}
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === 'tr') {
                    // If the child is a tr, filter its children (th elements)
                    const filteredTrChildren = React.Children.toArray(child.props.children).filter(trChild =>
                        typeof trChild !== 'string' || trChild.trim() !== ''
                    );
                    // Clone the tr element with the filtered children
                    return React.cloneElement(child, {}, filteredTrChildren);
                }
                // Otherwise, return the child as is (should ideally be only tr)
                return child;
            }).filter(child => typeof child !== 'string' || child.trim() !== '')}
        </thead>
    );
};

const Tbody = ({ className, children }) => {
    return (
        <tbody className={`${className} divide-y bg-white`}>
            {/* Filter whitespace text nodes from tr children */}
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === 'tr') {
                    // If the child is a tr, filter its children (td elements)
                    const filteredTrChildren = React.Children.toArray(child.props.children).filter(trChild =>
                        typeof trChild !== 'string' || trChild.trim() !== ''
                    );
                    // Clone the tr element with the filtered children
                    return React.cloneElement(child, {}, filteredTrChildren);
                }
                // Otherwise, return the child as is
                return child;
            }).filter(child => typeof child !== 'string' || child.trim() !== '')}
        </tbody>
    );
};

const Td = ({ className, children}) => {
    return (
        <td
            className={`${className} whitespace-nowrap p-4 align-middle text-gray-700`}
        >
            {children}
        </td>
    );
};

const Th = ({ className, children }) => {
    return (
        <th
            scope="col" // Scope untuk header kolom
            className={`${className} h-12 px-4 text-left align-middle font-medium text-gray-700`}
        >
            {children}
        </th>
    );
};

// Komponen untuk menampilkan pesan jika tabel kosong
const Empty = ({ colSpan, message, children }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        {children}
                        <div className="mt-5">
                            {message}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};


// Ekspor komponen utama Table sebagai default
// Ekspor sub-komponen sebagai properti dari objek Table
// Ekspor Card di sini DIHAPUS, karena Card diimpor dari file terpisah
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Th = Th;
Table.Empty = Empty;

export default Table;
