import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

export interface PROPS {
    classes: any,
    children: Array<any>    
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class SimpleTabs extends React.Component<PROPS, any> {
    state = {
        value: 0,
    };
    
    render() {
        const { classes, children } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        {
                            children.map((c, i) => {
                                return <Tab key={i} label={c.key} />
                            })
                        }
                    </Tabs>
                </AppBar>
                {
                    children.map((c, i) => {
                        return <TabContainer key={i}>{c}</TabContainer>
                    })
                }
            </div>
        );
    }

    handleChange = (_, value) => {
        this.setState({ value });
    };
}

export default withStyles(styles)(SimpleTabs);