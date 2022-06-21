import React, {Component} from 'react'
import { Layout, Menu, Avatar,Select } from 'antd';
import { MDBIcon,MDBRow,MDBCol } from 'mdbreact';
import './sidenav.css'
import { FcGoogle } from "react-icons/fc";
import imagenCEAV from '../imagen/CEAVlogo.png'
  import axios from 'axios'
import {API} from '../Graphql/Graphql';
import MUIDataTable from "mui-datatables";
import {  Card, Form as form} from 'antd';

const { Header, Content, Footer} = Layout;


class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
          tablaInicio:true,
          tablaEmpledos:[],
          modal:false,
          tablaInicio:true,
          dataID:[],
          nombreR:"",
          apellidosR:"",
          correoR:"",
          telefono:"",
          nombre:"",


        }

    } 
    async componentWillMount(){
        await axios({
               url:API,
               method:'post',
               data:{
                 query:`
                   query{   
                    getTablaDataEmpleadoUser(data:"${[]}"){
                        id_empleado
                        nombre
                        apellidos        
                        correo
                        numEmpleado
                        telefono
                        ext
                        dependencia
                        statusEmpleado
                        departamento
                        nombreArea               
                        message
                       } 
                   }
                   `  }           
                })
              .then(response => { 
                 this.setState({tablaEmpledos:response.data.data.getTablaDataEmpleadoUser}) 
               })
               .catch(err=>{
                  console.log('error' ,err.response)
               })    
       }

    render(){ 
        let tablaInicio;
        let data1;

        const options={ 
            filterType:"drowpdawn",
            responsive: "stacked",
            print:false,
            download:false,
            viewColumns:false,
            elevation:0,
            selectableRows:"none",
            textLabels:{
            body: {
              noMatch: "Lo sentimos, no se encontraron registros coincidentes",
              toolTip: " Ordenar",
              columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            pagination: {
              next: "Página siguiente",
              previous: "Página anterior",
              rowsPerPage: "Filas por página:",
              displayRows: "de",
            },
            toolbar: {
              search: "Buscar",
              downloadCsv: " Descargar CSV",
              print: "Imprimir ",
              viewColumns: "Ver columnas",
              filterTable: "Tabla de filtros",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "RESET",
            },
            viewColumns: {
              title: "Mostrar columnas",
              titleAria: "Mostrar / Ocultar columnas de tabla",
            },
            selectedRows: {
              text: "fila (s) seleccionadas",
              delete: "Eliminar",
              deleteAria: "Eliminar filas seleccionadas",
            },      
          }        
          } 
          const columns = ["ID","NOMBRE", "APELLIDOS", "DIRECCIÓN GENERAL", "CORREO ELECTRÓNICO","EXT."];  

              data1 = this.state.tablaEmpledos.map((rows)=>{ 
                    return([rows.numEmpleado,rows.nombre,rows.apellidos,rows.nombreArea,rows.correo,rows.ext])
  
                  })           

     tablaInicio = 
          <div>
            <Card  style={{marginTop:"1%",width:"95%", marginLeft:"2%"}}>  
            <MUIDataTable    
            title={"DIRECTORIO CEAV" }
            data={data1}
            columns={columns}
            options={options}
            />
            </Card> 
            </div> 

           

        return(
            <React.Fragment>   
              <nav class="navbar navbar-light bg-light" >
                <a class="navbar-brand">
                    <img src={imagenCEAV} width="100" height="40" class="d-inline-block align-top" alt="" />   
                </a>
              </nav>

      <Content>
        {tablaInicio}  
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
}export default Dashboard