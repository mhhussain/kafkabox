import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import feathers from '@feathersjs/client'
import io from 'socket.io-client';
import axios from 'axios';
import _ from 'lodash';

import './components/styles.css';

import Topic from './components/Topic';

class App extends Component {
    state = {
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
                        <main>
                            <div className="table-container">
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                <thead>
                                    <tr>
                                        <th className="uk-table-shrink">Topic Name</th>
                                        <th className="uk-table-shrink">Messages</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_.map(_.map(_.groupBy(this.state.messages, (m) => { return m.topic }), (val, key, col) => {
                                        return {
                                            topicName: key,
                                            messages: val
                                        }
                                    }), (t) => (
                                        <Topic topicName={t.topicName} messages={t.messages} />
                                    ))}
                                </tbody>
                                </table>
                            </div>
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
