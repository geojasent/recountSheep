import { useState } from 'react';

interface IPeopleData {
    people: Array<string>;
}

interface PeopleProps extends IPeopleData {
    updateFields: (fields: Partial<IPeopleData>) => void;
}

export function PeopleInput({ people, updateFields }: PeopleProps) {
    const [count, setCount] = useState(0);
    const [tempPeople, setTempPeople] = useState<Array<string>>([]);

    const decrement = () => {
        setCount(count - 1);
    };
    const increment = () => {
        setCount(count + 1);
    };

    const inputs = [];

    if (count !== 0) {
        inputs.push(<label key="label">Persons</label>);
        for (let i = 1; i <= count; i++) {
            inputs.push(
                <input
                    className="personInput"
                    key={`person${i}`}
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
            <label>Number of People in Dream</label>
            <input key={count} defaultValue={count} />
            <button type="button" disabled={count === 0} onClick={decrement}>
                -
            </button>
            <button type="button" onClick={increment}>
                +
            </button>
            {inputs}
        </>
    );
}
