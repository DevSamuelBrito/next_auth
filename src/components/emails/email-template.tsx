import * as React from 'react';

interface EmailTemplateProps {
    firstName: String;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName }) => (
    <div>
        <h1>Hello {firstName}</h1>
        <p>Welcome to our service! We are excited to have you on board.</p>
        <p>Feel free to reach out if you have any questions.</p>
        <p>Best regards,</p>
        <p>The Team</p>
    </div>
)