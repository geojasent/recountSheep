import React, { FormEvent, useState } from 'react';
import { DateSelector, DaySelector, TimeBedSelector, TimeAwakeSelector } from '../components/dateTimePicker';
import { PeopleInput } from '../components/PeopleInput';
import { TypeDream } from '../components/TypeDream';
import { Location } from '../components/Location';
import { Dream } from '../components/Dream';
import { FormWrapper } from '../components/FormWrapper';
import './Form.modules.css';

export interface IFormData {
    dayOfMonth: Date | null;
    dayOfWeek: string;
    timeToBed: Date | null;
    timeAwake: number;
    location: string;
    people: Array<string>;
    typeOfDream: string;
    dream: string;
}
const INITIALDATA: IFormData = {
    dayOfMonth: new Date(),
    dayOfWeek: 'Sunday',
    timeToBed: new Date(),
    timeAwake: 0,
    people: [],
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
        //strip date and time to send to backend
    };
    return (
        <div className="form-container">
            <FormWrapper title="Dream Entry">
                <form id="form" onSubmit={onSubmit}>
                    <DateSelector {...data} updateFields={updateFields} />
                    <DaySelector {...data} updateFields={updateFields} />
                    <TimeBedSelector {...data} updateFields={updateFields} />
                    <TimeAwakeSelector {...data} updateFields={updateFields} />
                    <PeopleInput {...data} updateFields={updateFields} />
                    {/* <label>People</label> */}
                    {/* <input className="date" placeholder="People" onChange={(e) => updateFields({ people: e.target.value })}></input> */}
                    <Location {...data} updateFields={updateFields} />
                    {/* <label>Location</label> */}
                    {/* <input className="date" placeholder="Location" onChange={(e) => updateFields({ location: e.target.value })}></input> */}
                    <TypeDream {...data} updateFields={updateFields} />
                    {/* <label>Type of Dream</label> */}
                    {/* <input className="date" placeholder="Type of Dream" onChange={(e) => updateFields({ typeOfDream: e.target.value })}></input> */}
                    <Dream {...data} updateFields={updateFields} />
                    {/* <label>Dream</label> */}
                    {/* <input className="date" placeholder="Dream" onChange={(e) => updateFields({ dream: e.target.value })}></input> */}
                    <button type="submit" className="btn">
                        Submit
                    </button>
                </form>
            </FormWrapper>
        </div>
    );
};

export default DreamEntry;
