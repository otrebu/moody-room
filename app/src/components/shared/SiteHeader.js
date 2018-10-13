import React from 'react';

export class SiteHeader extends React.Component {
    render() {
        const { toggleNavigation, iconClassName } = this.props;

        return (
            <header>
                <div className="menu-trigger" onClick={toggleNavigation}>
                    <i className={'far ' + iconClassName} />
                </div>
                <div className="logo">
                    <h4>Moody Room</h4>
                </div>
            </header>
        );
    }
}
