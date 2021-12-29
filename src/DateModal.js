import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DatePicker from "./DatePicker";

const DateModal = ({ open, handleClose, handleSubmit, shouldReset }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [error, setError] = useState(false);

    const handleDateChange = (type, value) => {
        if (type === "start") setStartDate(value);
        if (type === "end") setEndDate(value);
    };

    const handleConfirm = () => {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        handleSubmit(startDate.getTime(), endDate.getTime());
        handleClose();
    };

    useEffect(() => {
        if (!shouldReset) {
            let sd = startDate;
            sd.setHours(0, 0, 0, 0);

            let ed = endDate;
            ed.setHours(0, 0, 0, 0);

            if (sd.getTime() >= ed.getTime()) setError(true);
            else setError(false);
        }
    }, [startDate, endDate, shouldReset]);

    useEffect(() => {
        if (shouldReset) {
            setStartDate(new Date());
            setEndDate(new Date());
            setError(false);
        }
    }, [shouldReset]);

    return (
        <div>
            <Dialog
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                fullWidth
                onClose={handleClose}
                open={open}
            >
                <DialogTitle id="form-dialog-title">
                    Choose Date and Time
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select Starting and Ending Date
                    </DialogContentText>
                    <DatePicker
                        isError={error}
                        date={startDate}
                        label="Start Date"
                        handleChange={(value) =>
                            handleDateChange("start", value)
                        }
                        helperText="Start Date must be older then End Date"
                    />
                    <DatePicker
                        isError={error}
                        date={endDate}
                        label="End Date"
                        handleChange={(value) => handleDateChange("end", value)}
                        helperText="End Date must be newer then Start Date"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        disabled={
                            startDate.getTime() === endDate.getTime() || error
                        }
                        onClick={handleConfirm}
                    >
                        Check Status
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DateModal;
