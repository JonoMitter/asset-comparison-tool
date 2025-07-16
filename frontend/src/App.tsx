import React from 'react';
import './App.css';
import MultiLineGraph from './components/graph/MultiLineGraph';
import DataTable from './components/graph/DataTable';
import { HouseAsset } from './models/assets/HouseAsset';
import { StockAsset } from './models/assets/StockAsset';
import { GraphDataSet } from './models/datasets/GraphDataSet';
import { TableDataSet } from './models/datasets/TableDataSet';
import { PeriodData } from './models/datasets/PeriodData';

// Global
let years = 30;
let deposit = 100000; // $, TODO - also need to allow percentage
let startingRent = 1300; // $ per month
let rentGrowthRate = 3.0; // % per year

// Stock
let stockGrowthRatePa = 8.0; // %
let brokerageCost = 2; // Dollars

// House
let houseGrowthRatePa = 3.0;
let purchasePrice = 350000;
let interestRatePa = 5.0;
let bodyCorporate = 0;
let maintenance = 0;
let homeInsurance = 0;
let councilRates = 0;
let waterRates = 0;
let landTax = 0;
let costsInflation = 3;
let ownershipCosts = bodyCorporate + maintenance + homeInsurance + councilRates + waterRates + landTax;
let offsetAccountBalance = 0;

const stock = new StockAsset({
  name: "ETFs",
  color: '#2196F3',
  deposit: deposit,
  growthRatePa: stockGrowthRatePa,
  years: years,
  brokerageCost: brokerageCost
});

const house = new HouseAsset({
  name: "PPOR",
  color: '#4CAF50',
  purchasePrice: purchasePrice,
  deposit: deposit,
  interestRatePa: interestRatePa,
  growthRatePa: houseGrowthRatePa,
  offsetAccountBalance: offsetAccountBalance,
  years: years
});

let assets = [stock, house];

let graphData: GraphDataSet[] = [];
for (let asset of assets) {
  graphData.push(asset.getGraphData());
}

let tableData: PeriodData[] = [];
// for (let asset of assets) {
//   tableData= asset.getTableData());
// }

tableData= house.getTableData();

function App() {
  return (
    <div>
      <div className="InputsContainer">
        <div>
          <h2>Global Inputs</h2>
          <div>
            years: {years} <br />
            deposit: ${deposit} <br />
            startingRent: ${startingRent} p.m.<br />
            rentGrowthRate: {rentGrowthRate} p.a.<br />
          </div>
        </div>
        <div>
          <h2>Stock Inputs</h2>
          <div>
            stockGrowthRate: {stockGrowthRatePa}% p.a. <br />
            brokerageCost: ${brokerageCost}
          </div>
        </div>
        <div>
          <h2>PPOR Inputs</h2>
          <div>
            houseGrowthRate: {houseGrowthRatePa}% p.a. <br />
            purchasePrice: ${purchasePrice} <br />
            bodyCorporate: ${bodyCorporate} <br />
            maintenance: ${maintenance} <br />
            homeInsurance: ${homeInsurance} <br />
            councilRates: ${councilRates} <br />
            waterRates: ${waterRates} <br />
            landTax: ${landTax} <br />
            costsInflation: {costsInflation}% p.a. <br />
            ownershipCosts: ${ownershipCosts} <br />
          </div>
        </div>
      </div>
      <div className="App">
        <h1>Asset Value Over Time</h1>
        <MultiLineGraph datasets={graphData} width={600} height={400} />

        <h1>Data Table</h1>
        <DataTable data={tableData} />
      </div>
    </div>
  );
}

export default App;
