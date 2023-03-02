import React, { FormEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateSelector, DaySelector, TimeBedSelector, TimeAwakeSelector } from '../components/dateTimePicker';
import { PeopleInput } from '../components/PeopleInput';
import { TypeDream } from '../components/TypeDream';
import { Location } from '../components/Location';
import { Dream } from '../components/Dream';
import { UserSessionContext } from '../components/SessionContext';
import './Form.modules.css';
import { Button } from 'react-bootstrap';

export interface IFormData {
    userId: string | null;
    dayOfMonth: Date | null;
    date: string | undefined;
    dayOfWeek: string | undefined;
    dateTimeToBed: Date | null;
    timeToBed: string;
    timeAwake: number;
    dreamLocation: string;
    people: Array<string>;
    typeOfDream: string;
    dreamDescription: string;
}

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

const INITIALDREAMDATA: IFormData = {
    userId: '0',
    dayOfMonth: new Date(),
    date: '',
    dayOfWeek: longDayOfWeek(String(new Date()).slice(0, 3)),
    dateTimeToBed: new Date(),
    timeToBed: '',
    timeAwake: 0,
    people: [],
    dreamLocation: '',
    typeOfDream: '',
    dreamDescription: ''
};

const DreamEntry: React.FC = () => {
    const [data, setData] = useState(INITIALDREAMDATA);
    INITIALDREAMDATA.date = INITIALDREAMDATA.dayOfMonth?.toLocaleDateString();

    function updateFields(fields: Partial<IFormData>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }
    data.userId = useContext(UserSessionContext).id;

    const navigate = useNavigate();
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        navigate('/viewdreams');
        try {
            const body = data;
            const response = await fetch('https://api.recountsheep.com/dreamentry', {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <section id="dreamEntrySection" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div className="dreamEntryContainer">
                <form id="dreamEntryForm" onSubmit={onSubmit}>
                    <DateSelector {...data} updateFields={updateFields} />
                    <DaySelector {...data} updateFields={updateFields} />
                    <TimeBedSelector {...data} updateFields={updateFields} />
                    <TimeAwakeSelector {...data} updateFields={updateFields} />
                    <PeopleInput {...data} updateFields={updateFields} />
                    <Location {...data} updateFields={updateFields} />
                    <TypeDream {...data} updateFields={updateFields} />
                    <Dream {...data} updateFields={updateFields} />
                    <Button type="submit" className="loginSignupButton" variant="primary" style={{ marginTop: 10 }}>
                        Record Dream
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default DreamEntry;
