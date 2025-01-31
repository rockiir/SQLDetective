import React from 'react';

const QueryResultTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-red-300 italic">No traces found...</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto bg-gray-900 border border-yellow-700 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-yellow-900 text-yellow-300">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b border-yellow-700 px-4 py-2 text-left uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-800 transition duration-200"
            >
              {headers.map((header, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2 border-b border-gray-700 text-yellow-100"
                >
                  {JSON.stringify(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryResultTable;