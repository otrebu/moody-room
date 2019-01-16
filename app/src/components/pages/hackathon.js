import React from 'react';
import { PersonListing } from '../person/Listing';
import api from '../../data/api';

export class Hackathon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hiddenClass: 'hidden',
            personList: [],
            timer: null
        };
    }

    async componentDidMount() {
        let currentPersonListIndex = 0;

        const personDataList = await api.getHackathon();

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
            timer: setInterval(() => {
                currentPersonListIndex++;
                updatePersonList(currentPersonListIndex);
            }, 500)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        const { personList, hiddenClass } = this.state;

        return (
            <div>
                <h2>Hackathon moods</h2>

                <div className={`content-container ${hiddenClass}`}>
                    {personList ? (
                        <PersonListing personList={personList} />
                    ) : null}
                </div>
            </div>
        );
    }
}
