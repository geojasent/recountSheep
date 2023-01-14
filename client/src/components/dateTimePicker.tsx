import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IDateTimeData {
    dayOfMonth: Date | null;
    dayOfWeek: string;
    timeToBed: Date | null;
    timeAwake: number;
}

interface DateTimeProps extends IDateTimeData {
    updateFields: (fields: Partial<IDateTimeData>) => void;
}

export function DateSelector({ dayOfMonth, updateFields }: DateTimeProps) {
    const [startDate, setStartDate] = useState<Date | null>(dayOfMonth);
    return (
        <>
            <label>Date</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => {
                    updateFields({ dayOfMonth: date });
                    setStartDate(date);
                }}
            />
        </>
    );
}

//TODO: auto update on date selector
export function DaySelector({ dayOfWeek, updateFields }: DateTimeProps) {
    return (
        <>
            <label>Day of Week</label>
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
        </>
    );
}

export function TimeBedSelector({ timeToBed, updateFields }: DateTimeProps) {
    const [startDate, setStartDate] = useState<Date | null>(timeToBed);
    return (
        <>
            <label>Time to Bed</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => {
                    updateFields({ timeToBed: date });
                    setStartDate(date);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                timeCaption="Time"
                dateFormat="h:mm aa"
            />
        </>
    );
}

export function TimeAwakeSelector({ timeAwake, updateFields }: DateTimeProps) {
    return (
        <>
            <label>Minutes Awake</label>
            <input placeholder="Mintues Awake" onChange={(e) => updateFields({ timeAwake: Number(e.target.value) })}></input>
        </>
    );
}
