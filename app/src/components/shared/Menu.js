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
                        <NavLink to="/history" activeClassName="active" onClick={toggleNavigation}>
                            History
                        </NavLink>
                    </h2>
                    {/* <h2>
                        <NavLink
                            to="/people"
                            activeClassName="active"
                            onClick={toggleNavigation}
                        >
                            People
                        </NavLink>
                    </h2> */}
                    <h2>
                        <NavLink to="/settings" activeClassName="active" onClick={toggleNavigation}>
                            Settings
                        </NavLink>
                    </h2>
                </div>
            </div>
        );
    }
}
