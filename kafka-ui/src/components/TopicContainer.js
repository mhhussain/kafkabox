import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';

import styles from './styles'

class TopicContainer extends Component {

    render() {
        return (
            <main className={this.props.classes.content} style={{height: "100vh"}}>
                <div className={this.props.classes.toolbar}></div>
                <Container>
                    <Typography variant="h6">{this.props.topicName}</Typography>
                    <Typography variant="h6">{this.props.messages.length}</Typography>
                    <List>
                        {this.props.messages.map((m, index) => (
                            this.props.topicName === m.topic ?
                                <ListItem key={index}>
                                    <ListItemText key={index}>{m.value}</ListItemText>
                                </ListItem>
                                : null
                        ))}
                    </List>
                </Container>
                {this.props.topicName === '' ? null :
                <Container style={{position: "absolute",bottom: 0}}>
                    <TextField
                            id="outlined-name"
                            label="send message..."
                            margin="normal"
                            variant="outlined"
                            style={{margin: 8, width: "60vw"}}

                            />
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Icon>send</Icon>}
                            style={{height: "56px", marginTop: "8px"}}
                            >
                            Send
                        </Button>
                </Container>
                }
            </main>
        )
    }
}

export default withStyles(styles)(TopicContainer);
