import React from 'react';
import validate from '../../../server/validations/signup';
import classnames from 'classnames';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onBlur(e) {
        let { errors } = this.state;
        const target = e.target;

        this.props.isUserExists(e.target.value).then((response) => {
            if(response.data.user) {
                errors[target.name] = "There is user with the same "+target.name;
                this.setState({
                    errors: errors
                });
            } else {
                delete errors[target.name];
                this.setState({
                    errors: errors
                });
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const { errors, isValid } = validate(this.state);

        this.setState({
            errors: {}
        });

        if(isValid) {
            this.props.userSignupRequest(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'You signed up succesfully. Welcome!'
                });

                this.context.router.push('/');
            }, (err) => {
                this.setState({ errors: err.response.data.errors });
            });
        } else
        {
            this.setState({
                errors
            });
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Sign up</h1>

                <div className={classnames("form-group", { "has-error": errors.username}) }>
                    <label>Username</label>
                    <input name="username" className="form-control" placeholder="Username" type="text" onChange={this.onChange} onBlur={this.onBlur} />
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div>

                <div className={classnames("form-group", { "has-error": errors.email}) }>
                    <label>Email</label>
                    <input name="email" className="form-control" placeholder="Email" type="text" onChange={this.onChange} onBlur={this.onBlur} />
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>

                <div className={classnames("form-group", { "has-error": errors.password}) }>
                    <label>Password</label>
                    <input name="password" className="form-control" placeholder="Password" type="password" onChange={this.onChange} />
                    {errors.password && <span className="help-block">{errors.password}</span>}
                </div>

                <div className={classnames("form-group", { "has-error": errors.confirmPassword}) }>
                    <label>Confirm password</label>
                    <input name="confirmPassword" className="form-control" placeholder="Confirm password" type="password" onChange={this.onChange} />
                    {errors.confirmPassword && <span className="help-block">{errors.confirmPassword}</span>}
                </div>

                <button className="btn btn-primary">Sign up</button>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignupForm;