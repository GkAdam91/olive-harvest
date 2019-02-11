import React from 'react';

// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

import classes from './SideDrawer.css';
import LanguageToggle from '../../UI/LanguageToggle/languageToggle';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    {/* <Logo /> */}
                </div>
                <nav>
                    <NavigationItems isAuth ={props.isAuth}/>
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;