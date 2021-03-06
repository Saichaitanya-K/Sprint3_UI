import React, { Component, UseState } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createPatient } from '../../actions/PatientAction';
class AddPatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientName: "",
            patientIdentifier: "",
            patientAge: "",
            phoneNumber: "",
            patientAddress: "",
            errors: {}
        }
        //this.onChange=this.onChange.bind(this);
    }

    // life cycle hook
    componentWillReceiveProps(nextProps) {
        //console.log("--------componentWillReceiveProps : Called----------");
        //console.log(nextProps)
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors.error});
        }
    }

    onChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newPatient = {
            patientName: this.state.patientName,
            patientIdentifier: this.state.patientIdentifier,
            patientAge: this.state.patientAge,
            phoneNumber: this.state.phoneNumber,
            patientAddress: this.state.patientAddress
        }
        this.props.createPatient(newPatient, this.props.history);
        

    }

    

    render() {
        const {errors} = this.state;
        
        return (
            <div className="patient">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Patient form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg",{"is-invalid":errors.patientName})}
                                        placeholder="Patient Name"
                                        name="patientName"
                                        onChange={this.onChange}
                                        value={this.state.patientName}
                                    />
                                    {errors.patientName && (
                                        <div className="invalid-feedback">
                                            {errors.patientName}
                                        </div>
                                    )}
                                    
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.patientIdentifier },{ "is-invalid": errors.responseMessage })}
                                        placeholder="Unique Patient ID"
                                        name="patientIdentifier"
                                        onChange={this.onChange}
                                        value={this.state.patientIdentifier}
                                    />
                                    {errors.patientIdentifier && (
                                        <div className="invalid-feedback">
                                            {errors.patientIdentifier}
                                        </div>
                                    )}
                                    {errors.responseMessage && (
                                        <div className="invalid-feedback">
                                            {errors.responseMessage}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="number"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.patientAge })}
                                        placeholder="Patient Age"
                                        name="patientAge"
                                        onChange={this.onChange}
                                        value={this.state.patientAge}
                                        min="1"
                                        max="100"
                                    />
                                    {errors.patientAge && (
                                        <div className="invalid-feedback">
                                            {errors.patientAge}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        pattern="[6-9][0-9]{9}"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.phoneNumber })}
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        onChange={this.onChange}
                                        value={this.state.phoneNumber}
                                    />
                                    {errors.phoneNumber && (
                                        <div className="invalid-feedback">
                                            {errors.phoneNumber}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        placeholder="Patient Address"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.patientAddress })}
                                        onChange={this.onChange}
                                        name="patientAddress" value={this.state.patientAddress}
                                    ></textarea>
                                    {errors.patientAddress && (
                                        <div className="invalid-feedback">
                                            {errors.patientAddress}
                                        </div>
                                    )}
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddPatient.propTypes = {
    createPatient: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

//Here from state we refer to combine reducer in which we have error as an reducer or state that's why state.error
const mapStateToProps = state => {
    return { errors: state.error }
};

export default connect(mapStateToProps, { createPatient })(AddPatient);