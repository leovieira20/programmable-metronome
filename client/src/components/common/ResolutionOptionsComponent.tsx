import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ResolutionOptions } from 'src/domain/entities/ResolutionOptions';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ResolutionOptionsComponent extends React.Component<any, any> {
  state = {
    resolution: 1
  }

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillReceiveProps(props: any) {
    this.setState({ resolution: props.selectedResolutionId })
  }

  render() {
    const { classes } = this.props;
    const { resolution } = this.state;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="resolution">Resolution</InputLabel>
        <Select
          value={resolution}
          onChange={this.handleOnChange}
          inputProps={{
            name: 'resolution',
            id: 'resolution',
          }}>
          {
            ResolutionOptions.map(x => {
              return <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
            })
          }                    
        </Select>
      </FormControl>
    )
  }

  private handleOnChange(e: any) {
    const value = e.target.value;

    this.setState({ resolution: value });
    this.props.onResolutionChanged(value);
  }
}

export default withStyles(styles)(ResolutionOptionsComponent);