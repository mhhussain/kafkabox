import React, { Component } from 'react';
import PropTypes from 'prop-types';

class KafkaMessage extends Component {
    render() {
        return (
            <div>
                <ul>{this.props.message.topic}</ul>
                <ul>{this.props.message.offset}</ul>
                <ul>{this.props.message.value}</ul>
            </div>
        )
    }
}

KafkaMessage.propTypes = {
    message: PropTypes.object
}

export default KafkaMessage;
