import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TopicList extends Component {

    render() {
        return (
            <div className="uk-flex-column uk-height-1-1 uk-width-1-4">
                <div className="uk-flex-center uk-width-1-1">Topic List</div>
                {_.map(this.props.topics, (t) =>(
                    <button key={t} onClick={() => { this.props.selectTopic(t) }} className="uk-button uk-button-default uk-width-1-1">{t}</button>
                ))}
            </div>
        )
    }
};

TopicList.propTypes = {
    topics: PropTypes.array,
    selectTopic: PropTypes.func
};

export default TopicList;
