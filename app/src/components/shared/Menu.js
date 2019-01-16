import React from 'react';
import { NavLink } from 'react-router-dom';

export class Menu extends React.Component {
    render() {
        const { toggleNavigation, navigationClass } = this.props;

        return (
            <div>
                <div className={`navigation ${navigationClass}`}>
                    <h2>
                        <NavLink to="/" onClick={toggleNavigation}>
                            Home
                        </NavLink>
                    </h2>
                    <h2>
                        <NavLink to="/current" onClick={toggleNavigation}>
                            Current
                        </NavLink>
                    </h2>
                    <h2>
                        <NavLink
                            to="/history"
                            activeClassName="active"
                            onClick={toggleNavigation}
                        >
                            History
                        </NavLink>
                    </h2>
                    <h2>
                        <NavLink
                            to="/hackathon"
                            activeClassName="active"
                            onClick={toggleNavigation}
                        >
                            Hackathon
                        </NavLink>
                    </h2>
                </div>
            </div>
        );
    }
}
