import React, { Component } from 'react'
import ABCLogo from '../../Images/ABCLogo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../CSS/App.css'



class Login extends Component {

    constructor(props){
        super(props)
    
        /** State variables:
         * - email: the email for the login credentials. Initially set to empty
         * - password: the password for the login credentials. Initially set to empty
         * - message: a string that tells the user if their log in credentials were wrong.
         *    Message is initially empty and will only change if the server fails to log the user in
         */     
        this.state = {
          email: "",
          password: "",
          message: ""
        }

        //FontAwesome Icons
        this.userIcon = <FontAwesomeIcon icon={'user'} />
        this.lockIcon = <FontAwesomeIcon icon={'lock'} />
        this.heartIcon = <FontAwesomeIcon icon={'heart'} />
        this.javaIcon = <FontAwesomeIcon icon={'coffee'} />
        this.githubIcon = <FontAwesomeIcon icon={['fab', 'github']} />

        // Binding functions that will alter the state or require an event as input
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    /**
     * Handles the changing of state variables.
     * @param  {[Javascript Event]} event the event associated with the listener.
    */
    handleChange(event) {
        const name = event.target.name
        this.setState({
        [name]: event.target.value
        })
    }

    /**
     * Handles the form submission. this function checks if the input fields are
     * valid for the login to continue. If they are not then does not validate the
     * input fields
     * @param  {[Javascript Event]} event the event associated with the listener
    */
    handleSubmit(event) {
        event.preventDefault();
        event.target.className += " was-validated"
        this.state.email.length > 0 && this.state.password.length > 0 ? console.log("ready to continue") : this.props.history.push('/home')
    }


    render(){

         // Links for bottom of page
         const reactLink = <a href="https://reactjs.org/">React</a>
         const fontAwLink = <a href="https://fontawesome.com/">Font Awesome</a>
         const bootLink = <a href="https://getbootstrap.com/">Bootstrap</a>

        return (
            <div className='page-load'>
                <div className='d-flex justify-content-end m-1'>
                    <a style={{color: '#60b0f4'}} href='https://github.com/jschappel/ABC-Corp'> Check me out on Github! {this.githubIcon}</a>
                </div>
                <div className="App-header">
                    <div className="d-flex justify-content-center" id='logo-load'>
                        <img src={ABCLogo} className="img-fluid" alt="Responsive"/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="flex-container" id="login_container">
                            <div className="row justify-content-center">
                                <div className="login m-3">
                                    <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                                        <h5 className="d-flex justify-content-center" id='info-text'>Log In</h5>
                                        <hr />
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">{this.userIcon}</span>
                                                </div>
                                                <input type="text" id='login-input' name="email" onChange={this.handleChange} className="form-control" autoComplete="on" placeholder="jsmith@example.com" aria-label="Username" aria-describedby="basic-addon1" required/>

                                            </div>
                                            <div className="d-flex justify-content-center mb-3">
                                                <small className="form-text" id='info-text'>We'll never share your email with anyone else.</small>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">{this.lockIcon}</span>
                                                </div>
                                                <input type="password" id='login-input' onChange={this.handleChange} name="password" className="form-control" autoComplete="off" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" required/>
                                            </div>
                                            <div className="d-flex justify-content-center mb-3">
                                                <small id="loginErr" className="form-text">{this.state.message}</small>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center mt-4'>
                                            <button type="Log In" style={{marginBottom:"10px"}} className="btn btn-outline-abc-blue">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row justify-content-center" id="helper-row">
                                <p style={{fontSize:"12px"}} id='info-text'>Don't have an account? Please contact the IT department to see if you are eligible for one.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="">
                        <p>Developed with {this.heartIcon} and {this.javaIcon} using {bootLink}, {reactLink}, and {fontAwLink}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login