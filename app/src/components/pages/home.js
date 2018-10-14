import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="content-container f-text-center">
                    <p>
                        Welcome to MoodyRoom...Welcome to MoodyRoom...Welcome to MoodyRoom...Welcome
                        to MoodyRoom...Welcome to MoodyRoom...Welcome to MoodyRoom...Welcome to
                        MoodyRoom...Welcome to MoodyRoom...Welcome to MoodyRoom...Welcome to
                        MoodyRoom...Welcome to MoodyRoom...
                    </p>
                    <p>
                        Welcome to MoodyRoom...Welcome to MoodyRoom...Welcome to MoodyRoom...Welcome
                        to MoodyRoom...Welcome to MoodyRoom...
                    </p>
                    <h5>
                        <Link to="/current">Current</Link>
                    </h5>
                    <h5>
                        <Link to="/history">History</Link>
                    </h5>
                </div>
            </div>
        );
    }
}
