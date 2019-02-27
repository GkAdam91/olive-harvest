import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

import { Translate } from 'react-localize-redux';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact><Translate id="home" /></NavigationItem>
        <NavigationItem link="/Fields" ><Translate id="fields" /></NavigationItem>
        <NavigationItem link="/Harvests" ><Translate id="harvests" /></NavigationItem>
        {props.isAuth ?
            <NavigationItem link="/logout"><Translate id="logout" /></NavigationItem> :
            <NavigationItem link="/Auth"><Translate id="login" /></NavigationItem>
        }
    </ul>
);

export default navigationItems;