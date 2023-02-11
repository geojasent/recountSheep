import { useState } from 'react';
import { Button } from 'react-bootstrap';

interface IPeopleData {
    people: Array<string>;
}

interface PeopleProps extends IPeopleData {
    updateFields: (fields: Partial<IPeopleData>) => void;
}

export function PeopleInput({ people, updateFields }: PeopleProps) {
    const [count, setCount] = useState(people.length || 0);
    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const [tempPeople, setTempPeople] = useState<Array<string>>(people ? people : []);
    console.log(count);
    console.log(tempPeople);
    //count logic
    const decrement = () => {
        setCount(count - 1);
        if (count === 1 && !buttonDisabled) setbuttonDisabled(true);
    };
    const increment = () => {
        setCount(count + 1);
        if (count >= 0 && buttonDisabled) setbuttonDisabled(false);
    };

    const inputs = [];

    if (count !== 0) {
        inputs.push(<label key="label">Persons</label>);
        for (let i = 1; i <= count; i++) {
            inputs.push(
                <input
                    className="personInput"
                    key={`person${i}`}
                    defaultValue={people[i - 1]}
                    onChange={(e) => {
                        setTempPeople((prev) => {
                            prev[i - 1] = e.target.value;
                            return [...prev];
                        });
                        updateFields({ people: tempPeople });
                    }}
                />
            );
        }
    }

    return (
        <>
            <label className="dreamInputLabel">Number of People in Dream</label>
            <input key={count} defaultValue={count} disabled={true} />
            <div id="peopleButtonContainer" style={{ display: 'flex', justifyContent: 'spacedaround' }}>
                <button type="button" style={{ width: '50%', border: 'solid 1px #ccc', borderRadius: '10px' }} disabled={buttonDisabled} onClick={decrement}>
                    -
                </button>
                <button type="button" style={{ width: '50%', border: 'solid 1px #ccc', borderRadius: '10px' }} onClick={increment}>
                    +
                </button>
            </div>
            {inputs}
        </>
    );
}
