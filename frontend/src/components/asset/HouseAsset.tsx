import { DataSet } from "../../types/Types";
import { AssetInput } from "./AssetInput";
import { AssetModel } from "./AssetModel";

export class HouseAsset extends AssetModel {
  calculate(input: AssetInput): DataSet {
    const { name, deposit, growthRatePa, purchasePrice, interestRate, ownershipCosts, ownershipCostsInflation, years, color } = input;
    const data = [];

    let interestRateDecimal = interestRate / 100;
    let growthRateDecimal = growthRatePa / 100;

    let residualMortgage = purchasePrice - deposit;
    let mortgagePayment = (purchasePrice - deposit) * (interestRateDecimal / 12) / (1 - Math.pow(1 + interestRateDecimal / 12, -years * 12));
    let offsetAccountBalance = 0;
    let interestPayment = (interestRateDecimal / 12) * (residualMortgage - offsetAccountBalance);
    let principalPayment = mortgagePayment - interestPayment;
    let assetValue = purchasePrice;
    let principalPaid = 0;
    let propertyValueOwned = deposit;

    let growthRatePm = Math.pow(1 + growthRateDecimal, 1 / 12);
    let months = years * 12;

    for (let period = 0; period <= months; period++) {
      if (period === 0) {
        data.push({ period: period, value: deposit });
      }
      else {
        assetValue = assetValue * growthRatePm;
        principalPaid = + principalPayment;
        propertyValueOwned = assetValue - residualMortgage + principalPayment;
        data.push({ period: period, value: propertyValueOwned });
      }
    }

    return {
      label: name || "Stock",
      color: color || '#dd4477',
      data,
    };
  }
}
