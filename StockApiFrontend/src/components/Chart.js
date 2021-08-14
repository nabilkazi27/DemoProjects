import ReactDOM from "react-dom";

import classes from "./Chart.module.css";
import { Line } from "react-chartjs-2";

const Chart = (props) => {
  const data = {
    labels: props.labels, //["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: props.label,
        data: props.data, //[12, 19, 3, 5, 2, 3],
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

  const category = props.category.map((cat) => (
    <option value={cat}>{cat}</option>
  ));

  const onCategoryChangeHandler = (event) => {
    props.onCategoryChanged(event.target.value);
  };

  const categoryIsEmpty = props.data.length === 0;

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
            <select id="category" onChange={onCategoryChangeHandler}>
              <option>Select Category</option>
              {category}
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
            <Line className={classes.chart} data={data} options={options} />
          )}
          {categoryIsEmpty && (
            <p className={classes.centered}>No Category Selected</p>
          )}
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Chart;
