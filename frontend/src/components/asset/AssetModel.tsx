import { DataSet } from "../../types/Types";
import { AssetInput } from "./AssetInput";

export abstract class AssetModel {
  abstract calculate(input: AssetInput): DataSet;
}
