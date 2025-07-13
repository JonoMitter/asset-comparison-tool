import React from 'react';
import './App.css';
import MultiLineGraph from './components/graph/MultiLineGraph';
import { DataSet } from './types/Types';
import { StockAsset } from './components/asset/StockAsset';
import { HouseAsset } from './components/asset/HouseAsset';
import DataTable from './components/graph/DataTable';

// Global
let years = 30;
let deposit = 17500; // Flat, TODO - also need to allow percentage
let startingRent = 1300; // $ per month
let rentGrowthRate = 3; // % per year

// Stock
const stock = new StockAsset();
let stockGrowthRate = 8;
let brokerageCost = 3; // flat fixed amount

// House
const house = new HouseAsset();
let houseGrowthRate = 3;
let purchasePrice = 350000;

let interestRate = 5;

let bodyCorporate = 0;
let maintenance = 0;
let homeInsurance = 0;
let councilRates = 0;
let waterRates = 0;
let landTax = 0;
let costsInflation = 3;
let ownershipCosts = bodyCorporate + maintenance + homeInsurance + councilRates + waterRates + landTax;


const datasets: DataSet[] = [
  stock.calculate({
    name: "ETFs",
    color: '#2196F3',
    deposit: deposit,
    years: years,
    growthRatePa: stockGrowthRate,
  }),
  house.calculate({
    name: "PPOR",
    color: '#ff6347',
    deposit: deposit,
    years: years,
    growthRatePa: houseGrowthRate,
    purchasePrice: purchasePrice,
    interestRate: interestRate,
    ownershipCosts: ownershipCosts,
    ownershipCostsInflation: costsInflation,
  }),
];

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
            stockGrowthRate: {stockGrowthRate}% p.a. <br />
            brokerageCost: ${brokerageCost}
          </div>
        </div>
        <div>
          <h2>PPOR Inputs</h2>
          <div>
            houseGrowthRate = {houseGrowthRate}% p.a. <br />
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
