import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './styles'

class TopicContainer extends Component {

    render() {
        return (
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar}></div>
                <Typography variant="h6">{this.props.topicName}</Typography>
                {this.props.messages.map((m, index) => (
                    this.props.topicName === m.topic ? <Typography key={index}>{m.value}</Typography> : null
                ))}
            </main>
        )
    }
}

export default withStyles(styles)(TopicContainer);
