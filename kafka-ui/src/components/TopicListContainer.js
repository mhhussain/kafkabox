import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';

class TopicListContainer extends Component {
    state = {
        dialogTopicInput: '',
        dialogOpen: false
    }

    onDialogTopicInputChange = (e) => {
        this.setState({ dialogTopicInput: e.target.value });
    }

    createTopic = () => {
        this.props.onTopicCreate(this.state.dialogTopicInput);
        this.closeCreateDialog();
    }

    openCreateDialog = () => {
        this.setState({ dialogOpen: true });
    }

    closeCreateDialog = () => {
        this.setState({ dialogOpen: false });
    }

    render() {
        return (
            <Drawer
                className={this.props.classes.drawer}
                variant="permanent"
                classes={{ paper: this.props.classes.drawerPaper }}
                anchor="left"
                >
                <div className={this.props.classes.toolbar} />
                <Divider />
                <List>
                    <ListItem key="Topics">
                        <ListItemText primary="Topics" />
                        <Fab color="primary" size="small">
                            <AddIcon onClick={this.openCreateDialog}/>
                        </Fab>
                    </ListItem>
                </List>
                <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.dialogOpen} onClose={this.closeCreateDialog}>
                    <DialogTitle>Create Topic</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outlined-name"
                            label="Topic name"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onDialogTopicInputChange}
                            value={this.state.dialogTopicInput}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.createTopic} color="primary">
                            Create
                        </Button>
                        <Button onClick={this.closeCreateDialog} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Divider />
                <List>
                {this.props.topics.map((t, index) => (
                    <ListItem button
                        selected={t.name === this.props.selectedTopic}
                        key={t.name}
                        onClick={() => { this.props.onTopicChange(t.name) }}
                        >
                        <ListItemText primary={t.name} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(TopicListContainer);
