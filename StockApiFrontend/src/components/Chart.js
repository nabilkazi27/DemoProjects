import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import classes from "./Chart.module.css";
import { Line } from "react-chartjs-2";
import LoadingSpinner from "./UI/LoadingSpinner";

const Chart = (props) => {
  const [loading, setLoading] = useState(true);

  const { labels, label, data, category } = props;

  const chartData = {
    labels: labels, //["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: label,
        data: data, //[12, 19, 3, 5, 2, 3],
        fill: false,
        borderWidth: 1,
        backgroundColor: "rgb(0, 0, 200)",
        borderColor: "rgba(0, 0, 200, 0.2)",
      },
    ],
  };

  // const options = {
  //   scales: {
  //     x: {
  //       type: "time",
  //     },
  //     // yAxes: [
  //     //   {
  //     //     ticks: {
  //     //       beginAtZero: true,
  //     //     },
  //     //   },
  //     // ],
  //   },
  // };

  const options = {};

  useEffect(() => {
    setLoading(false);
  }, [data, labels]);

  const categoryList = category.map((cat) => (
    <option value={cat}>{cat}</option>
  ));

  const onCategoryChangeHandler = (event) => {
    setLoading(true);
    props.onCategoryChanged(event.target.value);
  };

  const categoryIsEmpty = data.length === 0;

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={props.onClose} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>
          <div>
            <label htmlFor="category">Category:&nbsp;</label>
            <select
              className={classes.select}
              id="category"
              onChange={onCategoryChangeHandler}
            >
              <option>Select Category</option>
              {categoryList}
            </select>
            <span
              className={`${classes.divRight} ${classes.button}`}
              onClick={props.onClose}
            >
              x
            </span>
          </div>
          <hr />
          {!categoryIsEmpty && (
            <Line
              className={classes.chart}
              data={chartData}
              options={options}
            />
          )}
          {loading && (
            <div className={classes.centered}>
              <LoadingSpinner />
            </div>
          )}
          {categoryIsEmpty && !loading && (
            <p className={classes.centered}>No Category Selected</p>
          )}
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Chart;
