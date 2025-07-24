import React, { useEffect, useState } from 'react';
import './App.css';
import MultiLineGraph from './components/graph/MultiLineGraph';
import DataTable from './components/graph/DataTable';
import { HouseAsset } from './models/assets/HouseAsset';
import { StockAsset } from './models/assets/StockAsset';
import { GraphDataSet } from './models/datasets/GraphDataSet';
import { TableDataSet } from './models/datasets/TableDataSet';
import { PeriodData } from './models/datasets/PeriodData';

function App() {
  // Global state
  const [years, setYears] = useState(30);
  const [deposit, setDeposit] = useState(100000);
  const [startingRent, setStartingRent] = useState(1300);
  const [rentGrowthRate, setRentGrowthRate] = useState(3.0);

  // Stock state
  const [stockGrowthRatePa, setStockGrowthRatePa] = useState(8.0);
  const [brokerageCost, setBrokerageCost] = useState(2);

  // House state
  const [houseGrowthRatePa, setHouseGrowthRatePa] = useState(3.0);
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [interestRatePa, setInterestRatePa] = useState(5.0);
  const [bodyCorporate, setBodyCorporate] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [homeInsurance, setHomeInsurance] = useState(0);
  const [councilRates, setCouncilRates] = useState(0);
  const [waterRates, setWaterRates] = useState(0);
  const [landTax, setLandTax] = useState(0);
  const [costsInflation, setCostsInflation] = useState(3);
  const [offsetAccountBalance, setOffsetAccountBalance] = useState(0);

  // Calculated values
  const [ownershipCosts, setOwnershipCosts] = useState(0);
  const [graphData, setGraphData] = useState([] as GraphDataSet[]);
  const [tableData, setTableData] = useState([] as PeriodData[]);

  // Update calculated values and regenerate data when inputs change
  useEffect(() => {
    const calculatedOwnershipCosts = bodyCorporate + maintenance + homeInsurance + councilRates + waterRates + landTax;
    setOwnershipCosts(calculatedOwnershipCosts);

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

    const assets = [stock, house];
    const newGraphData = assets.map(asset => asset.getGraphData());
    const newTableData = house.getTableData();

    setGraphData(newGraphData);
    setTableData(newTableData);
  }, [
    years, deposit, startingRent, rentGrowthRate, stockGrowthRatePa, brokerageCost,
    houseGrowthRatePa, purchasePrice, interestRatePa, bodyCorporate, maintenance,
    homeInsurance, councilRates, waterRates, landTax, costsInflation, offsetAccountBalance
  ]);

  const inputStyle = {
    width: '120px',
    padding: '4px 8px',
    margin: '2px 8px 2px 0',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };

  const sectionStyle = {
    margin: '20px 0',
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className="InputsContainer" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Global Inputs</h2>
          <div>
            <label>
              Years: 
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Deposit ($): 
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Starting Rent ($/month): 
              <input
                type="number"
                value={startingRent}
                onChange={(e) => setStartingRent(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Rent Growth Rate (% p.a.): 
              <input
                type="number"
                step="0.1"
                value={rentGrowthRate}
                onChange={(e) => setRentGrowthRate(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Stock Inputs</h2>
          <div>
            <label>
              Stock Growth Rate (% p.a.): 
              <input
                type="number"
                step="0.1"
                value={stockGrowthRatePa}
                onChange={(e) => setStockGrowthRatePa(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Brokerage Cost ($): 
              <input
                type="number"
                value={brokerageCost}
                onChange={(e) => setBrokerageCost(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>PPOR Inputs</h2>
          <div>
            <label>
              House Growth Rate (% p.a.): 
              <input
                type="number"
                step="0.1"
                value={houseGrowthRatePa}
                onChange={(e) => setHouseGrowthRatePa(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Purchase Price ($): 
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Interest Rate (% p.a.): 
              <input
                type="number"
                step="0.1"
                value={interestRatePa}
                onChange={(e) => setInterestRatePa(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Body Corporate ($): 
              <input
                type="number"
                value={bodyCorporate}
                onChange={(e) => setBodyCorporate(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Maintenance ($): 
              <input
                type="number"
                value={maintenance}
                onChange={(e) => setMaintenance(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Home Insurance ($): 
              <input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Council Rates ($): 
              <input
                type="number"
                value={councilRates}
                onChange={(e) => setCouncilRates(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Water Rates ($): 
              <input
                type="number"
                value={waterRates}
                onChange={(e) => setWaterRates(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Land Tax ($): 
              <input
                type="number"
                value={landTax}
                onChange={(e) => setLandTax(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Costs Inflation (% p.a.): 
              <input
                type="number"
                step="0.1"
                value={costsInflation}
                onChange={(e) => setCostsInflation(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Offset Account Balance ($): 
              <input
                type="number"
                value={offsetAccountBalance}
                onChange={(e) => setOffsetAccountBalance(Number(e.target.value))}
                style={inputStyle}
              />
            </label>
            <br />
            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Total Ownership Costs: ${ownershipCosts.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="App" style={{ marginTop: '30px' }}>
        <h1 style={{ color: '#333' }}>Asset Value Over Time</h1>
        <MultiLineGraph datasets={graphData} width={600} height={400} />

        <h1 style={{ color: '#333', marginTop: '30px' }}>Data Table</h1>
        <DataTable data={tableData} />
      </div>
    </div>
  );
}

export default App;