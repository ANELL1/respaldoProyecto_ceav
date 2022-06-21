import React, {Component} from 'react'
import { Card,Form as form, Input, Button, Radio, Form } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select,Space,DatePicker } from 'antd';
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import swal from 'sweetalert';
import {MDBBtn, MDBRow,MDBCol} from 'mdbreact'

class signUpEmpleado extends Component{
    constructor(props){
        super(props)
        this.state={
            nombre:'',
            apellidos:'',
            correo:'',
            curp:'',
            rfc:'',
            numEmpleado:'',
            telefono:'',
            ext:'',
            // dependencia:'',
            fechaAlta:'',
            fechaBaja:'',
            fechaNotificacionAlta:'',
            fechaNotificacionBaja:'',
            pass:'',
            departamento:'',
            fk_oficionas:'',
            fk_area:'',
            fk_puesto:'',
            fk_personal:'',
            tablaArea:[],
            tablaOficina:[],
            // tablaPersonal:[],
            tablaPuesto:[],
            getTablaNivel:[],
            fk_nivel:''
        }
         this.capturarFechaA = this.capturarFechaA.bind(this)
         this.capturarFechaB = this.capturarFechaB.bind(this)
         this.handleChange1 = this.handleChange1.bind(this)
         this.handleChange2 = this.handleChange2.bind(this)
         this.handleChange3 = this.handleChange3.bind(this)
         this.handleChange4 = this.handleChange4.bind(this)
         this.handleChange5 = this.handleChange5.bind(this)
         this.fNotificacion = this.fNotificacion.bind(this)
         this.fNotificacionB = this.fNotificacionB.bind(this)

    }
    componentDidMount(){
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
          this.setState({tablaPuesto:response.data.data.getTablaPuesto}) 
        })
        .catch(err=>{
           console.log('error' ,err.response)
        })       
  
        // axios({
        //   url:API,
        //   method:'post',
        //   data:{
        //     query:`
        //       query{   
        //         getTablaPersonal(data:"${[]}"){
        //           id_personal
        //           tipoPersonal
        //           message
        //           } 
        //       }
        //       `  }           
        //    })
        //  .then(response => { 
        //     this.setState({tablaPersonal:response.data.data.getTablaPersonal}) 
        //   })
        //   .catch(err=>{
        //      console.log('error' ,err.response)
        //   })   
          axios({
            url:API,
            method:'post',
            data:{
              query:`
                query{   
                  getTablaOficinas(data:"${[]}"){
                    id_oficina
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
                    telefono1
                    telefono3
                    telefono1
                    telefono4
                    telefono5
                    referencia
                    message
                    } 
                }
                `  }           
             })
           .then(response => {           
              this.setState({tablaOficina:response.data.data.getTablaOficinas}) 
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
                      nomeclatura
                      numSerie
                      nombreArea
                      message
                      } 
                  }
                  `  }           
               })
             .then(response => { 
                this.setState({tablaArea:response.data.data.getTablaArea}) 
              })
              .catch(err=>{
                 console.log('error' ,err.response)
              }) 
    }

    onChangeInput =(e)=>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    } 
    handleChange1(value) { 
      this.setState({fk_oficionas:value}) 
  }
    handleChange2(value) { 
        this.setState({fk_area:value})
    }
    handleChange3(value) { 
        this.setState({fk_puesto:value}) 
        axios({
          url:API,
          method:'post',
          data:{
            query:`
              query{   
                getTablaNivel(data:"${[value]}"){
                  id
                  nivel
                  fk_puesto
                  message
                  } 
              }
              `  }           
           })
         .then(response => { 
            this.setState({getTablaNivel:response.data.data.getTablaNivel}) 
          })
          .catch(err=>{
             console.log('error' ,err.response)
          })
    }
    handleChange4(value){
      this.setState({fk_personal:value})
    }
    handleChange5(value){      
      this.setState({fk_nivel:value})
    }


    capturarFechaA(e){
      if(e){
        let fechaAltaEmp = e._d.toString();
        this.setState({fechaAlta:fechaAltaEmp})
      }
    }
    capturarFechaB(e){
      if(e){
        let fechaBajaEmp = e._d.toString();
        this.setState({fechaBaja:fechaBajaEmp})
      }
    }

    fNotificacion(e){
      if(e){
        let fechaN = e._d.toString();
        this.setState({fechaNotificacionAlta:fechaN})
      }
    }
    fNotificacionB(e){
      if(e){
        let fechaNB = e._d.toString();
        this.setState({fechaNotificacionBaja:fechaNB})
      }
    }


    onClear = () => {
        this.setState({
          nombre:'',
          apellidos:'',
          correo:'',
          curp:'',
          rfc:'',
          numEmpleado:'',
          telefono:'',
          ext:'',
          dependencia:'',
          fechaAlta:'',
          fechaBaja:'',
          fechaNotificacion:'',
          pass:'',
        });        
      } 

      onSubmitBtn = async (e)=>{ 
        let nombre = this.state.nombre.toUpperCase()
        let apellidos = this.state.apellidos.toUpperCase()
        let curp = this.state.curp.toUpperCase()
        let rfc = this.state.rfc.toUpperCase()
        let correo = this.state.correo
        let numEmpleado = this.state.numEmpleado
        let telefono = this.state.telefono
        let ext = this.state.ext 
        // let dependencia = this.state.dependencia  
        let fechaAlta = this.state.fechaAlta
        let fechaBaja = this.state.fechaBaja
        let fechaNotificacionAlta = this.state.fechaNotificacionAlta
        let fechaNotificacionBaja = this.state.fechaNotificacionBaja
        let pass = this.state.pass        
        let departamento = this.state.departamento.toUpperCase() 
        let fk_oficionas = this.state.fk_oficionas        
        let fk_area = this.state.fk_area
        let fk_puesto = this.state.fk_puesto
        let fk_personal = this.state.fk_personal
        let fk_nivel = this.state.fk_nivel
     if(fechaAlta  && nombre && apellidos && correo && numEmpleado && telefono  && pass && fk_oficionas && fk_area && fk_puesto && fk_nivel){  
      await   axios({
        url: API,
        method: "post",
        data: {
          query: `
            mutation{
              sigUpEmpleado(data:"${[nombre,apellidos,curp,rfc,correo,numEmpleado,telefono,ext,pass,departamento,fk_oficionas,fk_area,fk_puesto,fk_nivel,fk_personal]}"){  
                message
                } 
            }
            `
        }
      })
        .then((response) => {     
        }).catch((err) => {
          console.log("error", err.response);
        }); 
        axios({
          url: API,
          method: "post",
          data: {
            query: `
                    mutation{
                    signupDataFechanotificaciones(data:"${[fechaAlta,fechaBaja,fechaNotificacionAlta,fechaNotificacionBaja,numEmpleado]}"){  
                        message
                        } 
                    }
                    `
          }
        })
          .then(response => {  
          // if(response){
              swal({              
              title: "Registro exitoso!",               
              icon: "success",
              button:false,
              timer: 3000
            });  
          }).catch((err) => {
            console.log("error", err.response);
          });   
            window.location.reload() 
               
      }else{
          swal({
              text:"complete los campos requeridos",
              icon:"warning"
          })
      }
    };

    render(){
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
        const { Option } = Select;

        let titulo = <center><h5><strong>REGISTRAR NUEVO USUARIO</strong></h5></center>
       
        let formulario=         
        <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%"}}>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        >  
        <Form onSubmit={this.onSubmitBtn}>   
        <MDBRow>   
        <MDBCol><Form.Item label="FECHA DE ALTA" required> <DatePicker  style={{ width: 400 }} placeholder="10/01/2022" onChange={this.capturarFechaA} format={dateFormatList} /></Form.Item></MDBCol>
        <MDBCol><Form.Item label="FECHA DE BAJA"> <DatePicker style={{ width: 400 }} placeholder="20/04/2023" onChange={this.capturarFechaB} format={dateFormatList} /></Form.Item></MDBCol>
        <MDBCol><Form.Item label="FECHA DE NOTIFICACIÓN"> <DatePicker style={{ width: 400 }} placeholder="10/01/2022" onChange={this.fNotificacion} format={dateFormatList} /></Form.Item></MDBCol>    
        <MDBCol>        
        <Form.Item  label="NOMBRE(S)" required >
            <Input style={{ width:400 }} placeholder="NOMBRE(S)" id="nombre" type="text" name="nombre" onChange={this.onChangeInput} value={this.state.nombre} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="APELLIDOS" required>
            <Input style={{ width: 400 }} placeholder="APELLIDOS" id="apellidos" type="text" name="apellidos" onChange={this.onChangeInput} value={this.state.apellidos} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="CURP" >
            <Input style={{ width: 400 }} placeholder="16 digitos" id="curp" type="text" name="curp" onChange={this.onChangeInput} value={this.state.curp} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="RFC" >
          <Input style={{ width: 400 }} placeholder="16 digitos" id="rfc" type="text" name="rfc" onChange={this.onChangeInput} value={this.state.rfc} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="CORREO" required>
          <Input style={{ width: 400 }} placeholder="ejemplo@ceav.gob.mx" id="correo" type="email" name="correo" onChange={this.onChangeInput} value={this.state.correo} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="Núm. EMPLEADO" required>
          <Input style={{ width: 400 }} placeholder="" id="numEmpleado" type="number" name="numEmpleado" onChange={this.onChangeInput} value={this.state.numEmpleado} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="TELEFONO" >
          <Input style={{ width: 400 }} placeholder="(55) 1000 2000" id="telefono" type="number" name="telefono" onChange={this.onChangeInput} value={this.state.telefono} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="EXT." >
          <Input style={{ width: 400 }} placeholder="0000" id="ext" type="number" name="ext" onChange={this.onChangeInput} value={this.state.ext} />
        </Form.Item>
        </MDBCol>
       <MDBCol>
        <Form.Item label="DEPARTAMENTO" >
          <Input style={{ width: 400 }}  id="departamento" type="departamento" name="text" onChange={this.onChangeInput} value={this.state.departamento} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item  label="CONTRASEÑA" id="pass" type="password" name="pass" onChange={this.onChangeInput} value={this.state.pass} required >
        <Input.Password style={{ width: 400 }} placeholder="****" />
      </Form.Item>
      </MDBCol>
      <MDBCol>
        <Form.Item label="NOMBRE DE LA OfICINA" required>
                  <Select
                   onChange={this.handleChange1}
                   showSearch
                   style={{ width: 400 }}
                   placeholder="SELECCIONE SU OFICINA"
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                   }
                   filterSort={(optionA, optionB) =>
                   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                   }   
                  >
                      { this.state.tablaOficina.map(rows=>{
                          return (
                          <option value  = {rows.id_oficina} >{rows.nombreOficina}</option>
                          )
                        })}
                  </Select>
               </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="AREA DE ADSCRIPCIÓN" required>
                  <Select
                   onChange={this.handleChange2}
                   showSearch
                   style={{ width: 400 }}
                   placeholder="SELECCIONE EL AREA DE ADSCRIPCIÓN"
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                   }
                   filterSort={(optionA, optionB) =>
                   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                   }   
                  >
                      { this.state.tablaArea.map(rows=>{
                          return (
                          <option value  = {rows.id_area} >{rows.nombreArea}</option>
                          )
                        })}
                  </Select>
               </Form.Item>

       
        </MDBCol>
        <MDBCol> 
        <Form.Item label="DENOMINACIÓN DEL PUESTO" required>
                  <Select
                   onChange={this.handleChange3}
                   showSearch
                   style={{ width: 400 }}
                   placeholder="SELECCIONE LA DENOMINACIÓN DEL PUESTO"
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                   }
                   filterSort={(optionA, optionB) =>
                   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                   }   
                  >
                      { this.state.tablaPuesto.map(rows=>{
                          return (
                          <option value  = {rows.id_puesto} >{rows.puesto}</option>
                          )
                        })}
                  </Select>
               </Form.Item>
        </MDBCol>
        <MDBCol> 
        <Form.Item label="DENOMINACIÓN DEL NIVEL" required>
                  <Select
                   onChange={this.handleChange5}
                   showSearch
                   style={{ width: 400 }}
                   placeholder="SELECCIONE LA DENOMINACIÓN DEL NIVEL"
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                   }
                   filterSort={(optionA, optionB) =>
                   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                   }   
                  >
                      { this.state.getTablaNivel.map(rows=>{
                          return (
                          <option value  = {rows.id} >{rows.nivel}</option>
                          )
                        })}
                  </Select>
               </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="PERSONAL" required>
        <Select
            onChange={this.handleChange4}
            showSearch
            style={{ width: 400 }}
            placeholder="SELECCIONE LA DENOMINACIÓN DEL PERSONAL"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
        >             
        <Option value="1">EVENTUAL</Option>      
        <Option value="2">ESTRUCTURA</Option>         
        </Select>   
        </Form.Item> 
        </MDBCol>
        <MDBCol> 
        {/* <Form.Item style={{marginTop:"8%"}}> */}
        <div className="text-center">                   
            <Button  onClick={e=>this.onSubmitBtn()} style={{ background: "#73d13d" }}>GUARDAR</Button> &nbsp;&nbsp;&nbsp;
            <Button  onClick={e=>this.onClear()} style={{background:"#40a9ff"}} >CANCELAR</Button>
        </div> 
        {/* </Form.Item> */}
        </MDBCol>   
        </MDBRow>  
        </Form>
        </Form>       
        </Card>
        
        return(
            <React.Fragment>
                  {formulario}              
            </React.Fragment>
      
        )
    }

}export default signUpEmpleado

// import React, {Component} from 'react'
// import { Card,Form as form, Input, Button, Radio, Form } from 'antd'
// import { InfoCircleOutlined } from '@ant-design/icons';
// import { Select,Space,DatePicker } from 'antd';
// import axios from 'axios';
// import {API} from '../Graphql/Graphql'
// import swal from 'sweetalert';
// import {MDBBtn, MDBRow,MDBCol} from 'mdbreact'

// class signUpEmpleado extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             nombre:'',
//             apellidos:'',
//             correo:'',
//             curp:'',
//             rfc:'',
//             numEmpleado:'',
//             telefono:'',
//             ext:'',
//             dependencia:'',
//             fechaAlta:'',
//             fechaBaja:'',
//             fechaNotificacionAlta:'',
//             fechaNotificacionBaja:'',
//             pass:'',
//             fk_oficionas:'',
//             fk_area:'',
//             fk_puesto:'',
//             fk_personal:'',
//             tablaArea:[],
//             tablaOficina:[],
//             // tablaPersonal:[],
//             tablaPuesto:[],
//             getTablaNivel:[],
//             fk_nivel:''
//         }
//          this.capturarFechaA = this.capturarFechaA.bind(this)
//          this.capturarFechaB = this.capturarFechaB.bind(this)
//          this.handleChange1 = this.handleChange1.bind(this)
//          this.handleChange2 = this.handleChange2.bind(this)
//          this.handleChange3 = this.handleChange3.bind(this)
//          this.handleChange4 = this.handleChange4.bind(this)
//          this.handleChange5 = this.handleChange5.bind(this)
//          this.fNotificacion = this.fNotificacion.bind(this)
//          this.fNotificacionB = this.fNotificacionB.bind(this)

//     }
//     componentDidMount(){
//       axios({
//         url:API,
//         method:'post',
//         data:{
//           query:`
//             query{   
//               getTablaPuesto(data:"${[]}"){
//                 id_puesto
//                 puesto
//                 message
//                 } 
//             }
//             `  }           
//          })
//        .then(response => { 
//         //  console.log("esto es response de get",response)
//           this.setState({tablaPuesto:response.data.data.getTablaPuesto}) 
//         })
//         .catch(err=>{
//            console.log('error' ,err.response)
//         })       
  
