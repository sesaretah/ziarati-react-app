import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import FormPage from './components/pages/FormPage';
import NewTourPackage from './components/pages/NewTourPackage';
import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PanelRightPage from './components/pages/PanelRightPage';
import AdvertCard from './components/pages/AdvertCard';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import AdvertShow from './components/pages/AdvertShow';
import NewAdvert from './components/pages/NewAdvert';
import NewCamAdvert from './components/pages/NewCamAdvert';
import EditCamAdvert from './components/pages/EditCamAdvert';
import Chat from './components/pages/Chat';
import Messages from './components/pages/Messages';
import Rooms from './components/pages/Rooms';
import MyAdverts from './components/pages/MyAdverts';
import MyPins from './components/pages/MyPins';
import Categories from './components/pages/Categories';
import SubCategories from './components/pages/SubCategories';
import SubSubCategories from './components/pages/SubSubCategories';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
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
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/new_advert/',
    component: NewAdvert,
  },
  {
    path: '/my_adverts/',
    component: MyAdverts,
  },
  {
    path: '/my_pins/',
    component: MyPins,
  },
  {
    path: '/new_cam_advert/',
    component: NewCamAdvert,
  },
  {
    path: '/messages/',
    component: Messages,
  },
  {
    path: '/edit_advert/:advertId',
    component: EditCamAdvert,
  },
  {
    path: '/chat/:advertId/room/:roomId',
    component: Chat,
  },
  {
    path: '/rooms/:advertId',
    component: Rooms,
  },
  {
    path: '/categories/:categoryId',
    component: Categories,
  },
  {
    path: '/subcategories/:categoryId',
    component: SubCategories,
  },
  {
    path: '/subsubcategories/:categoryId',
    component: SubSubCategories,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/adverts/:advertId',
    component: AdvertShow,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
