import React from 'react';

interface PeriodData {
  period: number;
  mortgagePayment: number;
  principal: number;
  interest: number;
  totalAssetValue: number;
  principalPaid: number;
  propertyValueOwned: number;
}

type HouseAssetTableProps = {
  data: PeriodData[];
};

const HouseAssetTable: React.FC<HouseAssetTableProps> = ({ data }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatValue = (key: string, value: number): string => {
    if (key === 'period') {
      return value.toString();
    }
    return value > 0 ? formatCurrency(value) : '-';
  };

  const getColumnHeader = (key: string): string => {
    // Convert camelCase to Title Case
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available
      </div>
    );
  }

  const columns = Object.keys(data[0]) as (keyof PeriodData)[];

  return (
    <div className="overflow-x-auto">      
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th 
                key={column} 
                className={`border border-gray-300 px-4 py-2 font-medium text-gray-700 ${
                  column === 'period' ? 'text-left' : 'text-right'
                }`}
              >
                {getColumnHeader(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.period}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              {columns.map((column) => (
                <td 
                  key={column} 
                  className={`border border-gray-300 px-4 py-2 text-gray-700 ${
                    column === 'period' ? 'text-left font-medium' : 'text-right'
                  } ${
                    column === 'propertyValueOwned' ? 'font-semibold text-green-700' : ''
                  } ${
                    column === 'totalAssetValue' ? 'font-medium text-gray-800' : ''
                  }`}
                >
                  {formatValue(column, row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HouseAssetTable;