import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IDateTimeData {
    dayOfMonth: Date | null;
    dayOfWeek: string;
    timeToBed: string;
    timeAwake: string;
}

interface DayOfWeekProps extends IDateTimeData {
    updateFields: (fields: Partial<IDateTimeData>) => void;
}

export function DateSelector({ dayOfMonth, updateFields }: DayOfWeekProps) {
    const [startDate, setStartDate] = useState<Date | null>(dayOfMonth);
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => {
                updateFields({ dayOfMonth: date });
                setStartDate(date);
            }}
        />
    );
}

export function DaySelector({ dayOfWeek, updateFields }: DayOfWeekProps) {
    return (
        <select
            value={dayOfWeek}
            onChange={(e) => {
                updateFields({ dayOfWeek: e.target.value });
            }}
        >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
        </select>

        // return ( <input placeholder="Day of Week" value={dayOfWeek} onChange={(e) => updateFields({ dayOfWeek: e.target.value })}></input>;
    );
}

// export class TimeSelector extends React.Component<ITimeProps, {}> {}
