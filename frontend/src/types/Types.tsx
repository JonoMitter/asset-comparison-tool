export type GraphDataPoint = {
  period: number;
  value: number;
};

export type GraphDataSet = {
  label: string;
  color: string;
  data: GraphDataPoint[];
};

export type TableDataSet = {
  label: string;
  color: string;
  data: GraphDataPoint[];
};