//         // axios({
//         //   url:API,
//         //   method:'post',
//         //   data:{
//         //     query:`
//         //       query{   
//         //         getTablaPersonal(data:"${[]}"){
//         //           id_personal
//         //           tipoPersonal
//         //           message
//         //           } 
//         //       }
//         //       `  }           
//         //    })
//         //  .then(response => { 
//         //     this.setState({tablaPersonal:response.data.data.getTablaPersonal}) 
//         //   })
//         //   .catch(err=>{
//         //      console.log('error' ,err.response)
//         //   })   
//           axios({
//             url:API,
//             method:'post',
//             data:{
//               query:`
//                 query{   
//                   getTablaOficinas(data:"${[]}"){
//                     id_oficina
//                     nombreOficina
//                     calle
//                     numExterior
//                     numInterior
//                     colonia
//                     codigoPostal
//                     ciudad
//                     estado
//                     telefono1
//                     telefono2
//                     telefono1
//                     telefono3
//                     telefono1
//                     telefono4
//                     telefono5
//                     referencia
//                     message
//                     } 
//                 }
//                 `  }           
//              })
//            .then(response => { 
//           console.log("Data oficinas",response.data.data.getTablaOficinas)
//               this.setState({tablaOficina:response.data.data.getTablaOficinas}) 
//             })
//             .catch(err=>{
//                console.log('error' ,err.response)
//             })  
//             axios({
//               url:API,
//               method:'post',
//               data:{
//                 query:`
//                   query{   
//                     getTablaArea(data:"${[]}"){
//                       id_area
//                       nomeclatura
//                       numSerie
//                       nombreArea
//                       message
//                       } 
//                   }
//                   `  }           
//                })
//              .then(response => { 
//                 this.setState({tablaArea:response.data.data.getTablaArea}) 
//               })
//               .catch(err=>{
//                  console.log('error' ,err.response)
//               }) 
//     }

