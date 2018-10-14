import React from 'react';

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null
        };
    }

    render() {
        const handleListLights = e => {
            e.preventDefault();

            fetch('https://api.lifx.com/v1/lights/all/effects/pulse', {
                method: 'POST',
                headers: new Headers({
                    Authorization:
                        'Authorization: Bearer c00033299035cd9fb23d71440b561689301ba07792a4408a20144d0a57f21143',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                //data: 'power=on'
                data: "period=2 cycles=5 color=green'"
            }).then(results => {
                console.log(results);
            });
        };

        return (
            <div>
                <button className="btn" onClick={handleListLights}>
                    Turn light on
                </button>
            </div>
        );
    }
}
