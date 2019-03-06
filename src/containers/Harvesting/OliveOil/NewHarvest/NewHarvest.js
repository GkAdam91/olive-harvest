import React, { Component } from 'react'

import Button from '../../../../components/UI/Button/Button';
import classes from './NewHarvest.module.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../../shared/utility';
import DatePicker from "react-datepicker";

import classes1 from "react-datepicker/dist/react-datepicker-cssmodules.css";

export class NewHarvest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fieldForm: {
                fieldName: {
                    elementType: 'select',
                    elementConfig: {
                        options: []
                    },
                    value: this.props.fieldName,
                    validation: {},
                    valid: true
                },
                sakia: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Sakia elies'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
                },
                sakiaType: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '40kg', displayValue: '40 Kg' },
                            { value: '50kg', displayValue: '50 Kg' }
                        ]
                    },
                    value: '50kg',
                    validation: {},
                    valid: true
                },
                //TODO add component for yield
                /* oilKg: {
                     elementType: 'input',
                     elementConfig: {
                         type: 'text',
                         placeholder: 'Kila Ladi'
                     },
                     value: '',
                     validation: {
                         required: false,
                     },
                     valid: false,
                     touched: false
                 },
                 yieldPerCentage: {
                     elementType: 'label',
                     elementConfig: {
                         type: 'text',
                         placeholder: 'Apodosi %',
                         disabled: true
                     },
                     value: '',
                     validation: {
                         required: false,
                     },
                     valid: false,
                     touched: false,
                 },*/
                harvestDate: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Date'
                    },
                    value: new Date().toString(),
                    validation: {
                        required: true,
                        isNumeric: true
                    },
                    valid: true,
                    touched: false
                }
            },
            formIsValid: false,
            startDate: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState(prevState => ({
            ...prevState,
            fieldForm: {
                ...prevState.fieldForm,
                harvestDate: {
                    ...prevState.fieldForm.harvestDate,
                    value: date.toString(),
                    valid: true
                }
            }
        }));
        this.setState({startDate: date});
    }

    componentDidMount = () => {
        this.props.onFetchFields(/* this.props.token, this.props.userId */);
        const optionsNew = [];
        for (let f in this.props.fields) {
            optionsNew.push({ value: this.props.fields[f].fieldData.name, displayValue: this.props.fields[f].fieldData.name });
        }
        this.setState(prevState => ({
            ...prevState,
            fieldForm: {
                ...prevState.fieldForm,
                fieldName: {
                    ...prevState.fieldForm.fieldName,
                    elementConfig: {
                        ...prevState.fieldForm.fieldName.elementConfig,
                        options: optionsNew
                    }
                }
            }
        }));
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updateFormElement = updateObject(this.state.fieldForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.fieldForm[inputIdentifier].validation),
            touched: true
        });
        const updatedFieldForm = updateObject(this.state.fieldForm, {
            [inputIdentifier]: updateFormElement
        });


        let formIsValid = true;
        for (let inputIdentifier in updatedFieldForm) {
            formIsValid = updatedFieldForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ fieldForm: updatedFieldForm, formIsValid: formIsValid });
    }

    addHarvestHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.fieldForm) {
            formData[formElementIdentifier] = this.state.fieldForm[formElementIdentifier].value;
        }
        const harvest = {
            harvestData: formData,
        }
        this.props.onAddHarvest(harvest, 'Some_Token');
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.fieldForm) {
            formElementsArray.push({
                id: key,
                config: this.state.fieldForm[key]
            })
        };

        let form = (
            <form onSubmit={this.addHarvestHandler}>
                {formElementsArray.map(formElement => {
                    if (formElement.id === 'harvestDate') {
                        return (
                            <DatePicker
                                key={formElement.id}
                                // className={classes1.react-datepicker}
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        )
                    }
                    else {
                        return (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                invalid={!formElement.config.valid}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        )
                    }
                }
                )}
                <p>
                    <Button btnType='Success' disabled={!this.state.formIsValid} >Add</Button>
                </p>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.NewField}>
                <h4>Add new Harvest</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // ings: state.burgerBuilder.ingredients,
        // price: state.burgerBuilder.totalPrice,
        // loading: state.fields.loading,
        // token: 'state.auth.token',
        // userId: 'state.auth.userId'
        fields: state.fields.fields,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFields: (/*token, userId*/) => dispatch(actions.fetchFields(/*token, userId*/)),
        onAddHarvest: (fieldData, token) => dispatch(actions.addHarvest(fieldData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(NewHarvest, axios));
