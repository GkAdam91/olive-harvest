import React from 'react';
import classes from "./Toolbar.css";
// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import LanguageToggle from '../../UI/LanguageToggle/languageToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            {/* <Logo /> */}
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth ={props.isAuth}/>
        </nav>
        <LanguageToggle className={classes.Logo}/>

    </header>
);

export default toolbar; 