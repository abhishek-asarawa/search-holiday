import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./Table";
import { filter, isArray, isObject, map, reduce } from "lodash";
import Toolbar from "./Toolbar";

const columns = [
    {
        id: "title",
        minWidth: 170,
        align: "left",
        format: (value) => value,
        name: "Name",
    },
    {
        id: "date",
        minWidth: 170,
        align: "left",
        format: (value) => value,
        name: "Date",
    },
    {
        id: "division",
        minWidth: 170,
        align: "left",
        format: (value) => value,
        name: "Division",
    },
    {
        id: "notes",
        minWidth: 170,
        align: "left",
        format: (value) => value,
        name: "Notes",
    },
];

const getTimeStamp = (time = null) => {
    let date = !time ? new Date() : new Date(time);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
};

function App() {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [custom, setCustom] = useState({
        startDate: getTimeStamp(),
        endDate: getTimeStamp(),
        isCustom: false,
    });

    const handleCustom = (startDate, endDate, isCustom) => {
        setCustom((prev) => ({ ...prev, startDate, endDate, isCustom }));
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                "https://www.gov.uk/bank-holidays.json"
            );

            const result = response.data;

            setData(
                reduce(
                    result,
                    (agg, value) => {
                        const { events, division } = value;
                        if (isArray(events))
                            return [
                                ...agg,
                                ...map(events, (event) =>
                                    isObject(event)
                                        ? {
                                              ...event,
                                              timestamp: getTimeStamp(
                                                  event.date
                                              ),
                                              division,
                                          }
                                        : {}
                                ),
                            ];

                        return [...agg];
                    },
                    []
                )
            );
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const { isCustom, startDate, endDate } = custom;
        if (isCustom) {
            setFiltered(
                filter(data, (event) => {
                    if (
                        startDate < event.timestamp &&
                        event.timestamp < endDate
                    )
                        return (
                            startDate <= event.timestamp &&
                            event.timestamp <= endDate
                        );
                })
            );
        } else {
            setFiltered(data);
        }
    }, [custom, data]);

    // useEffect(() => {
    //     if (!isCustomTime && startDate !== endDate) {
    //         console.log("resetting to default");
    //         setStartDate(getTimeStamp());
    //         setEndDate(getTimeStamp());
    //     }
    // }, [isCustomTime, startDate, endDate]);

    return (
        <div className="App">
            <Toolbar
                handleCustom={handleCustom}
                isCustomTime={custom.isCustom}
            />
            <DataTable rows={filtered} columns={columns} />
        </div>
    );
}

export default App;
