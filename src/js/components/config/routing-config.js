import { cilHome, cilMap, cilUserPlus } from '@coreui/icons';
import Home from '../Home/Home';
import Resorts from '../Resorts/Resorts';

const routingConfig = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    showInMenu: false,
    component: Home,
  },
  {
    name: 'Resorts',
    path: '/Resorts',
    exact: true,
    showInMenu: true,
    icon: cilHome,
    component: Resorts,
  },
  {
    name: 'Maps',
    path: '/maps',
    exact: true,
    showInMenu: true,
    icon: cilMap,
  },
  {
    name: 'Members',
    path: '/members',
    exact: true,
    showInMenu: true,
    icon: cilUserPlus,
  },
];

export default routingConfig;
