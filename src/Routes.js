import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import About from './components/Navigation/About'
import HowitWorks from './components/Navigation/HowitWorks'
import Detail from './containers/Detail'
import Listing from './containers/Listing'
import Register from './components/Home/Register'
import ResetPassword from './components/Auth/ResetPassword'
import UserProfile from './containers/UserProfile'
import PrivateRoute from './components/Route/PrivateRoute'
import AgentRoute from './components/Route/AgentRoute'
import FavouriteProperty from './components/Property/FavouriteProperty'
import AgentDashboard from './containers/AgentDashboard'
import Dashboard from './containers/Dashboard'
import BuyerProperties from './containers/BuyerProperties'
import BuyerDashboard from './containers/BuyerDashboard'
import Contact from './components/Contact'
import PropertyStatusView from './containers/PropertyStatusView'
import DefaultLoading from './components/Common/DefaultLoading'
import Pricing from './components/PricingPage'
import Success from './components/Home/Success'
import Faq from './components/Faq'
import ManageProperty from './containers/ManageProperty'

const Routes = (props) => (
        <Switch>
            <Route exact path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path='/How_it_works' component={HowitWorks} />
            <Route path="/contact" component={Contact} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/search" component={Listing} />
            <Route path="/register" component={Register} />
            <Route path="/search/:highlight" exact component={Listing} />
            <Route path="/search/:filter" exact component={Listing} />
            <Route path="/detail" exact component={Detail} />
            <Route path="/faq" component={Faq} />
            <Route path="/success" component={Success} />
            <Route path="/detail/:property_uuid" exact component={Detail} />
            <Route path="/user/reset-password" component={ResetPassword} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/user_profile" component={UserProfile} />
            <PrivateRoute path="/my_favorites" component={FavouriteProperty} />
            <AgentRoute path="/agent_dashboard" component={AgentDashboard} />
            <PrivateRoute path="/buyer_dashboard/:id" component={BuyerDashboard} />
            <PrivateRoute path="/buyer_property_list" component={BuyerProperties} />
            <PrivateRoute path="/property_status_view" component={PropertyStatusView} />
            <AgentRoute path="/manage_property" component={ManageProperty} />
            <AgentRoute path="/manage_property/:id" component={ManageProperty} />
            <Route path="/default" component={DefaultLoading} />
        </Switch>
)
export default Routes


