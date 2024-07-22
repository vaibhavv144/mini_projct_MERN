import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/admin/AdminOrders';
import LandingPage from './LadingPage/LandingPage';



function App() {
  return (
    <>
    <Routes>
    <Route path = '/' element ={<LandingPage/>}/>
      <Route path = '/homepage' element ={<HomePage/>}/> 
      <Route path = '/register' element ={<Register/>}/>
      <Route path="/product/:slug" element={<ProductDetails/>} />
      <Route path="/categories" element={<Categories/>} />
      <Route path="/category/:slug" element={<CategoryProduct/>} />
      <Route path = '/search' element ={<Search/>}/>
      <Route path="/cart" element={<CartPage/>} />
      <Route path = '/dashboard' element= {<PrivateRoute/>}>
      <Route path = 'user' element ={<Dashboard/>}/>
      <Route path = 'user/orders' element ={<Orders/>}/>
      <Route path = 'user/profile' element ={<Profile/>}/>
      </Route>
      <Route path = '/dashboard' element= {<AdminRoute/>}>
      <Route path = 'admin' element ={<AdminDashboard/>}/>
      <Route path = '/dashboard/admin/create-category' element ={<CreateCategory/>}/>
      <Route path = '/dashboard/admin/create-product' element ={<CreateProduct/>}/>
      <Route path = '/dashboard/admin/product/:slug' element ={<UpdateProduct/>}/>
      <Route path = '/dashboard/admin/products' element ={<Products/>}/>
      <Route path = '/dashboard/admin/users' element ={<Users/>}/>
      <Route path = '/dashboard/admin/orders' element ={<AdminOrders/>}/>
      </Route>
      <Route path = '/login' element ={<Login/>}/> 
      <Route path = '/forgot-password' element ={<ForgotPassword/>}/>
      <Route path = '/about' element ={<About/>}/> 
      <Route path = '/contact' element ={<Contact/>}/> 
      <Route path = '/policy' element ={<Policy/>}/> 
      <Route path = '/*' element ={<Pagenotfound/>}/> 

    </Routes>
  
    </>
    
  );
}

export default App;
