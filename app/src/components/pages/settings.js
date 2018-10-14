import React from 'react';

export class Settings extends React.Component {
    render() {
        const token = 'c00033299035cd9fb23d71440b561689301ba07792a4408a20144d0a57f21143';
        const handleListLights = e => {
            e.preventDefault();
            console.log('The link was clicked.');
        };
        return (
            <div>
                <button onClick={handleListLights}>List Lights</button>
            </div>
        );
    }
}
