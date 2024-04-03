import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "../styles/components/inputDate.css"
import {convertTime} from "../functions/convrtTime";

export const InputDate =({date = new Date(), newDate = () => {}}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                defaultValue={dayjs(date)}
                ampm = {false}
                border = "2px, solid, red"
                views={['year', 'day', 'hours', 'minutes', 'seconds']}
                onChange={(time) => convertTime(time, date, (newTime) => newDate(newTime))}
            />
        </LocalizationProvider>
    );
}