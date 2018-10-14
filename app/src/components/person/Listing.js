import React from 'react';
import Emoji from './Emoji';

export class PersonListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personList: {}
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
        const { hideTimestamp } = this.props;

        const formatTime = timestamp => {
            let d = new Date(timestamp);
            let hr = d.getHours();
            let min = d.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }
            let ampm = 'am';
            if (hr > 12) {
                hr -= 12;
                ampm = 'pm';
            }
            return hr + ':' + min + ampm;
        };

        return (
            <div className="listing-container">
                {personList && personList.facialAttributes ? (
                    <div className="wrapper">
                        {personList.timestamp && !hideTimestamp ? (
                            <div className="fw">
                                <h5>Time: {formatTime(personList.timestamp)}</h5>
                            </div>
                        ) : null}
                        {personList.facialAttributes.map(function(person, index) {
                            return <Emoji key={index} person={person} />;
                        })}
                    </div>
                ) : null}
            </div>
        );
    }
}
