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
import OliveOilHarvest from '../Harvesting/OliveOil/OliveOilHarvest';
import { classDeclaration } from '@babel/types';

class Fields extends Component {
    state = {
        showNewFieldModal: false,
        showHarvests: false,
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

    deleteAllHarvests = (fieldName) => {
        console.log('this.props.harvests:', this.props.harvests);
        let idx;
        for (idx in this.props.harvests ){
            if (this.props.harvests[idx]['harvestData']['fieldName'] === fieldName){
                // console.log('this.props.harvests[idx][id]:', this.props.harvests[idx]['id']);
                this.deleteHarvest(this.props.harvests[idx]['id']);
            }
            // console.log(this.props.harvests[idx]['harvestData']['fieldName']);
            
        }
    }

    deleteHarvest = (id) => {
        //this.props.onDeleteHarvest(id);
        console.log('DELETE! id: ', id)
    }

    deleteHandler = (field) => {
        // this.props.onDeleteField(field.id);
        this.deleteAllHarvests(field.fieldData.name);
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

    showHarvests = () => {
        this.setState({
            showHarvests: !this.state.showHarvests
        });
    }

    //TODO cleanup ifs

    render() {
        let fields = <Spinner />;

        if (!this.props.loading) {
            fields = this.props.fields.map(field => {
                let harvests = null;
                if (!this.props.harvestsLoading) {
                    if (this.props.harvests) {

                        harvests = <OliveOilHarvest
                            fieldNameToShow={field.fieldData.name}
                            clickedDeleteHarvest = {(id) => this.deleteHarvest(id)}
                        />
                    }
                }

                return (
                    <Field
                        clickedDelete={() => this.deleteHandler(field)}
                        // clickedHarvests={this.showHarvests}
                        clickedAddHarvest={() => this.addNewHarvestHandler(field)}
                        fieldData={field.fieldData}
                        key={field.id}
                        harvestToDel={null}
                        harvests={harvests} />
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
        onDeleteField: (data) => dispatch(actions.deleteField(data)),
        onDeleteHarvest: (id) => dispatch(actions.deleteHarvest(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Fields, axios));