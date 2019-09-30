import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Topics extends Component {
    render() {
        return (
            this.props.topics.map((topic) => (
                <div>
                    <div>{topic.topic}</div>
                    <ul>
                        <li>{topic}</li>
                    </ul>
                </div>
            ))
        )
    }
}

Topics.propTypes = {
    topics: PropTypes.array
}

export default Topics;
