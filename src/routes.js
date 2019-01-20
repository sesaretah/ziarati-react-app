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
    path: '/new_cam_advert/',
    component: NewCamAdvert,
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