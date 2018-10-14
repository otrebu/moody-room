import React from 'react';
import { NavLink } from 'react-router-dom';

export class SiteHeader extends React.Component {
    render() {
        const { toggleNavigation, iconClassName } = this.props;

        return (
            <header>
                <div className="menu-trigger" onClick={toggleNavigation}>
                    <i className={'far ' + iconClassName} />
                </div>
                <div className="logo">
                    <NavLink to="/">
                        <h4>Moody Room</h4>
                    </NavLink>
                </div>
            </header>
        );
    }
}
