import './sass/styles.scss';
import _ from 'lodash';
import { loginComponent } from './screens/login/index';

require('babel-polyfill');

document.body.appendChild(loginComponent);