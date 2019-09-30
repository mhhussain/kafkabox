import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import feathers from '@feathersjs/client'
import io from 'socket.io-client';
import axios from 'axios';

import Topics from './components/Topics';
import KafkaMessage from './components/KafkaMessage';

class App extends Component {
    state = {
        topics: [],
        messages: []
    }

    componentDidMount() {
        let socket = io('http://localhost:3001');
        let app = feathers();

        app.configure(feathers.socketio(socket));

        app.service('messages').find()
            .then((messages) => {
                messages.forEach(this.addMessage);
            });

        app.service('messages').on('created', this.addMessage);

        this.setState({ topics: [
                { topicName: 'sandbox-topic', messages: [{ offset: 0, value: "hello world" }] },
                { topicName: 'superduper', messages: [{ offset: 0, value: "urggrreruugugr" }] },
            ]
        });
    }

    addMessage = (message) => {
        // Add message to state
        let joined = this.state.messages.concat(message);
        console.log('hghgh');
        this.setState({ messages: joined });
        this.forceUpdate();
    }

    render() {
        return(
            <Router>
                <div className='App'>
                    <Route path='/' render={(props) => (
                        this.state.messages.map((message) => (
                            <KafkaMessage message={message} />
                            ))
                        )}
                    />
                </div>
            </Router>
        )
    }
}

export default App;
