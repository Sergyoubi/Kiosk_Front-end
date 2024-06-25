import * as React from "react";
import {
  Select as BaseSelect,
  SelectProps,
  selectClasses,
  SelectRootSlotProps,
} from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

export default function UnstyledSelectControlled({
  setIndicator,
  changeYear,
}: any) {
  const [value, setValue] = React.useState<string | null>("co2_emissions");
  const [date, setDate] = React.useState<string | null>("2020");

  const handleChange = (value) => {
    setValue(value);
    setIndicator(value);
  };
  const handleDateChange = (value) => {
    setDate(value);
    changeYear(value);
  };

  return (
    <div className="w-[90%] h-[12%] my-2 flex justify-start items-center">
      <section className=" h-full flex justify-start items-center">
        <p className="text-gray-800 font-bold tex-lg mx-5">Indicator</p>
        <Select
          value={value}
          onChange={(_, newValue) => handleChange(newValue)}
        >
          <Option value={"co2_emissions"}>CO2 Emissions</Option>
          <Option value={"female_headcount"}>Female Headcount</Option>
          <Option value={"male_headcount"}>Male Headcount</Option>
          <Option value={"total_revenue"}>Total Revenue</Option>
        </Select>
      </section>
      <section className=" h-full flex justify-start items-center">
        <p className="text-gray-800 font-bold tex-lg ml-10 mr-5">Year</p>
        <Select
          value={date}
          onChange={(_, newValue) => handleDateChange(newValue)}
        >
          <Option value={"2020"}>2020</Option>
          <Option value={"2021"}>2021</Option>
          <Option value={"2022"}>2022</Option>
          <Option value={"2023"}>2023</Option>
          <Option value={"2024"}>2024</Option>
        </Select>
      </section>
    </div>
  );
}

function Select(props: SelectProps<string, false>) {
  const slots: SelectProps<string, false>["slots"] = {
    root: StyledButton,
    listbox: Listbox,
    ...props.slots,
  };

  return <BaseSelect {...props} slots={slots} />;
}

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const CustomButton = React.forwardRef(function CustomButton(
  props: SelectRootSlotProps<number, false>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button
      type="button"
      {...other}
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{other.children}</span>
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const StyledButton = styled(CustomButton, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 180px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background:  ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  & > svg {
    font-size: 1rem;
    vertical-align: middle;
  }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  `
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }
  
  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);
