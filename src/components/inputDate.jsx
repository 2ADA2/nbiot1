import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import "../styles/components/inputDate.css"

export const InputDate =({date = new Date(), newDate = () => {}}) => {

    //обработка неверного ввода
    function convertTime(time){
        try {
            const newTime = new Date(time).toISOString().split(".")[0]
            newDate(newTime)
        } catch (error) {
            newDate(date)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                defaultValue={dayjs(date)}
                ampm = {false}
                border = "2px, solid, red"
                views={['year', 'day', 'hours', 'minutes', 'seconds']}
                onChange={(time) => convertTime(time)}
            />
        </LocalizationProvider>
    );
}