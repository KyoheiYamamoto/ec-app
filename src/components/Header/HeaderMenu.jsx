import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCarIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { getProductsInCart, getUserId } from '../../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/index';
import { fetchProductsInCart } from '../../reducks/users/operations';
import { push } from 'connected-react-router';

const HeaderMenu = (props) => {
  const selector = useSelector((state) => state);
  let productsInCart = getProductsInCart(selector);
  const uid = getUserId(selector);
  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscribe = db.collection('users').doc(uid).collection('cart')

      .onSnapshot(snapshots =>{
        snapshots.docChanges().forEach(change =>{
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case 'added':
              productsInCart.push(product);
              break;
            case 'modified':
              const index = productsInCart.findIndex((product) => product.cartId === change.doc.id);
              productsInCart[index] = product;
              break;
            case 'removed':
              productsInCart = productsInCart.filter((product) => product.cartId !== change.doc.id);
              break;
            default:
              break;
          }
        })
        dispatch(fetchProductsInCart(productsInCart));
     })
   return () => unsubscribe()
  }, [])

  return (
    <>
      <IconButton onClick={() => dispatch(push('/cart'))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCarIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event, true)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenu;
