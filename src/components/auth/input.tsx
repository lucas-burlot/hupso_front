type InputProps = {
    labelName: string;
    inputType: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ labelName, inputType, value, onChange } : InputProps) {
    return (
        <>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">{ labelName }</label>
            <input type={inputType} value={value} onChange={onChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        </>
    );
}

export default Input;