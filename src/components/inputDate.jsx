import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import "../styles/components/inputDate.css"

export const InputDate =() => {
    const [value, setValue] = useState("2022-08-25T09:39:19")

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                defaultValue={dayjs(value)}
                ampm = {false}
                border = "2px, solid, red"
                views={['year', 'day', 'hours', 'minutes', 'seconds']}
            />
        </LocalizationProvider>
    );
}