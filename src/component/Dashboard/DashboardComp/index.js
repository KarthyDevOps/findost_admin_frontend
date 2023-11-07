import React, { useState, useEffect } from "react";
import "./style.scss";
import Chart from "react-apexcharts";
import { Progress } from "antd";
import { loginCount, monthlyReort, weeklyReort } from "service/Auth";
import { getDashboardDetails } from "service/leads";
import { Switch } from "antd";

const DashboardComp = () => {
  const [apData, setApData] = useState({
    apCount: "",
    completed: "",
    inprogress: "",
    rejected: "",
  });

  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [xaxis, setXaxis] = useState([]);
  const [xaxisMonth, setXaxisMonth] = useState([]);
  const [selectedOption, setSelectedOption] = useState("weekly");

  const handleToggle = (checked) => {
    setSelectedOption(checked ? "monthly" : "weekly");
  };

  const barSeries = monthlyData.map((x) => ({
    name: "Count",
    data: x,
  }));

  const barOptions = {
    chart: {
      type: "line",
      animations: {
        enabled: false,
        easing: "linear",
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
      zoom: {
        enabled: false,
      },
      stacked: false,
    },
    stroke: {
      width: 2,
      curve: "straight",
    },
    xaxis: {
      categories: xaxisMonth.map((x) => x),
    },
  };

  const columnOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "square",
        distributed: false,
        barHeight: "100%",
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: xaxis.map((x) => x),
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: false,
    },
  };

  const pieSeries = [apData?.completed, apData?.inprogress, apData?.rejected];

  const pieOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    labels: ["Completed AP", "Inprogress AP", "Rejected AP"],
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    noData: {
      text: "No Data ",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
  };

  const getLoginCount = async () => {
    const response = await loginCount();
    if (response.status === 200) {
      let data = response?.data?.data;
      setApData((pre) => ({
        ...pre,
        apCount: data,
      }));
    }
  };

  const getDashboard = async () => {
    try {
      const response = await getDashboardDetails();
      if (response.status === 200) {
        let data = response?.data?.data;
        setApData((pre) => ({
          ...pre,
          completed: data?.completedApCount,
          inprogress: data?.inProgressApCount,
          rejected: data?.rejectedApCount,
        }));
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const getLoginReport = async () => {
    try {
      const response = await weeklyReort();
      const response1 = await monthlyReort();
      if (response.status === 200 && response1.status === 200) {
        let data = response?.data?.data;
        let data1 = response1?.data?.data;
        setWeeklyData(data?.y_axis?.map((x) => x?.data));
        setXaxis(data?.x_axis);
        setMonthlyData(data1?.y_axis?.map((x) => x?.data));
        setXaxisMonth(data1?.x_axis);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    getLoginCount();
    getDashboard();
    getLoginReport();
  }, []);

  const filteredColumnSeries = weeklyData.map((series) => ({
    name: "Count",
    data: series.map((value) => value),
  }));

  return (
    <div className="DashBoard px-5 py-3">
      <p>Dashboard</p>
      <div className="d-flex align-items-center flex-wrap justify-content-between gap-3">
        <div className="DashBoard_section section_scroll p-4 m-0">
          <p>Completed AP</p>
          <span>{apData?.completed}</span>
        </div>
        <div className="DashBoard_section section_scroll p-4 m-0">
          <p>Inprogress AP</p>
          <span>{apData?.inprogress}</span>
        </div>
        <div className="DashBoard_section section_scroll p-4 m-0">
          <p>Rejected AP</p>
          <span>{apData?.rejected}</span>
        </div>
        <div className="DashBoard_section section_scroll p-4 m-0">
          <p>Number of Login Done By Today</p>
          <span>{apData?.apCount}</span>
        </div>
      </div>

      <div className="my-4">
        <div className="chart_background">
          <span className="px-2">AP Status</span>
          {/* {apData?.completed !== 0 &&
          apData?.inprogress !== 0 &&
          apData?.rejected !== 0 ? (
            <> */}
              <Chart
                options={pieOptions}
                series={pieSeries}
                type="pie"
                height={250}
              />
            {/* </>
          ) : (
            <div className="d-flex justify-content-center">
              No Data Available
            </div>
          )} */}
        </div>
      </div>
      <div className="my-4">
        <div className="chart_background">
          <div className="d-flex justify-content-between align-items-center toggle-area px-2">
            <span>
              {selectedOption === "monthly"
                ? "Monthly Login Report"
                : "Weekly Login Report"}
            </span>
            <Switch
              checkedChildren="Monthly"
              unCheckedChildren="Weekly"
              checked={selectedOption === "monthly"}
              onChange={handleToggle}
              style={{ backgroundColor: "#e47718" }}
              size={"default"}
            />
          </div>
          {selectedOption === "monthly" ? (
            <>
              <Chart
                options={barOptions}
                series={barSeries}
                type="line"
                height={350}
              />
            </>
          ) : (
            <>
              <Chart
                options={columnOptions}
                series={filteredColumnSeries}
                type="bar"
                height={350}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
