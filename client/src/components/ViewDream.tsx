import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

export function DreamComponent() {
    const [dreams, setDreams] = useState<any[]>([]);

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
                    <div className="dreamContainer" key={dream.dream_id}>
                        <Card>
                            <Card.Header id="cardHeaderContainer">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {dream.day_of_month}
                                    <Dropdown>
                                        <Dropdown.Toggle split variant="basic" id="dropdown-split-basic" />
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/dreamDetails">Details</Dropdown.Item>
                                            <Dropdown.Item href="/updateDream">Update</Dropdown.Item>
                                            <Dropdown.Item href="/deleteDream">Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Card.Header>
                            <section className="dreamItem">
                                {/* <div id="dreamDay">Day of Week: {dream.day_of_week}</div>
                                <div id="dreamTimeToBed">Time to Bed: {dream.time_to_bed}</div>
                                <div id="dreamMinutesAwake">Minutes Awake: {dream.time_awake}</div>
                                <div id="dreamPeople">People in Dream: {dream.people.join(', ') || 'None'}</div>
                                <div id="dreamLocation">Location: {dream.dream_location}</div>
                                <div id="dreamType">Type of Dream: {dream.type_of_dream}</div> */}
                                <div id="dreamDescription">{dream.dream_description}</div>
                            </section>
                        </Card>
                    </div>
                );
            })}
        </>
    );
}
