import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import feathers from '@feathersjs/client'
import io from 'socket.io-client';
import axios from 'axios';
import _ from 'lodash';

import Topic from './components/Topic';
import KafkaMessage from './components/KafkaMessage';

class App extends Component {
    state = {
        topics: [],
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

        _.forEach(_.groupBy(this.state.messages, (m) => { return m.topic; }), (messages) => {
            _.map(messages, (m) => {
                console.log(m);
            })
        })
    }

    getTopicArray = () => {
        let messages = this.state.messages;

        let a = _.groupBy(messages, (m) => { return m.topic }).map((m) => {
            return {
                topic: m.key,
                messages: m.value
            }
        });
    }

    render() {
        return(
            <Router>
                <div className='App'>
                    <Route path='/' render={(props) => (
                            _.map(_.map(_.groupBy(this.state.messages, (m) => { return m.topic }), (val, key, col) => {
                                return {
                                    topicName: key,
                                    messages: val
                                }
                            }), (t) => (
                                <Topic topicName={t.topicName} messages={t.messages} />
                            ))
                        )}
                    />
                </div>
            </Router>
        )
    }
}

export default App;