//     onChangeInput =(e)=>{
//         const {id,value} = e.target;
//         this.setState({
//             [id]:value
//         })
//     } 
//     handleChange1(value) { 
//       this.setState({fk_oficionas:value}) 
//   }
//     handleChange2(value) { 
//         this.setState({fk_area:value})
//     }
//     handleChange3(value) { 
//         this.setState({fk_puesto:value}) 
//         axios({
//           url:API,
//           method:'post',
//           data:{
//             query:`
//               query{   
//                 getTablaNivel(data:"${[value]}"){
//                   id
//                   nivel
//                   fk_puesto
//                   message
//                   } 
//               }
//               `  }           
//            })
//          .then(response => { 
//            console.log("esto es response de get",response)
//             this.setState({getTablaNivel:response.data.data.getTablaNivel}) 
//           })
//           .catch(err=>{
//              console.log('error' ,err.response)
//           })
//     }
//     handleChange4(value){
//       this.setState({fk_personal:value})
//     }
//     handleChange5(value){
//       console.log("handleChange5",value)
//       this.setState({fk_nivel:value})
//     }


//     capturarFechaA(e){
//       if(e){
//         let fechaAltaEmp = e._d.toString();
//         this.setState({fechaAlta:fechaAltaEmp})
//       }
//     }
//     capturarFechaB(e){
//       if(e){
//         let fechaBajaEmp = e._d.toString();
//         this.setState({fechaBaja:fechaBajaEmp})
//       }
//     }

