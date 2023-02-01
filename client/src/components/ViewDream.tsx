import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import './ViewDream.modules.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export function DreamComponent() {
    const [dreams, setDreams] = useState<any[]>([]);
    let storedDreams: any;
    const dreamCard: any = [];

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

    return (
        <>
            {dreams.map((dream) => {
                return (
                    <div className="dreamContainer" key={dream.day_of_month}>
                        <p>Date: {dream.day_of_month}</p>
                        <p>Day of Week: {dream.day_of_week}</p>
                        <p>Time to Bed: {dream.time_to_bed}</p>
                        <p>Minutes Awake: {dream.time_awake}</p>
                        <p>People in Dream: {dream.people.join(', ') || 'None'}</p>
                        <p>Location: {dream.location}</p>
                        <p>Type of Dream: {dream.type_of_dream}</p>
                        <p>Dream: {dream.dream_description}</p>
                    </div>
                );
            })}
        </>
    );
}
