// import the named export - look at Pure Component as an alternative
import { Component } from "react"
import { signUp } from "../../utilities/users-service"

// create an instance of the SignUpForm (object) which we can access via .this
class SignUpForm extends Component {
    state = {
        name:"",
        email:"",
        password:"",
        confirm:"",
        error:"",
    };

    // handles the change in the input box eg when the user writes
    // cant use the evt.target.value as it won't be bound properly as it needs access to this as its a callback
    // need to use arrow function so that the function is bound to the instance
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error:""
        });
    };

    // // handleSubmit which handles the data post the submit button 
    handleSubmit = async (evt) => {
        evt.preventDefault();
        // declare them in a new variable by taking advantage of object shortcut eg name: name, email= email etc 
        try {
            const {name, email, password} = this.state;
            const formData = {name, email, password}
            const user = await signUp(formData)
            //replace with the setter function. As its a class, we don't have to destructure
            this.props.setUser(user)
        } catch {
            this.setState({ error: "Sign up failed - Try Again" })
        }
    };

    // overwrite with the render() which returns its user UI as JSX
    render() {
        // using the disable variable as validation for the sign up button 
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    {/* name props match state properties so that we can have a single function to handleChange  */}
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    <label>Confirm</label>
                    <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                    {/* matches to the disable prop and if its true the sign up button will be disable */}
                    <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
            </div>
            {/* rendering our error  */}
            <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
        }
}

export default SignUpForm