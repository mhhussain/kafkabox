import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import KafkaMessage from './KafkaMessage';

class Topic extends Component {
    render() {
        return (
            <div>
                <div>{this.props.topicName}</div>
                {_.map(this.props.messages, (m) => (
                    <KafkaMessage message={m} />
                ))}
            </div>
        )
    }
}

Topic.propTypes = {
    topicName: PropTypes.string,
    messages: PropTypes.array
}

export default Topic;
