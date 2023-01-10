import React, { FormEvent, useState } from 'react';
import { DateSelector, DaySelector } from '../components/dateTimePicker';
import { FormWrapper } from '../components/FormWrapper';
import './Form.modules.css';

export interface IFormData {
    dayOfMonth: Date | null;
    dayOfWeek: string;
    timeToBed: string;
    timeAwake: string;
    location: string;
    people: string;
    typeOfDream: string;
    dream: string;
}

const INITIALDATA: IFormData = {
    dayOfMonth: new Date(),
    dayOfWeek: 'Sunday',
    timeToBed: '',
    timeAwake: '',
    people: '',
    location: '',
    typeOfDream: '',
    dream: ''
};

const DreamEntry: React.FC = () => {
    const [data, setData] = useState(INITIALDATA);
    function updateFields(fields: Partial<IFormData>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
    };
    return (
        <div className="form-container">
            <FormWrapper title="Dream Entry">
                <form id="form" onSubmit={onSubmit}>
                    <label>Date</label>
                    <DateSelector {...data} updateFields={updateFields} />
                    <label>Day of Week</label>
                    <DaySelector {...data} updateFields={updateFields} />
                    {/* <DaySelector dayOfWeek={data.date.toString().split(' ')[0]} setDayOfWeek={...Partial<>} /> */}
                    {/* <input className="date" placeholder="Day of Week" onChange={(e) => updateFields({ dayOfWeek: e.target.value })}></input> */}
                    <label>Time to Bed</label>
                    <input className="date" placeholder="Time to Bed" onChange={(e) => updateFields({ timeToBed: e.target.value })}></input>
                    <label>Time Awake</label>
                    <input className="date" placeholder="Time Awake" onChange={(e) => updateFields({ timeAwake: e.target.value })}></input>
                    <label>People</label>
                    <input className="date" placeholder="People" onChange={(e) => updateFields({ people: e.target.value })}></input>
                    <label>Location</label>
                    <input className="date" placeholder="Location" onChange={(e) => updateFields({ location: e.target.value })}></input>
                    <label>Type of Dream</label>
                    <input className="date" placeholder="Type of Dream" onChange={(e) => updateFields({ typeOfDream: e.target.value })}></input>
                    <label>Dream</label>
                    <input className="date" placeholder="Dream" onChange={(e) => updateFields({ dream: e.target.value })}></input>
                    <button type="submit" className="btn">
                        Submit
                    </button>
                </form>
            </FormWrapper>
        </div>
    );
};

export default DreamEntry;
