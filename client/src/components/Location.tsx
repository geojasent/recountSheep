interface ILocationData {
    dreamLocation: string;
}

interface DreamProps extends ILocationData {
    updateFields: (fields: Partial<ILocationData>) => void;
}

export function Location({ dreamLocation, updateFields }: DreamProps) {
    return (
        <>
            <label>Location</label>
            <input onChange={(e) => updateFields({ dreamLocation: e.target.value })}></input>
        </>
    );
}
