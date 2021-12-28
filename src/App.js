import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./Table";
import { isArray, isObject, map, reduce } from "lodash";

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

function App() {
    const [data, setData] = useState([]);

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
                                              timestamp: new Date(event.date),
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

    useEffect(() => {}, [data]);

    return (
        <div className="App">
            <DataTable rows={data} columns={columns} />
        </div>
    );
}

export default App;
