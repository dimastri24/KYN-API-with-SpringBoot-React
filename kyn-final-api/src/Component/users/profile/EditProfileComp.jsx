import React, { Component } from 'react'
import { editProfile } from '../../../service/KYNService'
import Alert from 'react-s-alert';
import './EditProfileComp.css'

export class EditProfileComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.match.params.userid,
            userName: '',
            contactPhone: '',
            address: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadCurrentUser() {
        this.setState({
            userName: this.props.currentUser.userName,
            contactPhone: this.props.currentUser.contactPhone,
            address: this.props.currentUser.address
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const edituser = Object.assign({}, this.state);

        editProfile(this.state.userid, edituser)
            .then(response => {
                Alert.success("Your Profile has been updated!");
                this.props.history.push("/profile");
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    // ================================================================

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         form: {
    //             userName: '',
    //             contactPhone: '',
    //             address: ''
    //         },
    //         userid: this.props.match.params.userid,
    //     }

    // }

    // putData = () => {
    //     editProfile(this.state.userid, this.state.form)
    //         .then(response => {
    //             Alert.success("Your Profile has been updated!");
    //             this.props.history.push("/profile");
    //         }).catch(error => {
    //             Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
    //         });
    // }

    // loadCurrentUser() {
    //     this.setState({
    //         form: this.props.currentUser
    //     })
    //     console.log(this.state.form)
    // }

    // handleInputChange = event => {
    //     let newForm = { ...this.state.form };
    //     newForm[event.target.name] = event.target.value;
    //     this.setState({
    //         form: newForm
    //     })
    // }

    // handleSubmit = () => {
    //     this.putData();
    // }

    // componentDidMount() {
    //     this.loadCurrentUser();
    // }

    render() {
        return (
            <div>
                <section className=" bg-image pic-bg">
                    <div className="mask d-flex align-items-center  gradient-custom-4">
                        <div className="container ">
                            <div className="row d-flex justify-content-center align-items-center ">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card car-border" >
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-5">Edit Profile</h2>
                                            <form onSubmit={this.handleSubmit}>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example1cg" className="form-control form-control-lg"
                                                        name="userName" value={this.state.userName} onChange={this.handleInputChange} required />
                                                    <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example3cg" className="form-control form-control-lg"
                                                        name="contactPhone" value={this.state.contactPhone} onChange={this.handleInputChange} required />
                                                    <label className="form-label" htmlFor="form3Example3cg">Your contactPhone</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example4cg" className="form-control form-control-lg"
                                                        name="address" value={this.state.address} onChange={this.handleInputChange} required />
                                                    <label className="form-label" htmlFor="form3Example4cg">address</label>
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <button type="submit"
                                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Save</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default EditProfileComp