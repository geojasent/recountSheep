import { useState, useEffect } from 'react';

export function DreamComponent() {
    const [dreams, setDreams] = useState<any[]>([]);
    console.log(sessionStorage.getItem('userId'));
    let storedDreams: any;
    const dreamCard: any = [];

    const getDream = async () => {
        dreamCard.push(<div key={`test}`}>testing</div>);
        try {
            const response = await fetch('http://localhost:5000/viewdreams', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            response.json().then((res) => {
                storedDreams = res;
                setDreams(storedDreams);
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDream();
    }, []);

    return (
        <>
            <div>test dreams</div>
            {dreams.map((dream) => {
                return (
                    <div className="dreamCard" key={dream.day_of_month}>
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
