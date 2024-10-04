import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, useLocation } from 'react-router-dom';
// import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import Navigation from './pages/auth/Navigation';
import Footer from './components/Footer/Footer';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home/Home';
import Shop from './pages/Shoping/Shop';
import ProductDetail from './pages/Products/ProductInfo';
import Cart from './pages/Cart/Cart';
import AboutUs from './pages/Others/AboutUs';
import ContactUs from './pages/Others/ContactUs';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PrivateRoute from './pages/users/PrivateRoute';
import Profile from './pages/users/Profile';
import Shipping from './pages/Orders/Shipping';
import Order from './pages/Orders/Order';
import MyOrder from './pages/users/MyOrder';
import OrderDone from './pages/Orders/OrderDone';
import ChangePassword from './pages/users/ChangePassword';
import EditProfile from './pages/users/EditProfile';
import Favorite from './pages/Products/UserFav/Favorite';
import AdminRoutes from './pages/admin/AdminRoutes';
import Dashboard from './pages/admin/Dashboard';
import UsersList from './pages/admin/UsersList';
import OrderList from './pages/admin/OrderList';
import CategoryList from './pages/admin/CategoryList';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';
import UpdateProduct from './pages/admin/UpdateProduct';

import useUser from './hooks/useUser';
import { useSelector } from 'react-redux';
import Loder from './components/Loder';

const Root = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <Navigation />
            <main className="pt-24 pb-4 min-h-[80vh]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />

            <Route path="" element={<PrivateRoute />}>
                <Route path="/v1/me" element={<Profile />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="order" element={<Order />} />
                <Route path="v1/order-details" element={<MyOrder />} />
                {/* <Route path="order/:id" element={<Payment />} /> */}
                <Route path="order/:id" element={<OrderDone />} />
                <Route path="v1/change-password" element={<ChangePassword />} />
                <Route path="v1/edit-profile" element={<EditProfile />} />
                <Route path="v1/favorite" element={<Favorite />} />
            </Route>

            <Route path="/admin" element={<AdminRoutes />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-list" element={<UsersList />} />
                {/* </Route>
            <Route path="/admin" element={<VendorRoutes />}> */}
                <Route path="orders" element={<OrderList />} />
                <Route path="category" element={<CategoryList />} />
                <Route path="productlist" element={<ProductList />} />
                <Route path="addproduct" element={<AddProduct />} />
                <Route path="Updateproduct/:id" element={<UpdateProduct />} />
            </Route>
        </Route>,
    ),
);

function App() {
    useUser();
    const { userInfo, lodding } = useSelector((state) => state.user);

    if (lodding) {
        return <Loder />; // Show loading spinner while fetching user info
    }

    return (
        <>
            <ToastContainer position="bottom-center" pauseOnHover={false} autoClose={1500} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
