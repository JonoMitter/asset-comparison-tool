export type DataPoint = {
  period: number;
  value: number;
};

export type DataSet = {
  label: string;
  color: string;
  data: DataPoint[];
};