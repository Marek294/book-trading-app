import React from 'react';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessagesActions';

class FlashMessagesList extends React.Component {

    render() {
        const { deleteFlashMessage } = this.props;
        let messages = this.props.messages.map((message) => {
           return <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage} />
        });
        return (
            <div>
                {messages}
            </div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages: React.PropTypes.array.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }

}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);