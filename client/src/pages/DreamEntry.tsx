import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        navigate('/viewdreams');
        try {
            const body = data;
            const response = await fetch('http://localhost:5000/dreamentry', {
                method: 'POST',
                headers: { 'Content-type': 'application/JSON' },
                body: JSON.stringify(body)
            });
            console.log(response);
            //clientside vs serverside strip date and time
        } catch (err) {
            console.log(err);
        }
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
                    <Location {...data} updateFields={updateFields} />
                    <TypeDream {...data} updateFields={updateFields} />
                    <Dream {...data} updateFields={updateFields} />
                    <button type="submit" id="dreamEntrySubmitButton">
                        Submit
                    </button>
                </form>
            </FormWrapper>
        </div>
    );
};

export default DreamEntry;