//     fNotificacion(e){
//       if(e){
//         let fechaN = e._d.toString();
//         this.setState({fechaNotificacionAlta:fechaN})
//       }
//     }
//     fNotificacionB(e){
//       if(e){
//         let fechaNB = e._d.toString();
//         this.setState({fechaNotificacionBaja:fechaNB})
//       }
//     }


//     onClear = () => {
//         this.setState({
//           nombre:'',
//           apellidos:'',
//           correo:'',
//           curp:'',
//           rfc:'',
//           numEmpleado:'',
//           telefono:'',
//           ext:'',
//           dependencia:'',
//           fechaAlta:'',
//           fechaBaja:'',
//           fechaNotificacion:'',
//           pass:'',
//         });        
//       } 

//       onSubmitBtn = async (e)=>{ 
//         let nombre = this.state.nombre.toUpperCase()
//         let apellidos = this.state.apellidos.toUpperCase()
//         let curp = this.state.curp.toUpperCase()
//         let rfc = this.state.rfc.toUpperCase()
//         let correo = this.state.correo
//         let numEmpleado = this.state.numEmpleado
//         let telefono = this.state.telefono
//         let ext = this.state.ext
//         let dependencia = this.state.dependencia
//         let fechaAlta = this.state.fechaAlta
//         let fechaBaja = this.state.fechaBaja
//         let fechaNotificacionAlta = this.state.fechaNotificacionAlta
//         let fechaNotificacionBaja = this.state.fechaNotificacionBaja
//         let pass = this.state.pass         
//         let fk_oficionas = this.state.fk_oficionas        
//         let fk_area = this.state.fk_area
//         let fk_puesto = this.state.fk_puesto
//         let fk_personal = this.state.fk_personal
//         let fk_nivel = this.state.fk_nivel
//      if(fechaAlta  && nombre && apellidos && correo && numEmpleado && telefono  && dependencia  && pass && fk_oficionas && fk_area && fk_puesto && fk_nivel){  
//       await   axios({
//         url: API,
//         method: "post",
//         data: {
//           query: `
//             mutation{
//               sigUpEmpleado(data:"${[nombre,apellidos,curp,rfc,correo,numEmpleado,telefono,ext,dependencia,pass,fk_oficionas,fk_area,fk_puesto,fk_nivel,fk_personal]}"){  
//                 message
//                 } 
//             }
//             `
//         }
//       })
//         .then((response) => {     
//         }).catch((err) => {
//           console.log("error", err.response);
//         }); 
//         axios({
//           url: API,
//           method: "post",
//           data: {
//             query: `
//                     mutation{
//                     signupDataFechanotificaciones(data:"${[fechaAlta,fechaBaja,fechaNotificacionAlta,fechaNotificacionBaja,numEmpleado]}"){  
//                         message
//                         } 
//                     }
//                     `
//           }
//         })
//           .then(response => {  
//           // if(response){
//               swal({              
//               title: "Registro exitoso!",               
//               icon: "success",
//               button:false,
//               timer: 3000
//             });  
//           }).catch((err) => {
//             console.log("error", err.response);
//           });   
//             window.location.reload() 
               
