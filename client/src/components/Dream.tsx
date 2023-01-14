import './Dream.modules.css';

interface IDreamData {
    dream: string;
}

interface DreamProps extends IDreamData {
    updateFields: (fields: Partial<IDreamData>) => void;
}

export function Dream({ dream, updateFields }: DreamProps) {
    return (
        <>
            <label>Dream</label>
            <textarea id="dreamDescriptionInput" onChange={(e) => updateFields({ dream: e.target.value })}></textarea>
        </>
    );
}
