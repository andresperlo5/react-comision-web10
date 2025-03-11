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
import './App.css'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'

//fragments <> </>
const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path='/productDetail/:id' element={<ProductDetail />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/user' element={<UserPage />} />
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
