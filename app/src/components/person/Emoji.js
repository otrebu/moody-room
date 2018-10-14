import React, { Component } from 'react';

class Emoji extends Component {
    render() {
        const { mood, facialAttributes } = this.props.person;
        // console.log(mood);
        let facialAttributeClasses = '';

        if (facialAttributes.hasBeard) {
            facialAttributeClasses += ' has-beard';
        }
        if (facialAttributes.hasGlasses) {
            facialAttributeClasses += ' has-glasses';
        }
        if (facialAttributes.hasMoustache) {
            facialAttributeClasses += ' has-moustache';
        }
        if (facialAttributes.hasSunglasses) {
            facialAttributeClasses += ' has-sunglasses';
        }

        return (
            <div className={`smiley mood-${mood} ${facialAttributeClasses}`}>
                <div className="face">
                    <div className="eye left">
                        <svg width="30%" viewBox="0 0 30 42" className="tear">
                            <path
                                fill="#66b2ff"
                                stroke="transparent"
                                strokeWidth="0"
                                d="M15 3
                                         Q16.5 6.8 25 18
                                         A12.8 12.8 0 1 1 5 18
                                         Q13.5 6.8 15 3z"
                            />
                        </svg>
                    </div>
                    <div className="eye right" />
                    <div className="mouth" />
                    <div className="beard" />
                    <div className="moustache left" />
                    <div className="moustache right" />
                    <div className="glasses eye-glasses">
                        <div className="g-top " />
                        <div className="g-left glass" />
                        <div className="g-right glass" />
                    </div>
                    <div className="glasses sunglasses">
                        <div className="g-top" />
                        <div className="g-left glass" />
                        <div className="g-right glass" />
                    </div>
                    <div className="eyebrow left" />
                    <div className="eyebrow right" />
                </div>
            </div>
        );
    }
}

export default Emoji;
