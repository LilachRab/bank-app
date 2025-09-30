import React from 'react';

interface FormattedEmailProps {
    email: string;
}

// Format email with invisible breaking points (like dates have natural spaces)
export const FormattedEmail: React.FC<FormattedEmailProps> = ({ email }) => {
    const isEmail = email.includes('@') && email.includes('.');

    if (!isEmail) {
        return <>{email}</>;
    }

    // Split email into parts to add word break opportunities
    const parts = [];
    let currentPart = '';

    for (let i = 0; i < email.length; i++) {
        const char = email[i];
        currentPart += char;

        // Add break opportunities after @ and dots (but keep the symbols with the preceding text)
        if (char === '@' || char === '.') {
            parts.push(currentPart);
            currentPart = '';
        }
    }

    // Add any remaining text
    if (currentPart) {
        parts.push(currentPart);
    }

    // Render with word break opportunities between parts
    return (
        <>
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    {part}
                    {index < parts.length - 1 && <wbr />}
                </React.Fragment>
            ))}
        </>
    );
};
