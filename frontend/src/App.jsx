import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreens';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/productEditScreen';
function App() {

  return (
    <Router>
      <Header />
      <main className="py-3 mx-5">
        <Routes>
          <Route path='/' Component={HomeScreen} exact />
          <Route path='/login/' Component={LoginScreen} />
          <Route path='/register/' Component={RegisterScreen} />
          <Route path='/profile/' Component={ProfileScreen} />
          <Route path='/product/:id' Component={ProductScreen} />

          <Route path='/cart/:id?' Component={CartScreen} />
          <Route path='/admin/users' Component={UserListScreen} />
          <Route path='/admin/users/:id/edit' Component={UserEditScreen} />
          <Route path='/admin/products' Component={ProductListScreen} />
          <Route path='/admin/products' Component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' Component={ProductEditScreen} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
