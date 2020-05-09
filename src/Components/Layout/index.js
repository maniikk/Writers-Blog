import React from 'react'
import {
  AppBar, Drawer, Hidden, Typography,
  Toolbar, CssBaseline, IconButton,
  MenuList, MenuItem
} from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'
import {Link, withRouter} from 'react-router-dom'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const  {writers, children, location:{pathname}} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <MenuList>
        <MenuItem component = {Link} to='/' selected ={'/' === pathname}>
          Home
        </MenuItem>
        <MenuItem component = {Link} to = 'writers' selected = {'/writers' === pathname}>
          Writers
        </MenuItem>
        <MenuList>
          {writers.map(({name, id}) => {
            const to = `/writers/${id}`
            return (<MenuItem 
                className = {classes.nested} 
                key = {id} 
                component = {Link} 
                to = {to}
                selected = {to === pathname}  >
                  {name}
              </MenuItem>)
          })}
        </MenuList>
      </MenuList>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Writers Blog
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {children}
      </main>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);