import React, { Component } from 'react'

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import Field from './Field/field';

class Fields extends Component {

    componentDidMount() {
        this.props.onFetchFields(/* this.props.token, this.props.userId */);
    }

    deleteHandler = (field) => {
        this.props.onDeleteField(field.fieldData);
    }

    render() {
        let fields = <Spinner />;
        if (!this.props.loading) {
            fields = this.props.fields.map(field => (
                <Field
                    clickedDelete={(field) => this.deleteHandler(field)}
                    fieldData={field.fieldData}
                    key={field.id} />
            ));
        }
        return (
            <div>
                {fields}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fields: state.fields.fields,
        loading: state.fields.loading,
        // token: state.auth.token,
        // userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFields: (/*token, userId*/) => dispatch(actions.fetchFields(/*token, userId*/)),
        onDeleteField: (data) => dispatch(actions.deleteField(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Fields, axios));