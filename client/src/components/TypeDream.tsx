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
            {/* <select
                value={typeOfDream}
                onChange={(e) => {
                    updateFields({ typeOfDream: e.target.value });
                }}
            >
                <option value="Recurring">Recurring</option>
                <option value="Symbolic">Symbolic</option>
                <option value="Lucid">Lucid</option>
                <option value="Nightmare">Nightmare</option>
            </select> */}
            <p className="radioSelection">
                <input type="radio" value="Recurring" name="Recurring" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Recurring</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Symbolic" name="Symbolic" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Symbolic</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Lucid" name="Lucid" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Lucid</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Nightmare" name="Nightmare" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Nightmare</label>
            </p>
            <p className="radioSelection">
                <input type="radio" value="Other" name="Other" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label>Other</label>
            </p>
        </>
    );
}
