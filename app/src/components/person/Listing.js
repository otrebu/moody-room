import React from 'react';
// import PersonItem from './Item';
import Emoji from './Emoji';

export class PersonListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personList: []
        };
    }

    componentDidMount() {
        this.setState((state, props) => ({
            personList: props.personList
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState((state, props) => ({
                personList: props.personList
            }));
        }
    }

    render() {
        const { personList } = this.state;
        return (
            <div className="listing-container">
                {personList ? (
                    <div className="wrapper">
                        {personList.map(function(person, index) {
                            return <Emoji key={index} person={person} />;
                        })}
                    </div>
                ) : null}
            </div>
        );
    }
}
