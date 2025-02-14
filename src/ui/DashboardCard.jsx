// import {
//   HomeRounded as Home,
//   CalendarMonthRounded as Calendar,
//   ArrowDropDownRounded as Arrow,
//   SettingsRounded as Settings,
// } from "@mui/icons-material";

// import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function DashboardCard({ name, children }) {
  return (
    <div className="flex w-fit items-center gap-8 rounded-xl border border-dark-mainborder px-4 py-6">
      {/* <Calendar sx={{ fontSize: "6rem", color: "#3c455a" }} />
      <Gauge
        width={100}
        height={100}
        value={60}
        textColor="white"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 22,
          },
          [`& .${gaugeClasses.valueText} text`]: {
            fill: "#fff",
          },
        })}
      />
      <p className="text-4xl font-semibold">
        Statystyka 1 <span className="font-light"></span>
      </p> */}
    </div>
  );
}

export default DashboardCard;
