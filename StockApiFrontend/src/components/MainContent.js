import classes from "./MainContent.module.css";

import { useEffect, useState } from "react";
import "chartjs-adapter-moment";
import Chart from "./Chart";
import LoadingSpinner from "./UI/LoadingSpinner";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const categoryList = [
  "Open",
  "High",
  "Low",
  "Close",
  "WAP",
  "No Of Shares",
  "No of Trades",
  "Total Turnover",
  "Deliverable Quantity",
  "% Deliverable Quantity To Traded Quantity",
  "SpreadHL",
  "SpreadCO",
];

const MainContent = (props) => {
  const [stocks, setStocks] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (stocks.length > 0) {
      $(document).ready(function () {
        $("#stocks").DataTable();
      });
    }
  }, [stocks]);

  useEffect(() => {
    if (loadData) {
      fetch("https://localhost:5001/api/Stock", {
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          setStocks(data);
          setLoadData(false);
        })
        .catch((err) => console.log(err));
    }
  }, [loadData]);

  const stockIsEmpty = stocks.length === 0;

  const chartLabel = "";
  const chartLabels = [];
  let chartData;

  switch (category) {
    case "Open":
      chartData = stocks.map((stock) => stock.StockOpen);
      break;
    case "High":
      chartData = stocks.map((stock) => stock.StockHigh);
      break;
    case "Low":
      chartData = stocks.map((stock) => stock.StockLow);
      break;
    case "Close":
      chartData = stocks.map((stock) => stock.StockClose);
      break;
    case "WAP":
      chartData = stocks.map((stock) => stock.StockWAP);
      break;
    case "No Of Shares":
      chartData = stocks.map((stock) => stock.StockNoOfShares);
      break;
    case "No of Trades":
      chartData = stocks.map((stock) => stock.StockNoOfTrades);
      break;
    case "Total Turnover":
      chartData = stocks.map((stock) => stock.StockTotalTurnover);
      break;
    case "Deliverable Quantity":
      chartData = stocks.map((stock) => stock.StockDeliverableQuantity);
      break;
    case "% Deliverable Quantity To Traded Quantity":
      chartData = stocks.map(
        (stock) => stock.StockDeliverableQuantityToTradedQuantityPercent
      );
      break;
    case "SpreadHL":
      chartData = stocks.map((stock) => stock.StockSpreadHL);
      break;
    case "SpreadCO":
      chartData = stocks.map((stock) => stock.StockSpreadCO);
      break;
    default:
      chartData = [];
  }

  if (stocks.length > 0) {
    for (let stock of stocks) {
      chartLabels.push(stock.StockDate.split("T")[0]);
    }
  }

  const onCategoryChangedHandler = (category) => {
    setCategory(category);
  };

  const closeChartHandler = () => {
    setShowChart(false);
  };

  const openChartHandler = () => {
    setCategory("");
    setShowChart(true);
  };

  return (
    <>
      {!stockIsEmpty && !loadData && (
        <>
          <div className={classes.divRight}>
            <button className={classes.button} onClick={openChartHandler}>
              Show Chart
            </button>
          </div>
          <table id="stocks" className="display">
            <thead>
              <tr>
                <td>Date</td>
                <td>Open</td>
                <td>High</td>
                <td>Low</td>
                <td>Close</td>
                <td>WAP</td>
                <td>No. of Shares</td>
                <td>No. of Trades</td>
                <td>TotalTurnover</td>
                <td>Deliverable Quantity</td>
                <td>% Deliverable Quantity To Traded Quantity</td>
                <td>SpreadHL</td>
                <td>SpreadCO</td>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.StockDate}>
                  <td>{stock.StockDate.split("T")[0]}</td>
                  <td>{stock.StockOpen}</td>
                  <td>{stock.StockHigh}</td>
                  <td>{stock.StockLow}</td>
                  <td>{stock.StockClose}</td>
                  <td>{stock.StockWAP}</td>
                  <td>{stock.StockNoOfShares}</td>
                  <td>{stock.StockNoOfTrades}</td>
                  <td>{stock.StockTotalTurnover}</td>
                  <td>{stock.StockDeliverableQuantity}</td>
                  <td>
                    {stock.StockDeliverableQuantityToTradedQuantityPercent}
                  </td>
                  <td>{stock.StockSpreadHL}</td>
                  <td>{stock.StockSpreadCO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {loadData && (
        <div className={`${classes.divCentered} ${props.className}`}>
          <LoadingSpinner />
        </div>
      )}
      {stockIsEmpty && !loadData && (
        <div className={`${classes.divCentered} ${props.className}`}>
          <p className={classes.para}>No Stocks Found</p>
        </div>
      )}
      {showChart && (
        <Chart
          category={categoryList}
          onCategoryChanged={onCategoryChangedHandler}
          data={chartData}
          label={chartLabel}
          labels={chartLabels}
          onClose={closeChartHandler}
        />
      )}
    </>
  );
};

export default MainContent;
