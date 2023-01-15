import './TypeDream.modules.css';

interface ITypeDreamData {
    typeOfDream: string;
}

interface TypeDreamProps extends ITypeDreamData {
    updateFields: (fields: Partial<ITypeDreamData>) => void;
}

export function TypeDream({ typeOfDream, updateFields }: TypeDreamProps) {
    return (
        <>
            <label>Type of Dream</label>
            <p className="radioSelection">
                <input type="radio" value="Recurring" name="test" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Recurring</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Symbolic" name="test" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Symbolic</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Lucid" name="test" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Lucid</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Nightmare" name="test" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Nightmare</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Other" name="test" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Other</label>
            </p>
        </>
    );
}
