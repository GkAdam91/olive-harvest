import React, { Component } from 'react'

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import Field from './Field/field';
import Modal from '../../components/UI/Modal/Modal';
import NewField from './NewField/NewField';
import NewHarvest from '../Harvesting/OliveOil/NewHarvest/NewHarvest';
import Button from '../../components/UI/Button/Button';
import { OliveOilHarvest } from '../Harvesting/OliveOil/OliveOilHarvest';

class Fields extends Component {
    state = {
        showNewFieldModal: false,
        // showHarvests: false,
        showNewHarvestModal: false,
        addHarvestFieldId: '',
        addHarvestFieldName: ''

    }

    componentDidMount() {
        this.props.onFetchFields(/* this.props.token, this.props.userId */);
        this.props.onFetchHarvests();
    }

    addNewHarvestHandler = (field) => {
        this.setState({
            showNewHarvestModal: true,
            addHarvestFieldId: field.id,
            addHarvestFieldName: field.fieldData.name
        })
    }

    deleteHandler = (field) => {
        this.props.onDeleteField(field.id);
    }

    addNewFieldShowHandler = () => {
        this.setState({ showNewFieldModal: true });
    }

    showModalCancelHandler = () => {
        this.setState({
            showNewFieldModal: false,
            showNewHarvestModal: false
        });
    };

    // showHarvests = () => {
    //     this.setState({
    //         showHarvests: !this.state.showHarvests
    //     });
    //     console.log(this.state.showHarvests);
    // }

    render() {
        let fields = <Spinner />;

        if (!this.props.loading) {
            fields = this.props.fields.map(field => {
                let harvests = <Spinner />;
                if (!this.props.harvestsLoading) {
                    harvests = <OliveOilHarvest
                        fieldNameToShow={'Μακρυα Λακκα'}
                    />
                }
                return (
                    <>
                        <Field
                            clickedDelete={() => this.deleteHandler(field)}
                            // clickedHarvests={this.showHarvests}
                            clickedAddHarvest={() => this.addNewHarvestHandler(field)}
                            fieldData={field.fieldData}
                            key={field.fieldId} />
                        {harvests}
                    </>
                )
            }
            );
        }

        let modalComponent = null;
        if (this.state.showNewFieldModal)
            modalComponent = <NewField />;
        else if (this.state.showNewHarvestModal)
            modalComponent = <NewHarvest
                fieldId={this.state.addHarvestFieldId}
                fieldName={this.state.addHarvestFieldName} />;

        return (
            <div>
                <>
                    <Modal show={this.state.showNewFieldModal || this.state.showNewHarvestModal} modalClosed={this.showModalCancelHandler}>
                        {modalComponent}
                    </Modal>
                    {fields}
                    <Button btnType='Danger' clicked={this.addNewFieldShowHandler}>Add New Field</Button>
                </>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fields: state.fields.fields,
        loading: state.fields.loading,
        harvestsLoading: state.harvests.loading,
        harvests: state.harvests.harvests,
        // token: state.auth.token,
        // userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHarvests: () => dispatch(actions.fetchHarvests()),
        onFetchFields: (/*token, userId*/) => dispatch(actions.fetchFields(/*token, userId*/)),
        onDeleteField: (data) => dispatch(actions.deleteField(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Fields, axios));