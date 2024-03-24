import React, { useState, useRef, useEffect, type ChangeEvent } from 'react';

interface OTPInputProps {
    length?: number;
    onChange?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 8, onChange }) => {
    const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return; // Only allow numeric input
        const newOTP = [...otp];
        newOTP[index] = value.slice(-1); // Allow only one character
        setOTP(newOTP);
        if (onChange) {
            onChange(newOTP.join(''));
        }
        // Move to the next input field automatically
        if (index < length - 1 && value) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            // Move to the previous input field on Backspace
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex  justify-between">
            {Array.from({ length }, (_, index) => (
                <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref!)}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            ))}
        </div>
    );
};

export default OTPInput;
