import React from 'react'
import { Route, Switch} from 'react-router';
import {Link, useHistory} from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Collections from './components/Collections';
import Products from './components/Products';
import Categories from './components/Categories';
import Delivery from './components/Delivery'
import Dashboard from './components/admin/Dashboard';
import Cart from './components/Cart';
import PaymentSuccess from './components/PaymentSuccess';
import TransactionHistory from './components/TransactionHistory';

export default function App() {
  const history = useHistory();
  const admin = localStorage.isAdmin;
  const email = localStorage.registeredUser;
  return (
    <div>
      <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/signup" exact>
            <Signup></Signup>
          </Route>
          <Route path="/login" exact>
            <Login></Login>
          </Route>
          <Route path="/collections" exact>
            <Collections></Collections>
          </Route>
          <Route path="/products/:id" exact>
            <Products></Products>
          </Route>
          <Route path="/categories/:id" exact>
            <Categories></Categories>
          </Route>
          <Route path="/details" exact>
            {email ? <Delivery></Delivery> : history.push('/collections')}
          </Route>
          <Route path="/cart" exact>
            <Cart></Cart>
          </Route>
          <Route path="/admin/dashboard" exact>
            {admin ? <Dashboard></Dashboard> : history.push('/')}
          </Route>
          <Route path="/success" exact>
          {email ? <PaymentSuccess/> : history.push('/collections')}
          </Route>
          <Route path="/history" exact>
            <TransactionHistory/>
          </Route>
      </Switch>
    </div>
  )
}
