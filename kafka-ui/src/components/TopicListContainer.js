import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CachedIcon from '@material-ui/icons/Cached';

import styles from './styles';

class TopicListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Drawer
                className={this.props.classes.drawer}
                variant="permanent"
                classes={{
                paper: this.props.classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={this.props.classes.toolbar} />
                <Divider />
                <List>
                    <ListItem key="Topics">
                        <ListItemText primary="Topics" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                {this.props.topics.map((t, index) => (
                    <ListItem button key={t.topic} onClick={() => { this.props.onTopicChange(t.topic) }}>
                        <ListItemIcon>{t.topic === this.props.selectedTopic ? <CachedIcon /> : null}</ListItemIcon>
                        <ListItemText primary={t.topic} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(TopicListContainer);
