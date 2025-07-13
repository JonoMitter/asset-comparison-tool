import React from 'react';
import './App.css';
import MultiLineGraph from './components/graph/MultiLineGraph';
import { DataSet } from './types/Types';
import { StockAsset } from './components/asset/StockAsset';
import { HouseAsset } from './components/asset/HouseAsset';

const datasetsConst: DataSet[] = [
  {
    label: 'Dataset A',
    color: '#ff6347',
    data: [
      { period: 0, value: 110000 },
      { period: 1, value: 125000 },
      { period: 2, value: 140000 },
      { period: 3, value: 155000 },
    ],
  },
  {
    label: 'Dataset B',
    color: '#4682b4',
    data: [
      { period: 0, value: 110000 },
      { period: 1, value: 130000 },
      { period: 2, value: 140000 },
      { period: 3, value: 150000 },
    ],
  },
];

// Global
let years = 2;
let deposit = 50000; // Flat, TODO - also need to allow percentage
let startingRent = 1300; // $ per month
let rentGrowthRate = 0.03; // % per year

// Stock
const stock = new StockAsset();
let stockGrowthRate = 0.10;

// House
const house = new HouseAsset();
let HouseGrowthRate = 0.06;
let purchasePrice = 700000;

let bodyCorporate=0;
let maintenance=0;
let homeInsurance=0;
let councilRates=0;
let waterRates=0;
let landTax=0;
let costsInflation=0.03;
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
    growthRatePa: HouseGrowthRate, 
    purchasePrice: purchasePrice,
    interestRate: 0.05,
    ownershipCosts: ownershipCosts,
    ownershipCostsInflation: costsInflation,
  }),
];

function App() {
  return (
    <div className="App">
      <h1>Multi Dataset Line Graph</h1>
      <MultiLineGraph datasets={datasets} width={600} height={400} />
    </div>
  );
}

export default App;
