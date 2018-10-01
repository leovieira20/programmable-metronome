import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { inject } from 'inversify';
// import TYPES from '../../../ioc/types';
// import { UserRepository } from 'src/domain/services/UserRepository';
// import { LoginService } from 'src/domain/services/LoginService';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const NavBar = class NavBar extends React.Component<any, any> {
  user: any;

  // @inject(TYPES.UserRepository) public userRepository: UserRepository;
  // @inject(TYPES.LoginService) private loginService: LoginService

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Programmable Metronome
              </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    )

    // return (
    //   <nav>
    //     <div className="nav-wrapper">
    //       <a href="#" className="brand-logo hide-on-small-only">Programmable Metronome</a>
    //       <a href="#" className="brand-logo hide-on-med-and-up">Metronome</a>
    //       <ul id="nav-mobile" className="right hide-on-med-and-down">
    //         <li>
    //           {
    //             this.user ?
    //               <a className="waves-effect waves-light btn" onClick={() => this.logout()}>Logout</a>
    //               :
    //               <a className="waves-effect waves-light btn" onClick={() => this.login()}>Login</a>
    //           }
    //         </li >
    //       </ul >
    //     </div >
    //   </nav >
    // )
  }

  componentWillMount() {
    // this.userRepository.user.subscribe(x => {
    //   this.user = x;
    // });
  }

  login() {
    // this.loginService.login();
  }

  logout() {
    // this.loginService.logout();
  }
}

export default withStyles(styles)(NavBar);