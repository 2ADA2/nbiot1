import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "../styles/components/inputDate.css"
import {convertTime} from "../functions/convrtTime";

export const InputDate = ({date = new Date(), newDate = () => {}}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                defaultValue={dayjs(date)}
                ampm = {false}
                border = "2px, solid, red"
                sx={{width:"273px"}}
                format="DD.MM.YYYY HH:mm:ss"
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                onChange={(time) => convertTime(new Date(time), new Date(), (newTime) => newDate(newTime))}
            />
        </LocalizationProvider>
    );
}