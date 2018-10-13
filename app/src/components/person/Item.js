import React, { Component } from 'react';

class PersonItem extends Component {
    render() {
        const { person } = this.props;
        return (
            <div className="person-item">
                <h3>Mood: {person.mood}</h3>
            </div>
        );
    }
}

export default PersonItem;
