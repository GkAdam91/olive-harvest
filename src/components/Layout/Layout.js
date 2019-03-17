import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import ToolBar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux'

import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from 'react-localize-redux';
import translation from '../../shared/translation.json';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.props.initialize({
            languages: [
                { name: 'English', code: 'en' },
                { name: 'Greek', code: 'el' }
            ],
            translation: translation,
            options: {
                renderToStaticMarkup,
                defaultLanguage: "el"
            }
        });
    }

    state = {
        showSideDrawer: false
    };


    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (
            <Auxiliary>
                <ToolBar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary >
        )

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userID: state.auth.userID
    };
}

export default connect(mapStateToProps)(withLocalize(Layout));
