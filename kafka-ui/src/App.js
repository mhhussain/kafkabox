import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Topics from './components/Topics';

class App extends Component {
    state = {
        topics: []
    }

    componentDidMount() {
        this.setState({ topics: [
                { topicName: 'sandbox-topic', messages: [{ offset: 0, value: "hello world" }] },
                { topicName: 'superduper', messages: [{ offset: 0, value: "urggrreruugugr" }] },
            ]
        });
    }

    render() {
        return(
            <Router>
                <div className='App'>
                    <Route path='/' render={(props) => (
                        <Topics topics={this.state.topics} />
                        )}
                    />
                </div>
            </Router>
        )
    }
}

export default App;
