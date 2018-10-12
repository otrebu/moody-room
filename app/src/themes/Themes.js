import React from "react";

export const Themes = {
  navigationOpenClassName: "open",
  menuOpenClassName: "fa-bars",
  menuCloseClassName: "fa-times",
  menuOpen: false,
  moodHappy: "bg-happy",
  moodSad: "bg-sad",
  moodAngry: "bg-angry",
  moodConfused: "bg-confused",
  moodDisgusted: "bg-disgusted",
  moodSurprised: "bg-surprised",
  moodCalm: "bg-calm",
  moodUnknown: "bg-unknown",
  toggleNavigationHandler: () => {}
};

export const ThemeContext = React.createContext(Themes.moodHappy);
