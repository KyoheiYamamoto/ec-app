import React, {useCallback, useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar                         from '@material-ui/core/AppBar';
import Toolbar                        from '@material-ui/core/Toolbar';
import {useDispatch, useSelector}     from "react-redux";
import {getSignedIn}                  from "../../reducks/users/selectors";
import logo                           from "../../assets/img/icons/logo.png";
import {HeaderMenu, ClosableDrawer}   from "./index";
import {push}                         from "connected-react-router"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: '#fff',
      color: '#444',
    },
    toolbar: {
      margin: '0 auto',
      maxWidth: 1024,
      width: '100%',
    },
    iconButtons: {
      margin: '0 0 0 auto',
    },
  })
);

const Header = () =>{
  const classes = useStyles();
  const selector = useSelector((state) => state)
  const isSignedIn = getSignedIn(selector)
  const dispatch = useDispatch();

  return (

    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt="Torahack Logo" width="128px"
            onClick={ () => dispatch(push('/') )}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
             <HeaderMenu />
            </div>
          )}
        </Toolbar>

      </AppBar>
    </div>
  )

};
export default Header
