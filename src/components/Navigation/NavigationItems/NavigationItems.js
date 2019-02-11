import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

import { Translate } from 'react-localize-redux';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact><Translate id="fields" /></NavigationItem>
        {props.isAuth ?
            <NavigationItem link="/logout"><Translate id="logout" /></NavigationItem> :
            <NavigationItem link="/Auth"><Translate id="login" /></NavigationItem>
        }
    </ul>
);

export default navigationItems;