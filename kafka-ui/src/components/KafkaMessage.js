import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class KafkaMessage extends Component {
    
    render() {
        return (
            <div className="message uk-text-center uk-button-default" uk-tooltip={`"${this.props.message.value}"`}>{this.props.message.offset}</div>
        )
    }
};

KafkaMessage.propTypes = {
    message: PropTypes.object
};

export default KafkaMessage;
