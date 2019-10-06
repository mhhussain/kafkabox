import React, { Component } from 'react';
import axios from 'axios';
import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TopicListContainer from './components/TopicListContainer';
import TopicContainer from './components/TopicContainer';

import styles from './components/styles';

class App extends Component {
  state = {
    selectedTopic: '',
    topics: [],
    messages: []
  }

  constructor(props) {
    super(props);

    this.onSelectedTopicChange = this.onSelectedTopicChange.bind(this);
  }

  componentDidMount() {
    // Configure feathers
    let socket = io('http://localhost:3001');
    let app = feathers();

    app.configure(feathers.socketio(socket));

    app.service('messages').find()
        .then((messages) => {
            messages.forEach(this.addMessage);
        });

    app.service('messages').on('created', this.addMessage);

    this.setState({ topics: [{ topic: "sandbox-topic" }, { topic: "test-topic-2" }, { topic: "test-topic-1" }] });
    this.setState({ messages: [
      { topic: "sandbox-topic", partition: 0, offset: 0, value: "world1" },
      { topic: "sandbox-topic", partition: 0, offset: 1, value: "world2" },
      { topic: "test-topic-1", partition: 0, offset: 0, value: "world1" },
      { topic: "test-topic-1", partition: 0, offset: 1, value: "world2" },
      { topic: "test-topic-1", partition: 0, offset: 2, value: "world3" },
      { topic: "test-topic-2", partition: 0, offset: 0, value: "world1" },
    ] });
  }

  addMessage = (message) => {
    // Add message to state
    let joined = this.state.messages.concat(message);
    this.setState({ messages: joined });
  }
  /*

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
  */

  onSelectedTopicChange(topic) {
    this.setState({ selectedTopic: topic });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={this.props.classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Kafkabox
                </Typography>
            </Toolbar>
        </AppBar>
        <TopicListContainer selectedTopic={this.state.selectedTopic}
          topics={this.state.topics}
          onTopicChange={this.onSelectedTopicChange}
          />

        <TopicContainer topicName={this.state.selectedTopic} messages={this.state.messages} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
