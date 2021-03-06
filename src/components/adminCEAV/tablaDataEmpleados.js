import  React, {Component} from "react"
import {  Button,  Card, Form as form,Avatar} from 'antd';
import {MDBIcon,MDBContainer,MDBModal,MDBModalHeader,MDBRow,MDBBtn,MDBCol,MDBModalBody,MDBModalFooter,
         MDBCard,MDBCardBody,MDBCardImage,MDBCardTitle,MDBCardText} from 'mdbreact'
import axios from 'axios'
import {API} from '../Graphql/Graphql';
import MUIDataTable from "mui-datatables";
import swal from 'sweetalert'
import {Row,Col,Form,input} from 'reactstrap';
import { UserOutlined} from '@ant-design/icons';

class tablaDataEmpleado extends Component{
  constructor(props){
    super(props)
    this.state={
      tablaEmpledos:[],
      modal:false,
      tablaInicio:true,
      dataID:[],
      arrayEmpleados:[],
      modal:false,
      modal2:false,
      informacionEmpleado:[],
      id_empleadoUpdate:'',
      nombreUpdate:'',
      apellidosUpdate:'',
      curpUpdate:'',
      rfcUpdate:'',
      correoUpdate:'',
      numEmpleadoUpdate:'',
      telefonoUpdate:'',
      extUpdate:'',
      idUpdate:'',
      nivelUpdate:'',
      departamentoUpdate:'',
      statusEmpleadoUpdate:'',
      id_oficinaUpdate:'',
      nombreOficinaUpdate:'',
      id_areaUpdate:'', 
      nombreAreaUpdate:'',
      id_puestoUpdate:'',
      puestoUpdate:'',
      id_personalUpdate:'',
      tipoPersonalUpdate:'',
      id_nivelUpdate:'',
      nombreNivelUpdate:'',
      fk_puesto:'',
      arrayOficina:[],
      arrayArea:[],
      arrayPersonal:[],
      arrayPuesto:[],
      getTablaNivel:[],
      fk_nivelUpdate:''
      
    }
    this.toggle = this.toggle.bind(this) 
    this.toggle2 = this.toggle2.bind(this) 
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2
    });
  } 
  componentDidMount()  {
      axios({
            url:API,
            method:'post',
            data:{
              query:`
                query{   
                  getTablaDataEmpleado(data:"${[""]}"){
                    id_empleado
                    nombre
                    apellidos
                    curp
                    rfc
                    correo
                    numEmpleado
                    telefono
                    ext
                    dependencia
                    statusEmpleado
                    departamento
                    nombreOficina
                    calle
                    numExterior
                    numInterior
                    colonia
                    codigoPostal
                    ciudad
                    estado
                    telefono1
                    telefono2
                    telefono3
                    telefono4
                    telefono5
                    referencia
                    id_roles
                    usuarios
                    id_area
                    nomeclatura
                    numSerie
                    nombreArea
                    id_puesto
                    puesto
                    id
                    nivel
                    fk_puesto
                    id_personal
                    tipoPersonal
                    id_fecha
                    fechaAlta
                    fechaBaja
                    fechaNotificacionAlta
                    fechaNotificacionBaja
                    fk_oficinas
                    fk_rol
                    fk_area
                    fk_puesto
                    fk_nivel
                    fk_personal
                    id_oficina
                    message 
                    } 
                }
                `  }           
             })
           .then(response => { 
              this.setState({tablaEmpledos:response.data.data.getTablaDataEmpleado})
            })
            .catch(err=>{
               console.log('error' ,err.response)
            }) 
            axios({
              url:API,
              method:'post',
              data:{
                query:`
                  query{   
                    getTablaArea(data:"${[]}"){
                      id_area
                      nombreArea
                      message
                      } 
                  }
                  `  }           
                })
              .then(response => { 
              this.setState({arrayArea:response.data.data.getTablaArea}) 
              })
              .catch(err=>{
                  console.log('error' ,err.response)
              }) 
            axios({
              url:API,
              method:'post',
              data:{
                query:`
                  query{   
                    getTablaPersonal(data:"${[]}"){
                      id_personal
                      tipoPersonal
                      message
                      } 
                  }
                  `  }           
                })
              .then(response => { 
              this.setState({arrayPersonal:response.data.data.getTablaPersonal}) 
              })
              .catch(err=>{
                  console.log('error' ,err.response)
              }) 
            axios({
              url:API,
              method:'post',
              data:{
                query:`
                  query{   
                    getTablaPuesto(data:"${[]}"){
                      id_puesto
                      puesto
                      message
                      } 
                  }
                  `  }           
              })
            .then(response => { 
              this.setState({arrayPuesto:response.data.data.getTablaPuesto}) 
              })
              .catch(err=>{
                console.log('error',err.response)
              }) 
              axios({
                url:API,
                method:'post',
                data:{
                  query:`
                    query{   
                      getTablaOficinas(data:"${[]}"){
                        id_oficina
                        nombreOficina
                        message
                        } 
                    }
                    `  }           
                 })
               .then(response => { 
                this.setState({arrayOficina:response.data.data.getTablaOficinas}) 
                })
                .catch(err=>{
                   console.log('error' ,err.response)
                }) 
              
             axios({
                  url:API,
                  method:'post',
                  data:{
                    query:`
                      query{   
                        getTablalistaNivel(data:"${[]}"){
                          id
                          nivel                                               
                          message
                          } 
                      }
                      `  }           
                   })
                 .then(response => { 
                    this.setState({getTablaNivel:response.data.data.getTablalistaNivel}) 
                  })
                  .catch(err=>{
                     console.log('error' ,err.response)
                  }) 
    }

    onChangeInput2 =(e)=>{
      const {id,value} = e.target;
      this.setState({
          [id]:value
      })
    } 

    editar(id){
      this.setState({arrayEmpleados:id})
      this.setState({
        id_empleadoUpdate:id.id_empleado,
        nombreUpdate:id.nombre,
        apellidosUpdate:id.apellidos,
        curpUpdate:id.curp,
        rfcUpdate:id.rfc,
        correoUpdate:id.correo,
        numEmpleadoUpdate:id.numEmpleado,
        telefonoUpdate:id.telefono,
        extUpdate:id.ext,
        statusEmpleadoUpdate:id.statusEmpleado,
        id_oficinaUpdate:id.id_oficina,
        nombreOficinaUpdate:id.nombreOficina,       
        id_areaUpdate:id.id_area,
        nombreAreaUpdate:id.nombreArea,
        id_puestoUpdate:id.id_puesto,
        puestoUpdate:id.puesto,
        id_personalUpdate:id.id_personal,
        tipoPersonalUpdate:id.tipoPersonal,
        fk_puesto:id.fk_puesto,
        fk_nivelUpdate:id.fk_nivel,
        id_nivelUpdate:id.id,
        departamentoUpdate:id.departamento
        // fk_nivelUpdate:id.nivel
      })   
      this.setState({
        modal:!this.state.modal
      })
      
    }

    informacion(id){
      this.setState({informacionEmpleado:id})    
      this.setState({
        modal2:!this.state.modal2
      })
    }


    onSubmitBtn2 = (e)=>{  
      e.preventDefault(); 
      let id_empleado = this.state.id_empleadoUpdate
      let nombre = this.state.nombreUpdate.toUpperCase()
      let apellidos = this.state.apellidosUpdate.toUpperCase()
      let curp = this.state.curpUpdate.toUpperCase()
      let rfc = this.state.rfcUpdate.toUpperCase()
      let correo = this.state.correoUpdate
      let numEmpleado = this.state.numEmpleadoUpdate
      let telefono = this.state.telefonoUpdate
      let ext = this.state.extUpdate 
      let statusEmpleado = this.state.statusEmpleadoUpdate
      let departamento = this.state.departamentoUpdate.toUpperCase()
      let fk_oficinas = this.state.id_oficinaUpdate
      let fk_area = this.state.id_areaUpdate
      let fk_puesto = this.state.id_puestoUpdate
      let fk_personal = this.state.id_personalUpdate
      let fk_nivel = this.state.fk_nivelUpdate
      // id_empleado,nombre,apellidos,curp,rfc,correo,numEmpleado,telefono,ext,statusEmpleado,departamento,
      // fk_oficinas,fk_area,fk_puesto,fk_nivel,fk_personal
 console.log("id_empleado",id_empleado,"nombre",nombre,"apellidos",apellidos,"curp",curp)
 console.log("rfc",rfc,"correo",correo,"numEmpleado",numEmpleado,"telefono",telefono)
 console.log("ext",ext,"statusEmpleado",statusEmpleado,"departamento",departamento,"fk_oficinas",fk_oficinas)
 console.log("fk_area",fk_area,"fk_puesto",fk_puesto,"fk_personal",fk_personal,"fk_nivel",fk_nivel)
      if( nombre && apellidos  &&  correo && numEmpleado && telefono  && statusEmpleado ){  
          axios({
         url: API,
         method: "post",
         data: {
           query: `
                   mutation{
                    updateEmpleados(data:"${[id_empleado,nombre,apellidos,curp,rfc,correo,numEmpleado,telefono,ext,statusEmpleado,departamento,fk_oficinas,fk_area,fk_puesto,fk_nivel,fk_personal]}"){  
                       message
                        } 
                   }
                   `
         }
       })
         .then((response) => {
          if(response.data.data.updateEmpleados.message === "actualizacion exitosa"){
             swal({              
             title:"Registro exitoso!",   
             text:"los datos se actualizaron correctamente",          
             icon:"success",
             button:true
           }); 
          //  setTimeout(function(){
          //    window.location.href='/sideNavAdmin'
          //     }, 1500); 
         }else{
          swal({
             title:"Notificaci??n del sistema",
             text: "Algo salio mal, intentalo nuevamente",
             icon: "error",
             button:false
           }); 
         }          
         }).catch((err) => {
           console.log("error", err.response);
         });
       } else{
        swal({
          title:"",
          text:"Por favor complete los campos requeridos *",
          icon:"warning",
          buttons:false,
          timer:1000
        })
      }      
     };
    
    render(){   

       let botonEditar;   
       let botonInformacion; 
       let modal;
       let modal2;
       let infEmpleado = this.state.informacionEmpleado;
      const options={ 
        filterType:"drowpdawn",
        responsive: "stacked",
        print:false,
        download:false,
        viewColumns:false,
        elevation:0,
        selectableRows:"none",
        rowsPerPage:5,
        textLabels:{
        body: {
          noMatch: "Lo sentimos, no se encontraron registros coincidentes",
          toolTip: " Ordenar",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
        pagination: {
          next: "P??gina siguiente",
          previous: "P??gina anterior",
          rowsPerPage: "Filas por p??gina:",
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

      modal=
      <div>
        <MDBContainer>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
        <MDBModalHeader toggle={this.toggle} >EDITAR INFORMACI??N</MDBModalHeader>
        <MDBModalBody>
        <MDBContainer>
        <form onSubmit={this.onSubmitBtn2}>
            <MDBRow>
              <MDBCol style={{marginTop:"5%", marginBotton:"5%"}}>
          <Row>
            <Col xs="6">
          <label htmlFor="defaultFormLoginPasswordEx"> <strong>N??MERO DE EMPLEADO: *</strong></label>
                    <input                                              
                          id="numEmpleadoUpdate"
                          type="text"
                          name="numEmpleadoUpdate"
                          onChange={this.onChangeInput2}
                          value={this.state.numEmpleadoUpdate}
                          className="form-control"         
                          />
            
            </Col>
           <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx">STATUS EMPLEADO: *</label>
            <select
             className="browser-default custom-select "
             type="select"
             name="statusEmpleadoUpdate"
             id="statusEmpleadoUpdate"
             onChange={this.onChangeInput2}
             value={this.state.statusEmpleadoUpdate}             
              >
             <option value="true">Alta</option>
             <option value="false" >Baja</option>
            </select>   
            </Col> 
          </Row>
          <br></br>
          <Row>
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>NOMBRE: *</strong></label>
                       <input                                              
                            id="nombreUpdate"
                            type="text"
                            name="nombreUpdate"
                            onChange={this.onChangeInput2}
                            value={this.state.nombreUpdate}
                            className="form-control"            
                            />
              
              </Col>
              <Col xs="6">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>APELLIDOS: *</strong></label>
                        <input                                          
                              id="apellidosUpdate"
                              type="text"
                              name="apellidosUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.apellidosUpdate}
                              className="form-control"             
                              />
            </Col> 
          </Row>
          <br></br>
          <Row>
          <Col xs="6">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>CURP: </strong></label>
                        <input                                          
                              id="curpUpdate"
                              type="text"
                              name="curpUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.curpUpdate }
                              className="form-control"             
                              />
            </Col>  
            <Col xs="6">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>RFC: </strong></label>
                        <input                                          
                              id="rfcUpdate"
                              type="text"
                              name="rfcUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.rfcUpdate }
                              className="form-control"             
                              />
            </Col>        
          </Row> 
          <br></br>
          <Row>
          <Col xs="6">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>CORREO: *</strong></label>
                        <input                                          
                              id="correoUpdate"
                              type="text"
                              name="correoUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.correoUpdate }
                              className="form-control"           
                              />
            </Col>  
            <Col xs="6">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>TELEFONO: *</strong></label>
                        <input                                          
                              id="telefonoUpdate"
                              type="text"
                              name="telefonoUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.telefonoUpdate }
                              className="form-control"            
                              />
            </Col>      
          </Row>  
          <br></br>
          <Row>
          <Col xs="6">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>Ext: </strong></label>
                        <input                                          
                              id="extUpdate"
                              type="text"
                              name="extUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.extUpdate }
                              className="form-control"             
                              />
            </Col>
            <Col xs="6">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>DEPARTAMENTO: *</strong></label>
                        <input                                          
                              id="departamentoUpdate"
                              type="text"
                              name="departamentoUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.departamentoUpdate }
                              className="form-control"             
                              />
            </Col>
          </Row> 
          <br></br> 
          <Row>
          <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx">OFICINA: *</label>
            <select
             className="browser-default custom-select "
             type="select"
             name="id_oficinaUpdate"
             id="id_oficinaUpdate"
             onChange={this.onChangeInput2}
             value={this.state.id_oficinaUpdate}
             required
                  >
              { this.state.arrayOficina.map(rows=>{
                return (
                <option value={rows.id_oficina}>{rows.nombreOficina }</option>
                )
              })} 
            </select>   
            </Col> 
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx">??REA: *</label>
            <select
             className="browser-default custom-select "
             type="select"
             name="id_areaUpdate"
             id="id_areaUpdate"
             onChange={this.onChangeInput2}
             value={this.state.id_areaUpdate}
             required
              >
              { this.state.arrayArea.map(rows=>{
                return (
                <option value={rows.id_area}>{rows.nombreArea }</option>
                )
              })} 
            </select>   
            </Col> 
          </Row> 
          <br></br>
          <Row>
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx">PUESTO: *</label>
            <select
             className="browser-default custom-select "
             type="select"
             name="id_puestoUpdate"
             id="id_puestoUpdate"
            //  onClick={(e)=>this.nivel()}
             onChange={this.onChangeInput2}
             value={this.state.id_puestoUpdate}
             required
              >
              { this.state.arrayPuesto.map(rows=>{
                return (
                <option value={rows.id_puesto}>{rows.puesto}</option>
                )
              })} 
            </select>   
            </Col> 
            <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx">NIVEL: *</label>
            <select
             className="browser-default custom-select "
             type="select"
             name="fk_nivelUpdate"
             id="fk_nivelUpdate"
             onChange={this.onChangeInput2}
             value={this.state.fk_nivelUpdate}
             

            //  required
              >
              { this.state.getTablaNivel.map(rows=>{            
                return (
                <option value={rows.id}>{rows.nivel}</option>
                )
              })} 
            </select>   
            </Col> 
          </Row> 
          <Row>
          <Col xs="6">
            <label htmlFor="defaultFormLoginPasswordEx">TIPO PERSONAL: *</label>
            <select
             className="browser-default custom-select "
             type="select"
             name="id_personalUpdate"
             id="id_personalUpdate"
             onChange={this.onChangeInput2}
             value={this.state.id_personalUpdate}
             required
              >
              {this.state.arrayPersonal.map(rows=>{
                return (
                <option value={rows.id_personal}>{rows.tipoPersonal }</option>
                )
              })} 
            </select>   
            </Col>
          </Row>       
         
          <div style={{marginTop:"3%"}} className="text-center">
              <MDBBtn outline color="secondary" size='sm' type="submit">                   
                GUARDAR
              </MDBBtn>
              <MDBBtn
                outline color="danger"
                size='sm'
                onClick={e=>this.toggle()} >
              CANCELAR
              </MDBBtn>                   
          </div>  
        </MDBCol>
      </MDBRow>
      </form>
    </MDBContainer>             
        </MDBModalBody>
        <MDBModalFooter>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
      </div>

          const columns = ["ID","NO. EMPLEADO","NOMBRE","DIRECCI??N GENERAL","DEPARTAMENTO","CORREO","EXT.","EDITA","INF."];  
         let data1 = this.state.tablaEmpledos.map((rows)=>{
    
              botonEditar =
               <div>            
                <Button  style={{backgroundColor:"#95de64"}} shape="circle" size="large" onClick={(e)=>this.editar(rows)}>
                <MDBIcon  far icon="edit" />
                </Button>
              </div>

              botonInformacion =
               <div>            
              <Button type="primary" shape="circle" size="large"
                onClick={(e)=>this.informacion(rows)}
                >
              <MDBIcon  icon="info"/>
              </Button>
              </div> 
             return([rows.id_empleado,rows.numEmpleado,rows.nombre +" "+ rows.apellidos,rows.nombreArea,rows.departamento,rows.correo,rows.ext,botonEditar,botonInformacion])
      
         })
         let tablaInicio = 
         <div>
           <Card  style={{marginTop:"1%",width:"100%" }}>  
           <MUIDataTable    
           title={"DIRECTORIO CEAV" }
           data={data1}
           columns={columns}
           options={options}
           />
           </Card> 
           </div>


       let statusEmpleado 
       if(infEmpleado.statusEmpleado === "true"){
        statusEmpleado = <strong><font color = "#118BDF">ACTIVO</font></strong>
       }
       if(infEmpleado.statusEmpleado === "false"){
        statusEmpleado = <strong><font color = "#ED2110">BAJA</font></strong>
       } 


          modal2=
          <div>
            <MDBContainer>
          <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} size="fluid">
            <MDBModalHeader toggle={this.toggle2}><center>INFORMACI??N DEL USARIO</center></MDBModalHeader>
            <MDBModalBody>
            <MDBContainer>
              <MDBRow >
                <MDBCol md="8"><h6>NO.Empleado:&nbsp;<strong><font color = "#000">{infEmpleado.numEmpleado}</font></strong></h6></MDBCol>
                <MDBCol md="4"><h6>Status:&nbsp;<strong color="red">{statusEmpleado}</strong></h6 ></MDBCol>
              </MDBRow>         
            </MDBContainer>
              <MDBContainer style={{marginTop:"2%", marginBottom:"5%"}} >
                <MDBRow>
                <MDBCol md="4">
                <MDBCol style={{width:"100%"}} >
                <MDBCard>          
                  <MDBCardBody>
                    <center>
                    <Avatar   className='useLogo' size={64}  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />           
                      <br></br>               
                    <MDBCardTitle>{infEmpleado.nombre}&nbsp;{infEmpleado.apellidos}</MDBCardTitle>
                    <MDBCardText><MDBIcon far icon="envelope" />&nbsp;{infEmpleado.correo}</MDBCardText>
                    <MDBCardText><MDBIcon icon="phone" />&nbsp;{infEmpleado.telefono}&nbsp; Ext:{infEmpleado.ext}</MDBCardText>
                    <MDBCardText>CURP:&nbsp;{infEmpleado.curp}</MDBCardText>
                    <MDBCardText>RFC:&nbsp;{infEmpleado.rfc}</MDBCardText>   
                    </center>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol> 
                </MDBCol>
                  <MDBCol md="8">
                    <MDBCard>          
                    <MDBCardBody>
                      <center>
                      <MDBCardTitle>CENTRO DE TRABAJO</MDBCardTitle>
                      <MDBIcon  far icon="building"  size="4x" style={{marginTop:"1%",marginBottom:"3%"}}/>
                      <MDBRow>
                        <MDBCol size="4"><strong>Oficina</strong><MDBCardText>{infEmpleado.nombreOficina}</MDBCardText></MDBCol>
                        <MDBCol size="4"><strong>Direcci??n</strong><MDBCardText>{infEmpleado.calle}</MDBCardText></MDBCol>
                        <MDBCol size="4"><strong>No.Exterior</strong><MDBCardText>{infEmpleado.numExterior} </MDBCardText></MDBCol>
                      </MDBRow>
                       <br></br>
                      <MDBRow>
                        <MDBCol sm="4"><strong>C.P.</strong><MDBCardText>{infEmpleado.codigoPostal}</MDBCardText></MDBCol>
                        <MDBCol sm="4"><strong>Colonia</strong><MDBCardText>{infEmpleado.colonia}</MDBCardText></MDBCol>
                        <MDBCol sm="4"><strong>Municipio/Alcaldia</strong><MDBCardText>{infEmpleado.ciudad}</MDBCardText></MDBCol>
                      </MDBRow>
                       <br></br>
                      <MDBRow>
                        <MDBCol md="4"><strong>Estado</strong><MDBCardText>{infEmpleado.estado}</MDBCardText></MDBCol>
                      </MDBRow>
                      </center>
                    </MDBCardBody>
                  </MDBCard>                 
                  </MDBCol>                                 
                </MDBRow>
                <br></br>
                <MDBRow  align="center">
                <MDBCol size="6" sm="4"></MDBCol>
                <MDBCol size="6" sm="8">
                  <MDBCard >
                    <MDBCardImage className="img-fluid"  waves />
                    <MDBCardBody>
                      <MDBCardTitle>??REA Y PUESTO</MDBCardTitle>
                      <MDBIcon  icon="chalkboard-teacher"  size="4x" style={{marginTop:"1%",marginBottom:"3%"}}/>
                      <MDBRow>
                        <MDBCol size="12"><strong>Direcci??n G??neral</strong><MDBCardText>{infEmpleado.nombreArea}</MDBCardText></MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol size="12"><strong>Direcci??n</strong><MDBCardText>{infEmpleado.departamento}</MDBCardText></MDBCol>
                      </MDBRow>
                      <br></br>
                      <MDBRow>
                        <MDBCol size="4"><strong>Puesto</strong><MDBCardText>{infEmpleado.puesto}</MDBCardText></MDBCol>
                        <MDBCol size="4"><strong>Nivel</strong><MDBCardText>{infEmpleado.nivel} </MDBCardText></MDBCol>
                        <MDBCol size="4"><strong>Personal</strong><MDBCardText>{infEmpleado.tipoPersonal} </MDBCardText></MDBCol>                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>                  
                  </MDBCol>
                </MDBRow>  
              </MDBContainer>                    
            </MDBModalBody>
            <MDBModalFooter>
            </MDBModalFooter>
          </MDBModal>
          </MDBContainer>
          </div>

        return(            
      <React.Fragment>
            {tablaInicio}           
            {modal}
            {modal2}
      </React.Fragment>
        )
    }
}export default tablaDataEmpleado;