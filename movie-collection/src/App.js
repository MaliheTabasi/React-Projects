import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBAr from './components/navBar';
import MovieForm from './components/movieForm';
import './App.css';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBAr />
                <main className='container'>
                    <Switch>
                        <Route path='/movies/:id' component={MovieForm} />
                        <Route path='/movies' component={Movies} />
                        <Route path='/rentals' component={Rentals} />
                        <Route path='/customers' component={Customers} />
                        <Route path='/not-found' component={NotFound} />
                        <Redirect from='/' exact to='/movies' />
                        <Redirect to='/not-found' />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
