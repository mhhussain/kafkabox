import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import feathers from '@feathersjs/client'
import io from 'socket.io-client';
import axios from 'axios';
import _ from 'lodash';

import './components/styles.css';

import TopicList from './components/TopicList';
import Topic from './components/Topic';

class App extends Component {
    state = {
        selectedTopic: '',
        messages: []
    }

    componentDidMount() {
        // Setup socket
        let socket = io('http://localhost:3001');
        let app = feathers();

        app.configure(feathers.socketio(socket));

        app.service('messages').find()
            .then((messages) => {
                messages.forEach(this.addMessage);
            });

        app.service('messages').on('created', this.addMessage);
    }

    addMessage = (message) => {
        // Add message to state
        let joined = this.state.messages.concat(message);
        this.setState({ messages: joined });
    }

    onTopicSelect = (topic) => {
        this.setState({ selectedTopic: topic });
    }

    render() {
        return(
            <Router>
                <div className='App'>
                    <Route path='/' render={(props) => (
                        <main className="uk-flex uk-flex-auto">
                            <TopicList  topics={_.uniq(_.map(this.state.messages, (t) => { return t.topic }), (t) => { return t.topic })}
                                        selectTopic={this.onTopicSelect}
                                />
                            <div className="uk-width-3-4 uk-flex-column">
                                {_.map(_.filter(_.map(_.groupBy(this.state.messages, (m) => { return m.topic }), (val, key, col) => {
                                    return {
                                        topicName: key,
                                        messages: val
                                    }
                                }), (t) => { return t.topicName === this.state.selectedTopic }), (t) => (
                                    <Topic topicName={t.topicName} messages={t.messages} />
                                ))}
                            </div>
                        </main>
                        )}
                    />
                </div>
            </Router>
        )
    }
};

export default App;
