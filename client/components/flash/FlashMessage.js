import React from 'react';
import classnames from 'classnames';

class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render() {
        const { text, type } = this.props.message;
        let messageType;
        if(type === 'success') messageType = 'alert-success';
        else if(type === 'error' ) messageType = 'alert-danger';
        else messageType = 'alert-warning';

        return (
            <div className={classnames('alert', messageType)} role="alert">
                <button className="close" onClick={this.onClick}><span>&times;</span></button>
                <p>{text}</p>
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;