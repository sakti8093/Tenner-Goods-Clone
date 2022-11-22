import { Routes, Route } from 'react-router-dom';
import PrivateRouting from './Components/PrivateRouting';
import AdminPage from './Pages/AdminForm';
import CratPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import Home from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import Mazma from './Pages/MazmaWires';
import ProductDetails from './Pages/Productdetail';
import Products from './Pages/Products';
import SignupPage from './Pages/Signup';
import UserPage from './Pages/UserPage';


function Allroutes() {
    return ( <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path="/products" element={ <PrivateRouting> <Products/> </PrivateRouting> } ></Route>
        <Route path='/:products/:id' element={ <PrivateRouting><ProductDetails/></PrivateRouting> } ></Route>
        <Route path='/login' element={<LoginPage/>} ></Route>
        <Route path='/signup' element={<SignupPage/>} ></Route>
        <Route path='/mazma' element={<Mazma/>} ></Route>
        <Route path='/admin/form' element={<AdminPage/>} ></Route>
        <Route path='/user' element={<UserPage/>} ></Route>
        <Route path='/user/cart' element={ <PrivateRouting><CratPage/></PrivateRouting> } ></Route>
        <Route path='/user/cart/checkout' element={<CheckoutPage/>} ></Route>
    </Routes> );
}

export default Allroutes;