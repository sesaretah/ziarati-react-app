import HomePage from './components/pages/HomePage';
//import AboutPage from './components/pages/AboutPage';
//import FormPage from './components/pages/FormPage';
//import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
//import PanelRightPage from './components/pages/PanelRightPage';
//import AdvertCard from './components/pages/AdvertCard';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
//import AdvertShow from './components/pages/AdvertShow';
//import NewAdvert from './components/pages/NewAdvert';
//import NewCamAdvert from './components/pages/NewCamAdvert';
//import EditCamAdvert from './components/pages/EditCamAdvert';
//import Chat from './components/pages/Chat';
//import Messages from './components/pages/Messages';
//import Rooms from './components/pages/Rooms';
//import MyAdverts from './components/pages/MyAdverts';
//import MyPins from './components/pages/MyPins';
//import Categories from './components/pages/Categories';
//import SubCategories from './components/pages/SubCategories';
//import SubSubCategories from './components/pages/SubSubCategories';
import TourPackages from './components/pages/TourPackages';
import Tour from './components/pages/Tour';
import Reservation from './components/pages/Reservation';
import VerifiedReservation from './components/pages/VerifiedReservation';
import MyReservations from './components/pages/MyReservations';
import Blog from './components/pages/Blog';
import ViewBlog from './components/pages/ViewBlog';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: Login,
  },
  {
    path: '/sign_up/',
    component: SignUp,
  },
  {
    path: '/blogs/',
    component: Blog,
  },
  {
    path: '/blog/:blogId',
    component: ViewBlog,
  },
  {
    path: '/tour_packages/:tourPackageId',
    component: TourPackages,
  },
  {
    path: '/tour/:tourId',
    component: Tour,
  },
  {
    path: '/reservation/:tourId',
    component: Reservation,
  },
  {
    path: '/verified_reservation/:tourId',
    component: VerifiedReservation,
  },
  {
    path: '/my_reservations/',
    component: MyReservations,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
