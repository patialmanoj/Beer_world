import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import BeerPage from './components/beer/BeerPage';
import BeerDetailsPage from './components/beer/BeerDetailPage';

export default(
    <Route path="/" component = {App}>
        <IndexRoute component= {HomePage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="beers" component={BeerPage}/>
        <Route path="beer/:id" component={BeerDetailsPage}/>
      
    </Route>
);

