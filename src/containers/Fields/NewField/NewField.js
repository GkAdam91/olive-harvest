import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';
import classes from './NewField.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../shared/utility';


export class NewField extends Component {
    state = {
        fieldForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Field name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            area: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Area name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            sqArea: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'square Area'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            noTrees: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Number of Trees'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            TreeVariety: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'koroneiki', displayValue: 'Koroneiki' },
                        { value: 'xontroelia', displayValue: 'Xontroelia' }
                    ]
                },
                value: 'koroneiki',
                validation: {},
                valid: true
            },
            plantYear: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Year planted'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false

            },
        },
        formIsValid: false,
    }


    addFieldHandler = (event) => {
        event.preventDefault();
        const formData = {};
        let treesElement = {};
        for (let formElementIdentifier in this.state.fieldForm) {
            if (formElementIdentifier === 'noTrees' ||
                formElementIdentifier === 'TreeVariety' ||
                formElementIdentifier === 'plantYear') {
                treesElement[formElementIdentifier] = this.state.fieldForm[formElementIdentifier].value;
            }
            else
                formData[formElementIdentifier] = this.state.fieldForm[formElementIdentifier].value;
        }
        formData['Trees'] = treesElement;
        const field = {
            fieldId: this.props.fields.length + 1,
            fieldData: formData,
        }
        this.props.onAddField(field, 'Some_Token');
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

    render() {
        const formElementsArray = [];
        for (let key in this.state.fieldForm) {
            formElementsArray.push({
                id: key,
                config: this.state.fieldForm[key]
            })
        };

        let form = (
            <form onSubmit={this.addFieldHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} >Add</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.NewField}>
                <h4>Add new Field</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // ings: state.burgerBuilder.ingredients,
        // price: state.burgerBuilder.totalPrice,
        loading: state.fields.loading,
        token: 'state.auth.token',
        userId: 'state.auth.userId',
        fields: state.fields.fields
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddField: (fieldData, token) => dispatch(actions.addField(fieldData, token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(NewField, axios));
