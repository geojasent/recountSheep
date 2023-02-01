import './Dream.modules.css';

interface IDreamData {
    dreamDescription: string;
}

interface DreamProps extends IDreamData {
    updateFields: (fields: Partial<IDreamData>) => void;
}

export function Dream({ dreamDescription, updateFields }: DreamProps) {
    return (
        <>
            <label className="dreamInputLabel">Dream</label>
            <textarea id="dreamDescriptionInput" onChange={(e) => updateFields({ dreamDescription: e.target.value })}></textarea>
        </>
    );
}
