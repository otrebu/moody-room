import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="content-container f-text-center">
                    <h3>
                        In todays world, humans frequently hide their emotions.
                        <br />
                        Lets allow machines to display them for us again....
                    </h3>
                    <p />
                    <p />
                    <p />
                    <h5>
                        <Link to="/current">View the current moods</Link>
                    </h5>
                    <h5>
                        <Link to="/history">View a timelapse of recorded moods</Link>
                    </h5>
                </div>
            </div>
        );
    }
}
