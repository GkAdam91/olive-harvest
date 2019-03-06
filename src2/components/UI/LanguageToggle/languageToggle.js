import React from "react";
import { withLocalize } from "react-localize-redux";

import elFlag from '../../../assets/images/el.png';
import enFlag from '../../../assets/images/en.png';

import classes from "./languageToggle.css";

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => {
  console.log(activeLanguage);
  let onClickFunc = () => setActiveLanguage('en');
  let srcImg = enFlag;
  if (activeLanguage !== undefined) {
    if (activeLanguage.code === 'el') {
      onClickFunc = () => setActiveLanguage('en');
      srcImg = enFlag;
    }
    else {
      onClickFunc = () => setActiveLanguage('el');
      srcImg = elFlag;
    }
  }
  return (
    // <ul className="selector">
    //   {languages.map(lang => (
    //     <li key={lang.code}> 
    //       <button onClick={() => setActiveLanguage(lang.code)}>
    //         {lang.name}
    //       </button>
    //     </li>
    //   ))}
    // </ul>
    //{console.log(activeLanguage)}
    <div >
      <img src={srcImg} onClick={onClickFunc} className={classes.Toggle}/>
    </div>
  );
}
export default withLocalize(LanguageToggle);