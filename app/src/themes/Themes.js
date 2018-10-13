import React from 'react';

export const Themes = {
    navigation: {
        isOpen: false,
        icon: {
            openedClassName: 'fa-times',
            closedClassName: 'fa-bars'
        },
        container: {
            openedClassName: 'open',
            closedClassName: ''
        }
    },
    moods: {
        happy: 'bg-happy',
        sad: 'bg-sad',
        angry: 'bg-angry',
        confused: 'bg-confused',
        disgusted: 'bg-disgusted',
        surprised: 'bg-surprised',
        calm: 'bg-calm',
        unknown: 'bg-unknown'
    },
    toggleNavigationHandler: () => {}
};

export const ThemeContext = React.createContext(Themes.moods.happy);
