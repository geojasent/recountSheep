interface ILocationData {
    dreamLocation: string;
}

interface DreamProps extends ILocationData {
    updateFields: (fields: Partial<ILocationData>) => void;
}

export function Location({ dreamLocation, updateFields }: DreamProps) {
    return (
        <>
            <label className="dreamInputLabel">Location</label>
            <input defaultValue={dreamLocation} onChange={(e) => updateFields({ dreamLocation: e.target.value })}></input>
        </>
    );
}
