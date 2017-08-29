import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameOrEmail: '',
            password: '',
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.login(this.state).then(() => {
            this.context.router.push('/');
        }, (err) => {
            this.setState({ errors: err.response.data.errors });
        });
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Log in</h1>

                {errors.form && <div className="alert alert-danger">{errors.form}</div> }

                <div className="form-group">
                    <label>Username or Email</label>
                    <input name="usernameOrEmail" className="form-control" placeholder="Username or Email" type="text" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" className="form-control" placeholder="Password" type="password" onChange={this.onChange} />
                </div>

                <button className="btn btn-primary">Log In</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default LoginForm;