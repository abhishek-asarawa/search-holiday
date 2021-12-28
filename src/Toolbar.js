import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const handleYesterday = () => {
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);
    const endDate = currDate.getTime();

    const startDate = endDate - 24 * 60 * 60 * 1000;

    return { endDate: endDate - 1, startDate };
};

const handleLastWeek = () => {
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    const day = currDate.getDay();

    const endDate = currDate.getTime() - day * 24 * 60 * 60 * 1000;

    const startDate = endDate - 7 * 24 * 60 * 60 * 1000;
    return { endDate: endDate - 1, startDate };
};

const handleLastMonth = () => {
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    const date = currDate.getDate() - 1;

    const endDate = currDate.getTime() - date * 24 * 60 * 60 * 1000;

    const startDate = endDate - 30 * 24 * 60 * 60 * 1000;
    return { endDate: endDate - 1, startDate };
};

const handleLastYear = () => {
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    currDate.setMonth(0, 1);

    const endDate = currDate.getTime();

    const startDate = currDate.setFullYear(currDate.getFullYear() - 1, 0, 1);
    return { endDate: endDate - 1, startDate };
};

export default function Toolbar({ handleCustom, isCustomTime }) {
    const [range, setRange] = React.useState(0);

    const handleChange = (event) => {
        let endDate, startDate;

        switch (event.target.value) {
            case "yesterday": {
                const dates = handleYesterday();
                startDate = dates.startDate;
                endDate = dates.endDate;
                break;
            }

            case "lastWeek": {
                const dates = handleLastWeek();
                startDate = dates.startDate;
                endDate = dates.endDate;
                break;
            }

            case "lastMonth": {
                const dates = handleLastMonth();
                startDate = dates.startDate;
                endDate = dates.endDate;
                break;
            }

            case "lastYear": {
                const dates = handleLastYear();
                startDate = dates.startDate;
                endDate = dates.endDate;
                break;
            }

            default:
                break;
        }

        if (startDate && endDate) {
            // console.log(startDate, endDate);
            handleCustom(startDate, endDate, true);
            setRange(event.target.value);
        }
    };

    return (
        <div style={{ margin: "1%" }}>
            <FormControl variant="standard">
                <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={range}
                    onChange={handleChange}
                    label="Age"
                    sx={{ width: 350 }}
                >
                    <MenuItem value={0}>
                        {range === 0 ? "Select Interval" : "Reset To Today"}
                    </MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="lastWeek">Last Week</MenuItem>
                    <MenuItem value="lastMonth">Last Month</MenuItem>
                    <MenuItem value="lastYear">Last Year</MenuItem>
                    <MenuItem value={0}>Custom Interval</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
