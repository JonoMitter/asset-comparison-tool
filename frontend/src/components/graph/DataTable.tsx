import React from 'react';
import { GraphDataSet } from '../../types/Types';

type TableProps = {
    datasets: GraphDataSet[];
};

const DataTable: React.FC<TableProps> = ({ datasets }) => {
    const allPeriods = Array.from(
        new Set(datasets.flatMap((d) => d.data.map((dp) => dp.period)))
    ).sort((a, b) => a - b);

    return (
        <div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Period</th>
                        {datasets.map((dataset, idx) => (
                            <th key={idx} style={thStyle}>
                                {dataset.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allPeriods.map((period) => (
                        <tr key={period}>
                            <td style={tdStyle}>{period}</td>
                            {datasets.map((dataset, idx) => {
                                const match = dataset.data.find((d) => d.period === period);
                                return (
                                    <td key={idx} style={tdStyle}>
                                        {match ? match.value.toFixed(2) : '-'}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Simple styling
const thStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
};

const tdStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '8px',
};

export default DataTable;
