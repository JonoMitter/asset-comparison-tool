import { GraphDataPoint } from "./GraphDataPoint";

export type GraphDataSet = {
  label: string;
  color: string;
  data: GraphDataPoint[];
};