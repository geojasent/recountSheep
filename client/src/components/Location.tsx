interface ILocationData {
    location: string;
}

interface DreamProps extends ILocationData {
    updateFields: (fields: Partial<ILocationData>) => void;
}

export function Location({ location, updateFields }: DreamProps) {
    return (
        <>
            <label>Location</label>
            <input onChange={(e) => updateFields({ location: e.target.value })}></input>
        </>
    );
}
