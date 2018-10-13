import React from 'react';
import PersonItem from './Item';
import Emoji from './Emoji';

export class PersonListing extends React.Component {
    render() {
        const { isSlider, personList } = this.props;
        return (
            <div className={`listing-container ${isSlider ? 'overflow' : ''}`}>
                <div className="wrapper">
                    {personList.map(function(person, index) {
                        return <Emoji key={index} person={person} />;
                    })}
                </div>
            </div>
        );
    }
}
