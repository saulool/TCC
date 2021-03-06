import HomeController from '/src/modules/home/controllers/homeController';
import route from '/src/modules/home/route';

import '../../styles/home.scss';

const Home = angular.module('app.home', ['ui.router']).
			controller('HomeController', HomeController).
			config(route);

export default Home.name;