import React from 'react';
import './App.css';
import MultiLineGraph from './components/graph/MultiLineGraph';
import { GraphDataSet } from './types/Types';
import DataTable from './components/graph/DataTable';
import { HouseAsset } from './models/HouseAsset';
import { StockAsset } from './models/StockAsset';

// Global
let years = 30;
let deposit = 17500; // Flat, TODO - also need to allow percentage
let startingRent = 1300; // $ per month
let rentGrowthRate = 3; // % per year

// Stock
let stockGrowthRatePa = 8.0; // %
let brokerageCost = 3; // Dollars

const stock = new StockAsset({
  name: "ETFs",
  color: '#2196F3',
  purchasePrice: 0, // Not used for stocks
  deposit: deposit,
  interestRatePa: 0, // Not used for stocks
  growthRatePa: stockGrowthRatePa,
  offsetAccountBalance: 0, // Not used for stocks
  years: years,
});

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

let datasets: GraphDataSet[] = [];
for (let asset of assets) {
  datasets.push(asset.getGraphData());
}

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
        <h1>Multi Dataset Line Graph</h1>
        <MultiLineGraph datasets={datasets} width={600} height={400} />
        <DataTable datasets={datasets} />
      </div>
    </div>
  );
}

export default App;
