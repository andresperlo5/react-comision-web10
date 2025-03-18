import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from "./pages/HomePage"
import AboutUs from './pages/AboutUs'
import NavbarC from './components/navbar/NavbarC'
import FooterC from './components/footer/FooterC'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProductDetail from './pages/ProductDetail'
import ErrorPage from './pages/ErrorPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminProductsPage from './pages/AdminProductsPage'
import AdminCreateUpdateProduct from './pages/AdminCreateUpdateProduct'
import UserCartPage from './pages/UserCartPage'
import PrivateRoute from './components/privateroute/PrivateRoute'
import './App.css'

//fragments <> </>
const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path='/admin' element={
            <PrivateRoute rol='admin'>
              <AdminPage />
            </PrivateRoute>
          } />
          <Route path='/admin/users' element={
            <PrivateRoute>
              <AdminUsersPage rol='admin' />
            </PrivateRoute>
          } />
          <Route path='/admin/products' element={
            <PrivateRoute rol='admin'>
              <AdminProductsPage />
            </PrivateRoute>
          } />
          <Route path='/admin/products/createUpdate' element={
            <PrivateRoute rol='admin'>
              <AdminCreateUpdateProduct />
            </PrivateRoute>
          } />
          <Route path='/user/cart' element={
            <PrivateRoute rol='usuario'>
              <UserCartPage />
            </PrivateRoute>
          } />
          <Route path='/user' element={
            <PrivateRoute rol='usuario'>
              <UserPage />
            </PrivateRoute>

          } />

          <Route path='/productDetail/:id' element={<ProductDetail />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <FooterC />
      </Router>
    </>
  )
}


export default App
