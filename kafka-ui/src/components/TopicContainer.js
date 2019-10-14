import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';

import styles from './styles'

class TopicContainer extends Component {
    state = {
        typedMessage: ''
    };

    onSendMessageTextChange = (e) => {
        this.setState({ typedMessage: e.target.value });
    }

    onSendMessage = (topic, message) => {
        this.props.onSendMessage(topic, message);
        this.setState({ typedMessage: '' });
    }

    render() {
        return (
            <main className={this.props.classes.content} style={{height: "100vh"}}>
                <div className={this.props.classes.toolbar}></div>
                {this.props.topicName === '' ? null :
                    <React.Fragment>
                        <Container style={{maxHeight: "75vh", overflow: "auto"}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="textSecondary">Topic</Typography>
                                            <Typography variant="h6">{this.props.topicName}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography color="textSecondary">Number of messages</Typography>
                                            <Typography variant="h6">{this.props.messages.length}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{width: "10vw"}}>
                                            <Typography color="textSecondary">Offset</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary">Value</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.messages.reverse().map((m, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell>
                                                {m.offset}
                                            </TableCell>
                                            <TableCell>
                                                {m.value}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Container>
                        <Container style={{position: "absolute",bottom: 0}}>
                            <TextField
                                id="outlined-name"
                                label="send message..."
                                margin="normal"
                                variant="outlined"
                                style={{margin: 8, width: "60vw"}}
                                onChange={this.onSendMessageTextChange}
                                value={this.state.typedMessage}
                                />
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                                style={{height: "56px", marginTop: "8px"}}
                                onClick={() => { this.onSendMessage(this.props.topicName, this.state.typedMessage) }}
                                >
                                Send
                            </Button>
                        </Container>
                    </React.Fragment>
                }
            </main>
        )
    }
}

export default withStyles(styles)(TopicContainer);
