import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TopicListContainer from './components/TopicListContainer';

import './App.css';

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
    this.setState({ topics: [{ topic: "sandbox-topic" }, { topic: "test-topic-2" }, { topic: "test-topic-1" }] });
  }

  onSelectedTopicChange(topic) {
    this.setState({ selectedTopic: topic });
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <CssBaseline />
        <AppBar position="fixed" style={{width: "calc(100% - 240px)"}}>
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Kafkabox
                </Typography>
            </Toolbar>
        </AppBar>
        <TopicListContainer selectedTopic={this.state.selectedTopic}
          topics={this.state.topics}
          onTopicChange={this.onSelectedTopicChange}
          />

        <main>
              <div></div>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography>
          </main>
      </div>
    );
  }
}

export default App;
