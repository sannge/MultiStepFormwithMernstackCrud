import React from 'react'
import NavBar from '../containers/NavbarContainer'
import {Switch, Route} from 'react-router-dom'
import Home from '../containers/pages/Home'
import Form from '../containers/pages/Form'
import Athletes from '../containers/pages/Athletes'
import AthleteProfile from '../containers/pages/AthleteProfile'


function Layout() {
    return (
        <div>
            <NavBar/>
            <div className="max-w-7xl 2xl:mx-auto">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/form" component={Form}/>
                <Route exact path="/athletes" component={Athletes}/>
                <Route path="/athletes/:id" component={AthleteProfile}/>
                <Route path="/" component={Home}/>

            </Switch>
            </div>
            
        </div>
    )
}

export default Layout
