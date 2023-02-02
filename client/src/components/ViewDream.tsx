import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import './ViewDream.modules.css';
import { Card } from 'react-bootstrap';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export function DreamComponent() {
    const [dreams, setDreams] = useState<any[]>([]);
    const [ampm, setampm] = useState<string>();

    let storedDreams: any;

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const getDream = async () => {
                try {
                    const response = await fetch('http://localhost:5000/viewdreams', {
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    response.json().then((res) => {
                        if (isActive) {
                            storedDreams = res;
                            setDreams(storedDreams);
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            };
            getDream();
            return () => {
                isActive = false;
            };
        }, [])
    );

    function convert2400toAMPM(twentyFour: string) {
        let temp: number = Number(String(twentyFour).split(':').join('')) - 1200;
        let stringTemp = '';
        if (temp < 0) {
            if (temp < 0) {
                temp = temp + 1200;
                if (temp < 60) {
                    stringTemp = String(temp + 1200) + ' am';
                } else {
                    stringTemp = String(temp) + ' am';
                }
            }
        } else if (temp === 0) {
            stringTemp = '1200 am';
        } else {
            stringTemp = String(temp) + ' pm';
        }
        return stringTemp.slice(0, -5) + ':' + stringTemp.slice(-5);
    }
    dreams.map((dream) => {
        return (dream.time_to_bed = convert2400toAMPM(dream.time_to_bed));
    });

    return (
        <>
            {dreams.map((dream) => {
                return (
                    <div className="dreamContainer" key={dream.day_of_month}>
                        <Card>
                            <Card.Header id="dreamDate">{dream.day_of_month.slice(0, dream.day_of_month.indexOf('T'))}</Card.Header>
                            <div id="dreamDay">Day of Week: {dream.day_of_week}</div>
                            <div id="dreamTimeToBed">Time to Bed: {dream.time_to_bed}</div>
                            <div id="dreamMinutesAwake">Minutes Awake: {dream.time_awake}</div>
                            <div id="dreamPeople">People in Dream: {dream.people.join(', ') || 'None'}</div>
                            <div id="dreamLocation">Location: {dream.dream_location}</div>
                            <div id="dreamType">Type of Dream: {dream.type_of_dream}</div>
                            <div id="dreamDescription">Dream: {dream.dream_description}</div>
                        </Card>
                    </div>
                );
            })}
        </>
    );
}
