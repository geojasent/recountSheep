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
            <label className="dreamInputLabel">Type of Dream</label>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Recurring" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Recurring</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Symbolic" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Symbolic</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Lucid" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Lucid</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Nightmare" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Nightmare</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Other" onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Other</label>
            </p>
        </>
    );
}