//       }else{
//           swal({
//               text:"complete los campos requeridos",
//               icon:"warning"
//           })
//       }
//     };

//     render(){
//       const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
//         const { Option } = Select;

//         let titulo = <center><h5><strong>Registro de Empleado</strong></h5></center>
       
//         let formulario=         
//         <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%"}}>
//         <Form
//         labelCol={{ span: 4 }}
//         wrapperCol={{ span: 14 }}
//         layout="horizontal"
//         >  
//         <Form onSubmit={this.onSubmitBtn}>   
//         <MDBRow>   
//         <MDBCol><Form.Item label="FECHA DE ALTA" required> <DatePicker  style={{ width: 400 }} placeholder="10/01/2022" onChange={this.capturarFechaA} format={dateFormatList} /></Form.Item></MDBCol>
//         <MDBCol><Form.Item label="FECHA DE BAJA"> <DatePicker style={{ width: 400 }} placeholder="20/04/2023" onChange={this.capturarFechaB} format={dateFormatList} /></Form.Item></MDBCol>
//         <MDBCol><Form.Item label="FECHA DE NOTIFICACIÓN"> <DatePicker style={{ width: 400 }} placeholder="10/01/2022" onChange={this.fNotificacion} format={dateFormatList} /></Form.Item></MDBCol>    
//         <MDBCol>        
//         <Form.Item  label="NOMBRE(S)" required >
//             <Input style={{ width:400 }} placeholder="NOMBRE(S)" id="nombre" type="text" name="nombre" onChange={this.onChangeInput} value={this.state.nombre} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="APELLIDOS" required>
//             <Input style={{ width: 400 }} placeholder="APELLIDOS" id="apellidos" type="text" name="apellidos" onChange={this.onChangeInput} value={this.state.apellidos} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="CURP" >
//             <Input style={{ width: 400 }} placeholder="16 digitos" id="curp" type="text" name="curp" onChange={this.onChangeInput} value={this.state.curp} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="RFC" >
//           <Input style={{ width: 400 }} placeholder="16 digitos" id="rfc" type="text" name="rfc" onChange={this.onChangeInput} value={this.state.rfc} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="CORREO" required>
//           <Input style={{ width: 400 }} placeholder="ejemplo@ceav.gob.mx" id="correo" type="email" name="correo" onChange={this.onChangeInput} value={this.state.correo} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="Núm. EMPLEADO" required>
//           <Input style={{ width: 400 }} placeholder="" id="numEmpleado" type="number" name="numEmpleado" onChange={this.onChangeInput} value={this.state.numEmpleado} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="TELEFONO" >
//           <Input style={{ width: 400 }} placeholder="(55) 1000 2000" id="telefono" type="number" name="telefono" onChange={this.onChangeInput} value={this.state.telefono} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="EXT." >
//           <Input style={{ width: 400 }} placeholder="0000" id="ext" type="number" name="ext" onChange={this.onChangeInput} value={this.state.ext} />
//         </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="DEPENDENCIA" required>
//           <Input style={{ width: 400 }} placeholder="CEAV" id="dependencia" type="text" name="dependencia" onChange={this.onChangeInput} value={this.state.dependencia} />
//         </Form.Item>
//         </MDBCol>       
//         <MDBCol>
//         <Form.Item  label="CONTRASEÑA" id="pass" type="password" name="pass" onChange={this.onChangeInput} value={this.state.pass} required >
//         <Input.Password style={{ width: 400 }} placeholder="****" />
//       </Form.Item>
//       </MDBCol>
//       <MDBCol>
//         <Form.Item label="NOMBRE DE LA OfICINA" required>
//                   <Select
//                    onChange={this.handleChange1}
//                    showSearch
//                    style={{ width: 400 }}
//                    placeholder="SELECCIONE SU OFICINA"
//                    optionFilterProp="children"
//                    filterOption={(input, option) =>
//                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                    }
//                    filterSort={(optionA, optionB) =>
//                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                    }   
//                   >
//                       { this.state.tablaOficina.map(rows=>{
//                           return (
//                           <option value  = {rows.id_oficina} >{rows.nombreOficina}</option>
//                           )
//                         })}
//                   </Select>
//                </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="AREA DE ADSCRIPCIÓN" required>
//                   <Select
//                    onChange={this.handleChange2}
//                    showSearch
//                    style={{ width: 400 }}
//                    placeholder="SELECCIONE EL AREA DE ADSCRIPCIÓN"
//                    optionFilterProp="children"
//                    filterOption={(input, option) =>
//                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                    }
//                    filterSort={(optionA, optionB) =>
//                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                    }   
//                   >
//                       { this.state.tablaArea.map(rows=>{
//                           return (
//                           <option value  = {rows.id_area} >{rows.nombreArea}</option>
//                           )
//                         })}
//                   </Select>
//                </Form.Item>

       
//         </MDBCol>
//         <MDBCol> 
//         <Form.Item label="DENOMINACIÓN DEL PUESTO" required>
//                   <Select
//                    onChange={this.handleChange3}
//                    showSearch
//                    style={{ width: 400 }}
//                    placeholder="SELECCIONE LA DENOMINACIÓN DEL PUESTO"
//                    optionFilterProp="children"
//                    filterOption={(input, option) =>
//                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                    }
//                    filterSort={(optionA, optionB) =>
//                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                    }   
//                   >
//                       { this.state.tablaPuesto.map(rows=>{
//                           return (
//                           <option value  = {rows.id_puesto} >{rows.puesto}</option>
//                           )
//                         })}
//                   </Select>
//                </Form.Item>
//         </MDBCol>
//         <MDBCol> 
//         <Form.Item label="DENOMINACIÓN DEL NIVEL" required>
//                   <Select
//                    onChange={this.handleChange5}
//                    showSearch
//                    style={{ width: 400 }}
//                    placeholder="SELECCIONE LA DENOMINACIÓN DEL NIVEL"
//                    optionFilterProp="children"
//                    filterOption={(input, option) =>
//                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                    }
//                    filterSort={(optionA, optionB) =>
//                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                    }   
//                   >
//                       { this.state.getTablaNivel.map(rows=>{
//                           return (
//                           <option value  = {rows.id} >{rows.nivel}</option>
//                           )
//                         })}
//                   </Select>
//                </Form.Item>
//         </MDBCol>
//         <MDBCol>
//         <Form.Item label="PERSONAL" required>
//         <Select
//             onChange={this.handleChange4}
//             showSearch
//             style={{ width: 400 }}
//             placeholder="SELECCIONE LA DENOMINACIÓN DEL PERSONAL"
//             optionFilterProp="children"
//             filterOption={(input, option) =>
//             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//             }
//             filterSort={(optionA, optionB) =>
//             optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//             }
//         >             
//         <Option value="1">EVENTUAL</Option>      
//         <Option value="2">ESTRUCTURA</Option>         
//         </Select>   
//         </Form.Item> 
//         </MDBCol>
//         <MDBCol> 
//         <Form.Item style={{marginTop:"8%"}}>
//         <div className="text-center">                   
//             <Button  onClick={e=>this.onSubmitBtn()} style={{ background: "#73d13d" }}>GUARDAR</Button> &nbsp;&nbsp;&nbsp;
//             <Button  onClick={e=>this.onClear()} style={{background:"#40a9ff"}} >CANCELAR</Button>
//         </div> 
//         </Form.Item>
//         </MDBCol>   
//         </MDBRow>  
//         </Form>
//         </Form>       
//         </Card>
        
//         return(
//             <React.Fragment>
//                   {formulario}              
//             </React.Fragment>
      
//         )
//     }

// }export default signUpEmpleado