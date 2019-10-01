import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.css'

import KafkaMessage from './KafkaMessage';

class Topic extends Component {
    state = { expanded: false }

    toggleExpander = () => {
        if (!this.state.expanded) {
            this.setState({ expanded: true });
        } else {
            this.setState({ expanded: false });
        }
    }

    render() {
        return [
            <tr key="main" onClick={this.toggleExpander}>
                <td>{this.props.topicName}</td>
                <td>{this.props.messages.length}</td>
            </tr>,
            this.state.expanded && (
                <tr className="expandable" key="tr-expander">
                    <td className="uk-background-muted" colSpan={2}>
                        {_.map(this.props.messages, (m) => (
                            <KafkaMessage key={m.offset} message={m} />
                        ))}
                    </td>
                </tr>
            )
        ]
    }
};

Topic.propTypes = {
    topicName: PropTypes.string,
    messages: PropTypes.array
};

export default Topic;
