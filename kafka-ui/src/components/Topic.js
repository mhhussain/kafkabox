import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.css'

import KafkaMessage from './KafkaMessage';

class Topic extends Component {
    state = { expanded: false }

    render() {
        return (
            <div className="uk-card uk-card-body">
                <div className="uk-flex">
                    <div className="uk-width-1-4">
                        <div className="uk-text-small uk-text-muted">Topic Name</div>
                        <div className="uk-text-capitalize">{this.props.topicName}</div>
                    </div>
                    <div className="uk-width-3-4">
                        <div className="uk-text-small uk-text-muted uk-text-right">Message Count</div>
                        <div className="uk-text-right">{this.props.messages.length}</div>
                    </div>
                </div>
                <div className="uk-flex uk-flex-center">
                    {_.map(this.props.messages, (m) => (
                        <KafkaMessage key={m.offset} message={m} />
                    ))}
                </div>
            </div>
        )
    }
};

Topic.propTypes = {
    topicName: PropTypes.string,
    messages: PropTypes.array
};

export default Topic;
