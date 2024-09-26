import React, { useState } from 'react';

interface ITable {
    columns: any[]
    data: any[]
    onEdit: (id: string) => void
    onDelete: (id: number) => void
}

const Table = ({ columns, data, onEdit }: ITable) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (accessor: string, value: string) => {
    setFilters({
      ...filters,
      [accessor]: value,
    });
  };

  const filteredData = data.filter(row => {
    return columns.every(column => {
      const value = filters[column.accessor];
      if (!value) return true;
      if (column.accessor === 'completed') {
        return row[column.accessor].toLowerCase() === value.toLowerCase();
      }
      return row[column.accessor].toString().toLowerCase().includes(value.toLowerCase());
    });
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                {column.Header}
                <div>
                  <input
                    type="text"
                    placeholder={`Filter ${column.Header}`}
                    value={filters[column.accessor] || ''}
                    onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
                    className="mt-1 p-1 border border-gray-300 rounded"
                  />
                </div>
              </th>
            ))}
            <th className="center py-2 px-4 border-b border-gray-200 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              {columns.map((column) => (
                <td key={column.accessor} className="py-2 px-4 border-b border-gray-200 text-gray-800">
                  {row[column.accessor]}
                </td>
              ))}
              <td className='className="py-2 px-4 border-b border-gray-200 text-gray-800"'>
                <div className="inline-flex">
                    <button onClick={() => onEdit(row.id)} className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-r">
                        Delete
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
