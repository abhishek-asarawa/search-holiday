import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function MaterialUIPickers({
    label,
    date,
    handleChange,
    isError,
    helperText,
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ m: "20px 10px" }}>
                <DesktopDatePicker
                    dateAdapter={AdapterDateFns}
                    label={label}
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <TextField
                            error={isError}
                            helperText={isError ? helperText : ""}
                            {...params}
                        />
                    )}
                />
            </Stack>
        </LocalizationProvider>
    );
}
