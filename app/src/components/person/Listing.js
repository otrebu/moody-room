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
            const date = new Date(timestamp);
            console.log(timestamp);
            console.log(date);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();

            let hr = date.getHours();
            let min = date.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }
            let ampm = 'am';
            if (hr > 12) {
                hr -= 12;
                ampm = 'pm';
            }
            return `${day}/${month}/${year} at ${hr}:${min} ${ampm}`;
        };

        return (
            <div className="listing-container">
                {personList && personList.facialAttributes ? (
                    <div className="wrapper">
                        {!hideTimestamp && (
                            <div className="fw">
                                <h5>{formatTime(personList.timestamp)}</h5>
                            </div>
                        )}
                        {personList.facialAttributes.length > 0
                            ? personList.facialAttributes.map(
                                  (person, index) => (
                                      <Emoji key={index} person={person} />
                                  )
                              )
                            : 'Empty room...'}
                    </div>
                ) : null}
            </div>
        );
    }
}
