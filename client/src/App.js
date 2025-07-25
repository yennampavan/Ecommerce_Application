import './App.css';
// import Layout from './components/Layout/Layout';
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRout from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import UpdateProduct from './pages/Admin/UpdateProduct';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
// import CartPage from './pages/CartPage';

function App() {
  return (
    <>
    {/* <Layout>
      <h1>Ecommerce app</h1>

    </Layout> */}
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/product/:slug' element={<ProductDetails/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/category/:slug' element={<CategoryProduct/>}/>
      {/* <Route path='/cart' element={<CartPage/>}/> */}
      <Route path='/dashboard' element={<PrivateRout/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/profile' element={<Profile/>}/>
        <Route path='user/orders' element={<Orders/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-product' element={<CreateProduct/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path="/dashboard/admin/update-product/:slug" element={<UpdateProduct />} /> 
      </Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<Pagenotfound/>}/>

    </Routes>
            <ToastContainer position="top-right" autoClose={3000} />



    </>
  );
}

export default App;
