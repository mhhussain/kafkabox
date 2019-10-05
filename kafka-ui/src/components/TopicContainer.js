import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './styles'

class TopicContainer extends Component {

    render() {
        return (
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar}></div>
                <Typography variant="h6">{this.props.topicName}</Typography>
                <List>
                    {this.props.messages.map((m, index) => (
                        this.props.topicName === m.topic ?
                            <ListItem key={index}>
                                <ListItemText key={index}>{m.value}</ListItemText>
                            </ListItem>
                            : null
                    ))}
                </List>
            </main>
        )
    }
}

export default withStyles(styles)(TopicContainer);
