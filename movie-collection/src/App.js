import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import Logout from './components/logout';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/common/protectedRoute';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar user={user} />
                <main className='container'>
                    <Switch>
                        <Route path='/register' component={RegisterForm} />
                        <Route path='/logout' component={Logout} />
                        <Route path='/login' component={LoginForm} />
                        <ProtectedRoute
                            path='/movies/:id'
                            component={MovieForm}
                        />
                        <Route
                            path='/movies'
                            render={(props) => (
                                <Movies {...props} user={this.state.user} />
                            )}
                        />
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
