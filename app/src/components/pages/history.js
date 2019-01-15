import React from 'react';
import { PersonListing } from '../person/Listing';
import api from '../../data/api';

export class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hiddenClass: 'hidden',
            personList: [],
            timer: null,
            timelapseDuration: 50
        };
    }

    async componentDidMount() {
        let currentPersonListIndex = 0;
        const timelapseDuration = this.props.match.params.count || 250;

        const personDataList = await api.getMoodsHistory();

        const updatePersonList = listIndex => {
            if (currentPersonListIndex < personDataList.length) {
                this.setState({
                    personList: personDataList[listIndex]
                });
            } else {
                currentPersonListIndex = 0;
                clearInterval(this.state.timer);
            }
        };

        updatePersonList(currentPersonListIndex);

        this.setState({
            timer: setInterval(
                function() {
                    currentPersonListIndex++;
                    updatePersonList(currentPersonListIndex);
                },
                timelapseDuration > 50 ? 500 : 1000
            )
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        const { personList, hiddenClass } = this.state;

        return (
            <div>
                <h2>History</h2>

                <div className={`content-container ${hiddenClass}`}>
                    {personList ? (
                        <PersonListing personList={personList} />
                    ) : null}
                </div>
            </div>
        );
    }
}
