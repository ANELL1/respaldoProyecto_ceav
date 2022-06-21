import React,{Component} from 'react';
import {BrowserRouter as Router , Switch ,Route, Redirect} from 'react-router-dom'
import './App.css';

import login from './components/usuarioCEAV/login'
import passwordUpdate from './components/usuarioCEAV/changePAssword'
import singUp from './components/adminCEAV/signUpEmpleado'
import checkTokenEmpleados from './components/resolvers/checkTokenEmpleados';
import side from './components/usuarioCEAV/sidenav'
import miCuenta from './components/usuarioCEAV/miCuenta'

import panelConexion from './components/panelConexion/panelConexion'

import dataEmpleados from './components/usuarioCEAV/tablaDirectorio'


//  *****************DIRECTORIO***********
import Dashboard from './components/usuarioCEAV/dashboard';
// *******PANEL ADMIN *************
import checkTokenAdmin from './components/resolvers/checkTokenAdmin';
import loginAdmin from './components/adminCEAV/loginAdmin'
import sideNavAdmin from './components/adminCEAV/sideNavAdmin'
import catalogoArea from './components/adminCEAV/signUpCatAreas'
import catalogoOficinas from './components/adminCEAV/signUpCatOficinas'
import catalogoPersonal from './components/adminCEAV/signUpCatPersonal'
import catalogoRoles from './components/adminCEAV/signUpCatRoles'
import catalogoPuesto from './components/adminCEAV/signUpCatPuesto';
import pass from './components/adminCEAV/changePassword'
 
class App extends Component{

render(){
  const PrivateRouteEmpleados = ({component:Component,...rest})=>(
    <Route {...rest  } render={(props) => checkTokenEmpleados() === true ? <Component {...props}/> : <Redirect to="/"/>}/>
      )
      const PrivateRouteAdmin = ({component:Component,...rest})=>(
        <Route {...rest  } render={(props) => checkTokenAdmin() === true ? <Component {...props}/> : <Redirect to="/admin"/>}/>
          )
 

  return(
    <Router>
    <Switch>
      <main>  

       <Route exact path = "/" component={Dashboard}/>  
       
       <Route exact path={"/admin"} component={loginAdmin}/>
       <PrivateRouteEmpleados exact path={"/empleados"} component={dataEmpleados}/>    
       <PrivateRouteEmpleados exact path={"/side"} component={side}/>
       <PrivateRouteEmpleados exact path={"/miCuenta"} component={miCuenta}/>
       <PrivateRouteEmpleados exact path = "/passwordUpdate" component={passwordUpdate}/> 
       {/* <Route exact path={"/panel"} component={panelConexion}/> */}
       {/* <Route exact path={"/panelPrueba"} component={panelPrueba}/> */}
       
       <PrivateRouteAdmin exact path={"/sideNavAdmin"} component={sideNavAdmin}/>
       <PrivateRouteAdmin exact path={"/area"} component={catalogoArea}/>
       <PrivateRouteAdmin exact path={"/oficinas"} component={catalogoOficinas}/>
       <PrivateRouteAdmin exact path={"/personal"} component={catalogoPersonal}/>
       <PrivateRouteAdmin exact path={"/puesto"} component={catalogoPuesto}/>
       <PrivateRouteAdmin exact path={"/roles"} component={catalogoRoles}/>
       <PrivateRouteAdmin exact path={"/cambioPass"} component={pass}/>
       {/* <Route exact path= "/sin" component={singUp}/> */}

       {/* <Route exact path={"/sideNavAdmin"} component={sideNavAdmin}/> */}
      </main>  
       </Switch>          
       </Router>
  )
}
}
export default App