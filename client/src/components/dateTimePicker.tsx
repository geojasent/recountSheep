import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IDateTimeData {
    dayOfMonth: Date | null;
    date: string | undefined;
    dayOfWeek: string | undefined;
    dateTimeToBed: Date | null;
    timeToBed: string;
    timeAwake: number;
}

interface DateTimeProps extends IDateTimeData {
    updateFields: (fields: Partial<IDateTimeData>) => void;
}

export function DateSelector({ dayOfMonth, updateFields }: DateTimeProps) {
    const [startDate, setStartDate] = useState<Date | null>(dayOfMonth);
    // const dateString = startDate?.toLocaleDateString();

    const longDayOfWeek = (shortHand: string) => {
        switch (shortHand) {
            case 'Sun':
                return 'Sunday';
            case 'Mon':
                return 'Monday';
            case 'Tue':
                return 'Tuesday';
            case 'Wed':
                return 'Wednesday';
            case 'Thu':
                return 'Thursday';
            case 'Fri':
                return 'Friday';
            case 'Sat':
                return 'Saturday';
        }
    };
    console.log('dateselector');
    console.log(dayOfMonth);

    return (
        <>
            <label className="dreamInputLabel">Date</label>
            <DatePicker
                selected={startDate}
                onChange={(selected: Date) => {
                    updateFields({ dayOfWeek: longDayOfWeek(String(selected).slice(0, 3)) });
                    updateFields({ date: selected?.toLocaleDateString() });
                    updateFields({ dayOfMonth: selected });
                    setStartDate(selected);
                    // console.log(dayOfMonth);
                    // console.log(selected);
                }}
            />
        </>
    );
}

export function DaySelector({ dayOfWeek, updateFields }: DateTimeProps) {
    switch (dayOfWeek) {
        case 'Sun':
            dayOfWeek = 'Sunday';
            break;
        case 'Mon':
            dayOfWeek = 'Monday';
            break;
        case 'Tue':
            dayOfWeek = 'Tuesday';
            break;
        case 'Wed':
            dayOfWeek = 'Wednesday';
            break;
        case 'Thu':
            dayOfWeek = 'Thursday';
            break;
        case 'Fri':
            dayOfWeek = 'Friday';
            break;
        case 'Sat':
            dayOfWeek = 'Saturday';
    }

    return (
        <>
            <label className="dreamInputLabel">Day of Week</label>
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

export function TimeBedSelector({ dateTimeToBed, timeToBed, updateFields }: DateTimeProps) {
    const [startDate, setStartDate] = useState<null | Date>(timeToBed ? new Date('01-01-1970 ' + timeToBed) : dateTimeToBed);
    console.log('timebedselector');
    console.log(dateTimeToBed);
    console.log(timeToBed);
    console.log(startDate);
    return (
        <>
            <label className="dreamInputLabel">Time to Bed</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => {
                    updateFields({ dateTimeToBed: date });
                    setStartDate(date);
                    updateFields({ timeToBed: String(date).slice(16, 21) });
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
            <label className="dreamInputLabel">Minutes Awake</label>
            <input defaultValue={timeAwake ? timeAwake : undefined} onChange={(e) => updateFields({ timeAwake: Number(e.target.value) })}></input>
        </>
    );
}
