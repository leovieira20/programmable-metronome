import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ResolutionOptions extends Component {
  state = {
    resolution: 1
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="resolution">Resolution</InputLabel>
        <Select
          value={this.state.resolution}
          onChange={this.handleChange}
          inputProps={{
            name: 'resolution',
            id: 'resolution',
          }}>          
          <MenuItem value={1}>Quarter notes</MenuItem>
          <MenuItem value={2}>8th notes</MenuItem>
          <MenuItem value={3}>8th notes triplets</MenuItem>
          <MenuItem value={4}>16th notes</MenuItem>
          <MenuItem value={5}>16th notes triplets</MenuItem>
        </Select>
      </FormControl>
    )
  }
}

export default withStyles(styles)(ResolutionOptions);