import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DateModal from "./DateModal";

const convertTimeDate = (date) => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", dateOptions);
};

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

const handleToday = () => {
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    const startDate = currDate.getTime();

    currDate.setDate(currDate.getDate() + 1);

    const endDate = currDate.getTime();

    return { endDate: endDate - 1, startDate };
};

export default function Toolbar({ handleCustom, handleReset, custom }) {
    const [range, setRange] = React.useState("default");
    const [open, setOpen] = React.useState(false);
    const [shouldReset, setShouldReset] = React.useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

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

            case "today": {
                const dates = handleToday();
                startDate = dates.startDate;
                endDate = dates.endDate;
                break;
            }

            case "default": {
                handleReset();
                break;
            }

            case "custom": {
                setRange(event.target.value);
                break;
            }

            default:
                break;
        }

        if (startDate && endDate) {
            handleCustom(startDate, endDate, true);
            setRange(event.target.value);
        }
    };

    React.useEffect(() => {
        if (range === "custom") {
            setShouldReset(true);
        } else if (shouldReset) setShouldReset(false);
    }, [range, shouldReset]);

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
                    <MenuItem value={"default"}>
                        {range === "default"
                            ? "Select Interval"
                            : "Reset To Default"}
                    </MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="lastWeek">Last Week</MenuItem>
                    <MenuItem value="lastMonth">Last Month</MenuItem>
                    <MenuItem value="lastYear">Last Year</MenuItem>
                    <MenuItem value="custom" onClick={handleOpen}>
                        {custom.isCustom && range === "custom"
                            ? `${convertTimeDate(
                                  custom.startDate
                              )} to ${convertTimeDate(custom.endDate)}`
                            : "Select by Yourself"}
                    </MenuItem>
                </Select>
            </FormControl>
            <DateModal
                open={open}
                handleClose={handleClose}
                handleSubmit={(sd, ed) => handleCustom(sd, ed, true)}
                shouldReset={shouldReset}
            />
        </div>
    );
}
