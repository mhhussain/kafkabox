import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class KafkaMessage extends Component {
    

    render() {
        return (
            <tr ref="expanderBody" className="inner uk-grid">
                <td>{this.props.message.offset}</td>
                <td>{this.props.message.value}</td>
            </tr>
        )
    }
};

KafkaMessage.propTypes = {
    message: PropTypes.object
};

export default KafkaMessage;
