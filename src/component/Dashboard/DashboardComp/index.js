import React, { useState, useEffect } from "react";
import "./style.scss";
import Chart from "react-apexcharts";
import { Progress } from "antd";

const DashboardComp = () => {
  const sectionData = [
    {
      name: "Lorem ipsam",
      value: "563 k",
    },
    {
      name: "Lorem ipsam",
      value: "563 k",
    },
    {
      name: "Active AP",
      value: "83.2 k",
    },
    {
      name: "Product Lead Count",
      value: "94.6 k",
    },
    {
      name: "Lorem ipsam",
      value: "563 k",
    },
  ];
  const barSeries = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
      name: "Desktops",
      data: [21, 11, 45, 11, 69, 22, 59, 21, 48],
    },
    {
      name: "Desktops",
      data: [41, 61, 65, 21, 89, 12, 19, 91, 18],
    },
  ];
  const barOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    tooltip: {
      enabled: false,
    },
  };

  const columnSeries = [
    {
      name: "Graph name 1",
      data: [20, 0, 0, 0, 0, 0],

    },
    
    {
      name: "Graph name 2",
      data: [0, 11, 0, 0, 0, 0],
    },
    {
      name: "Graph name 3",
      data: [0, 0, 56, 0, 0, 0],
    },
    {
      name: "Graph name 4",
      data: [0, 0, 0, 70, 0, 0],
    },
    {
      name: "Graph name 4",
      data: [0, 0, 0, 0, 20, 0],
    },
    {
      name: "Graph name 5",
      data: [0, 0, 0, 0, 0, 15],
    },
    // Add more series as needed
  ];

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
        columnWidth: "80%", // Adjust the value here to set the desired width of each bar
        endingShape: "square",
        distributed: false,
        barHeight: "100%", // Adjust the value here to set the desired height of each bar
        dataLabels: {
          position: "top", // Adjust the position of data labels as needed
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
      categories: [""],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: false,
    },
  };
  
  

  const filteredColumnSeries = columnSeries.map((series) => ({
    name: series.name,
    data: series.data.filter((value) => value !== 0),
  }));

  const pieSeries = [44, 55, 13, 43];
  const donutSeries = [44, 55, 41, 17];

  const pieOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    labels: ["Team A", "Team B", "Team C", "Team D"],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
  };

  const donutOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Team A", "Team B", "Team C", "Team D"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
  };

  return (
    <div className="DashBoard px-5 py-3">
      <p>Dashboard</p>
      <div className="d-flex align-items-center flex-wrap justify-content-between gap-3">
        {sectionData.map((data) => {
          return (
            <div className="DashBoard_section section_scroll p-4 m-0">
              <p>{data.value}</p>
              <span>{data.name}</span>
            </div>
          );
        })}
      </div>
      <div className="d-flex flex-wrap align-items-center my-4">
        <div className="chart_background2 mr-2">
          <span>Lorem ipsem</span>
          <Chart
            // options={{
            //   ...columnOptions,

            // }}
            options={columnOptions}
            series={filteredColumnSeries}
            type="bar"
            height={350}
          />

        
        </div>
        <div className="chart_background">
          <span>Lorem ipsemmm</span>
          <Chart
            options={{
              ...barOptions,
              stroke: {
                width: 1,
              },
            }}
            series={barSeries}
            type="line"
            height={350}
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 my-4">
        <div className="chart_background1">
          <span>Lorem ipsem</span>
          <Progress percent={30} showInfo={false} />
          <div className="progress_details">
            <p>Graph Name 1</p>
            <span>150</span>
          </div>
          <Progress percent={60} showInfo={false} />
          <div className="progress_details">
            <p>Graph Name 1</p>
            <span>150</span>
          </div>
          <Progress percent={75} showInfo={false} />
          <div className="progress_details">
            <p>Graph Name 1</p>
            <span>150</span>
          </div>
        </div>
        <div className="chart_background1">
          <span>Lorem ipsem</span>
          <Chart
            options={pieOptions}
            series={pieSeries}
            type="pie"
            height={250}
          />
        </div>
        <div className="chart_background1">
          <span>Lorem ipsem</span>
          <Chart
            options={donutOptions}
            series={donutSeries}
            type="donut"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
