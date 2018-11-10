import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToAppRounded'
import TurnedIn from '@material-ui/icons/TurnedIn'
import MoreIcon from '@material-ui/icons/MoreVert'

import { withAuth } from '../AuthProvider'

const styles = theme => ({
  menuBar: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  linkStyle : {
    textDecoration:'none',
    color: 'inherit'
  },
  linkMobileStyle : {
    textDecoration:'none',
    color: 'inherit'
  },
})

class AppNavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state
    const { classes } = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const { isLogged, user, logout, userProfile, userFavorites } = this.props
    const { username, favorites } = user
    // console.log('userIsLogged:',isLogged);
    if (isLogged) {
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem onClick={userFavorites}>
            <IconButton color="inherit" >
              <Link className={classes.linkMobileStyle} to='/favorites'>
              <Badge className={classes.margin} badgeContent={favorites.length} color="secondary">
                <TurnedIn />
              </Badge>
            </Link>
            </IconButton>
            <p>Fav</p>
          </MenuItem>
          <MenuItem onClick={userProfile} >
            <Link className={classes.linkMobileStyle} to='/profile'>
              <IconButton color="inherit">
                <AccountCircle />
                <p>Profile</p>
              </IconButton>
            </Link>
          </MenuItem>
          <MenuItem onClick={logout}>
            <IconButton color="inherit">
              <ExitToApp />
            </IconButton>
            <p>LogOut</p>
          </MenuItem>
        </Menu>
      )

    return (
        <div className={classes.menuBar}>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={this.props.handleSearch}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <Link className={classes.linkStyle} to='/favorites'>
                    <IconButton onClick={userFavorites} color="inherit" >
                      <Badge className={classes.margin} badgeContent={favorites.length} color="secondary">
                        <TurnedIn />
                      </Badge>
                    </IconButton>
                  </Link>
                  <Link className={classes.linkStyle} to='/profile'>
                    <IconButton
                      aria-owns={isMenuOpen ? 'material-appbar' : null}
                      aria-haspopup="true"
                      onClick={userProfile}
                      color="inherit"
                      >
                      <AccountCircle />
                    </IconButton>
                   </Link>

                  <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                    aria-haspopup="true"
                    onClick={logout}
                    color="inherit"
                  >
                  <ExitToApp />
                  </IconButton>
                </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />{username}
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {/* {renderMenu} */}
          {renderMobileMenu}
        </div>
      )
    }else{
      return(
        <div>
          <Redirect to='/login'></Redirect>
          {/*
          <Redirect to='/profile'/>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          */}
        </div>)
    }
  }
}

export default withAuth()(withStyles(styles)(AppNavBar))
