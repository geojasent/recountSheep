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
                <input className="radioSelection" type="radio" value="Recurring" checked={typeOfDream === 'Recurring'} onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Recurring</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Symbolic" checked={typeOfDream === 'Symbolic'} onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Symbolic</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Lucid" checked={typeOfDream === 'Lucid'} onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Lucid</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Nightmare" checked={typeOfDream === 'Nightmare'} onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Nightmare</label>
            </p>
            <p className="radioSelectionContainer">
                <input className="radioSelection" type="radio" value="Other" checked={typeOfDream === 'Other'} onChange={(e) => updateFields({ typeOfDream: e.target.value })} />
                <label className="radioSelectionLabel">Other</label>
            </p>
        </>
    );
}
