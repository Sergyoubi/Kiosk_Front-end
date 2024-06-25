import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { dimensions } from "./constants/constants";
import { GridColDef } from "@mui/x-data-grid";
import Cell from "./components/Cell";
import Filters from "./components/Filters";

function App() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2020");
  const [indicator, setIndicator] = useState("co2_emissions");

  const endpoint = `http://localhost:8080/indicators?start=2020-01-01&end=2025-01-01&indicators=${indicator}`;

  const fetchData = () => {
    axios
      .get(endpoint)
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error(`Error while fetching indicators : ${error}`);
      });
  };

  useEffect(() => {
    fetchData();
  }, [indicator]);

  const tableColumnHeader: GridColDef[] = [
    {
      field: "country",
      headerName: "Country",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: (row) => (
        <Cell type="country" data={row.colDef.headerName} />
      ),
      renderCell: ({ row }) => (
        <div className="w-full h-full flex justify-start items-center">
          <p className="text-gray-700 font-medium text-sm ml-3">
            {row.country}
          </p>
        </div>
      ),
    },
    {
      field: "business_unit",
      headerName: "Business Unit",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: (row) => (
        <Cell type="business" data={row.colDef.headerName} />
      ),
      renderCell: ({ row }) => (
        <div className="w-full h-full flex justify-start items-center">
          <p className="text-gray-700 font-medium text-sm ml-3">
            {row.business_unit}
          </p>
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      sortable: true,
      disableColumnMenu: true,
      renderHeader: (row) => <Cell type="date" data={row.colDef.headerName} />,
      renderCell: ({ row }) => (
        <div className="w-full h-full flex justify-start items-center">
          <p className="text-gray-700 font-medium text-sm ml-3">{row.date}</p>
        </div>
      ),
    },
    {
      field: "indicator",
      headerName: "Indicator",
      width: 200,
      renderHeader: (row) => (
        <Cell type="indicator" data={row.colDef.headerName} />
      ),
      renderCell: () => (
        <div className="w-full h-full flex justify-start items-center">
          <p className="text-gray-700 font-medium text-sm ml-2">
            {indicator === "co2_emissions" && "CO2 Emissions"}
            {indicator === "female_headcount" && "Female Headcount"}
            {indicator === "male_headcount" && "Male Headcount"}
            {indicator === "total_revenue" && "Total revenue ($)"}
          </p>
        </div>
      ),

      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "value",
      headerName: "Value",
      type: "number",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: (row) => <Cell type="value" data={row.colDef.headerName} />,
      renderCell: ({ row }) => (
        <div className="w-full h-full flex justify-end items-center">
          <p className="text-gray-800 font-semibold text-sm  py-1 px-3 bg-neutral-50 rounded-lg border border-neutral-200">
            {row.value}
          </p>
        </div>
      ),
    },
  ];

  const formatData = () => {
    // Filter data based on the selected year
    const filteredData = data.filter((indicator) => {
      const indicatorYear = new Date(indicator.date).getFullYear().toString();
      return year === "2020" || indicatorYear === year;
    });

    // Format the filtered data
    return filteredData.map((indicator, index) => {
      const dimensionData = dimensions.find(
        (dim) => dim.id === indicator.dimension
      );
      return {
        id: `${Date.now()}-${index}`,
        country: dimensionData?.country,
        business_unit: dimensionData?.business_unit,
        date: indicator.date,
        indicator: indicator.indicator,
        value: indicator.value,
      };
    });
  };

  const finalData = formatData();

  return (
    <div className="w-screen h-screen">
      <header className="w-full h-[15%] bg-teal-900 flex justify-start items-center">
        <p className="text-xl font-bold text-slate-50 mx-16">
          ESG reporting{" "}
          <span className="text-gray-100 font-thin text-base">
            (from January 2020 to January 2025)
          </span>
        </p>
      </header>
      <div className="w-full h-[85%] bg-teal-50 flex flex-col justify-center items-center">
        <Filters setIndicator={setIndicator} changeYear={setYear} />
        <div className="w-[90%] h-[80%] bg-white flex justify-center items-center">
          <DataGrid
            rows={finalData}
            columns={tableColumnHeader}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 50 },
              },
            }}
            pageSizeOptions={[50, 100]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
