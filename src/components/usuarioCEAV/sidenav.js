import React, {Component} from 'react'
import { Layout, Menu, Avatar } from 'antd';
import { MDBIcon,MDBRow,MDBCol } from 'mdbreact';
import './sidenav.css'
import Index from './tablaDirectorio';
import { UserOutlined } from '@ant-design/icons';
import MiCuenta from './miCuenta'
import { FcGoogle } from "react-icons/fc";
import imagenCEAV from '../imagen/CEAVlogo.png'
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBTooltip
} from 'mdbreact';

import {  AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Header, Content, Footer} = Layout;


class side extends Component{
    constructor(props){
        super(props)
        this.state={
          tablaInicio:true,
          modal:true,
          cuenta:false,

        }
        this.cerrar = this.cerrar.bind(this)
        this.toggle = this.toggle.bind(this)
    } 
    cerrar(){
        this.props.history.push("/")
      }
    // miCuenta(){
    //   this.props.history.push("/miCuenta")
    // }  


      
      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

      tablaInicio(){
        this.setState({tablaInicio:true});  
        this.setState({cuenta:false});   
        // this.setState({:false});      
      }
      MiCuenta(){
        this.setState({tablaInicio:false});  
        this.setState({cuenta:true}); 
      }
    

    render(){ 
        let tablaInicio;
        let cuenta;
        if(this.state.tablaInicio === true) {  
            tablaInicio=
            // <div>
              <Index/>
            // </div>
          } 

          if(this.state.cuenta === true){
            cuenta =
            <MiCuenta/>
          }
         
           let nombre = localStorage.getItem("nombre")
           let apellidos = localStorage.getItem("apellidos") 
           let correo = localStorage.getItem("correo")
           

           

        return(
            <React.Fragment>   
              <nav class="navbar navbar-light bg-light" >
  <a class="navbar-brand">
    <img src={imagenCEAV} width="100" height="40" class="d-inline-block align-top" alt="" />   
  </a>
  <Menu className='avatar' mode="horizontal" defaultSelectedKeys={['mail']}>                
          <Menu.SubMenu key="SubMenu"  icon={<UserOutlined style={{ fontSize: '28px', color: '#000' }}/>}>
          <div class="card md-10">
            <div class="card-body">
              <MDBRow>
              <MDBCol md="2">  
                <Avatar  style={{ backgroundColor: "Background", verticalAlign: 'middle',  }} size="large" >{"us"}</Avatar>
              </MDBCol>                            
              <MDBCol md="10">
                <p class="card-title"><h6><strong>{nombre}&nbsp;{apellidos}</strong></h6></p>                            
                <p>{correo}</p>
              </MDBCol>
              </MDBRow>
            </div>
          </div>
            <Menu.Item key="three" onClick={e=>this.MiCuenta()} icon={<AppstoreOutlined />}>Ver cuenta</Menu.Item>
            <Menu.Item key="three" onClick={e=>this.tablaInicio()} icon={<AppstoreOutlined />}>Directorio</Menu.Item>   
            <Menu.Item key="two"  onClick={this.cerrar} icon={<AppstoreOutlined />}>Cerrar Sesión</Menu.Item>                      
          </Menu.SubMenu>
        </Menu>
</nav>
            
      {/* <Header> 
        <center>
                    <a>
                    <img  style={{width:"20%",marginTop:"3%"}} />
                    </a>
                    </center> 
                    <br></br>
                 
         
    </Header> */}
      <Content>
        {tablaInicio}
        {cuenta}
      </Content>
      <Footer className='footer main'>
      <center>
      <FcGoogle />&nbsp;<a href="https://www.gob.mx/ceav" target="_blank">https://www.gob.mx/ceav</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <MDBIcon far icon="envelope" />&nbsp;<a href="comunicacionsocial@ceav.gob.mx" target="_blank">comunicacionsocial@ceav.gob.mx</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <MDBIcon fab icon="twitter" /><a href="@CEAVmex" target="_blank"> @CEAVmex</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <MDBIcon fab icon="facebook" /><a href="https://www.facebook.com/CEAVmex" target="_blank"> @CEAVmex</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <MDBIcon fab icon="instagram" /><a href="https://www.instagram.com/ceav_cs" target="_blank"> @ceav_cs</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      
      </center>
      </Footer>  
            </React.Fragment> 
        )
    }
}export default side