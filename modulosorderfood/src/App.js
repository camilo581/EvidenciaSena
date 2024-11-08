import { Component } from "react";
import { UsuarioService } from "./services/UsuariosService";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import React from "react";
import { Menubar } from 'primereact/menubar';
import { Dialog } from "primereact/dialog";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';



import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default class App extends Component{
  constructor(){
    super();
    this.state={
        visible:false,
        usuario:{
          iduser:null,
          nombre:null,
          apellido:null,
          correo:null
    },

    SelectedUsuario:{

    }
  };
    this.items=[
      {
        label:"Nuevo",
        icon:"pi pi-w pi-user-plus",
        command:()=>{this.showSaveDialog()}

      },

      {
        label:"Editar",
        icon:"pi pi-w pi-user-edit",
        command:()=>{this.showEditDialog()}

      },

      {
        label:"Eliminar",
        icon:"pi pi-w pi-user-minus",
        command:()=>{this.delete()}

      }
    ]
    this.usuarioService = new UsuarioService();
    this.save =this.save.bind(this);
    this.footer =(
<div>
<Button label="Guardar" icon="pi pi-check" onClick={this.save} />

</div>

)

this.Toast = React.createRef();
  }

  componentDidMount(){
    this.usuarioService.getAll().then(data => this.setState({usuarios:data}))
    
    

    }

    save(){
      this.usuarioService.save(this.state.usuario).then(data => {
        this.setState({
          visible:false,
          usuario:{
            iduser:null,
            nombre:null,
            apellido:null,
            correo:null
          }
        });
        this.Toast.current.show({severity:"success " , summary:"Atencion!", detail:"se ha guardado correctamente",});
        this.usuarioService.getAll().then(data => this.setState({usuarios:data}))
      })
      
    }


    delete(){
      if(window.confirm("¿Deseas eliminar el registro")){
        this.usuarioService.delete(this.state.SelectedUsuario.iduser).then(data =>{
       this.Toast.current.show({severity:"success " , summary:"Atencion!", detail:"se ha eliminado correctamente",});
       this.usuarioService.getAll().then(data => this.setState({usuarios:data}))
        
      })
      }
    }
  

render(){
  return(
<div style={{width:"80%" , margin:"20px auto 0px"}}>
    <Menubar model={this.items}/>
    <br/>
    <Panel header ="CRUD Usuarios"> 
    <DataTable value={this.state.usuarios} selectionMode="single" selection={this.state.SelectedUsuario} onSelectionChange={(e) => this.setState({SelectedUsuario: e.value})}>
<Column field="iduser" header="ID"></Column>
<Column field="nombre" header="Nombres"></Column>
<Column field="apellido" header="Apellidos"></Column>
<Column field="correo" header="Correo electronico"></Column>


    </DataTable>
    </Panel>
    <Dialog header="usuarios" visible={this.state.visible} style={{ width: '400px' }}footer={this.footer}  modal={true} onHide={() => 
    this.setState({visible:false})}>
    

    <FloatLabel>
    <InputText  style={{width:"100%"}} value={this.state.usuario.iduser} id="iduser" onChange={(e) =>{
     let val = e.target.value;

     this.setState(prevState => {
    let usuario=Object.assign({},prevState.usuario);
    usuario.iduser=val;
    return{usuario};
})}
    }/>
    <label for="iduser">ID</label>
   </FloatLabel> 
   <br/>

   <FloatLabel>
    <InputText  style={{width:"100%"}} value={this.state.usuario.nombre} id="nombre" onChange={(e) =>{
      let val= e.target.value;
     this.setState(prevState => {
    let usuario=Object.assign({},prevState.usuario);
    usuario.nombre=val;
    return{usuario};
})}
    }/>
    <label for="nombre">Nombres</label>
   </FloatLabel> 
   <br/>

   <FloatLabel>
    <InputText  style={{width:"100%"}} value={this.state.usuario.apellido} id="apellido" onChange={(e) =>{
      let val = e.target.value;
     this.setState(prevState => {
    let usuario=Object.assign({},prevState.usuario);
    usuario.apellido=val;
    return{usuario};
})}
    }/>
    <label for="apellido">Apellidos</label>
   </FloatLabel> 
   <br/>

   <FloatLabel>
    <InputText  style={{width:"100%"}} value={this.state.usuario.correo} id="correo" onChange={(e) =>{

     let val=e.target.value;
     this.setState(prevState => {
    let usuario=Object.assign({},prevState.usuario);
    usuario.correo=val;
    return{usuario};
})}
    }/>
    <label for="correo">Email</label>
   </FloatLabel> 
   <br/>



      
    </Dialog>
  <Toast ref={this.Toast}/>
    </div>
  )
}

showSaveDialog(){
  this.setState({
    visible:true,
      usuario:{
      iduser:null,
      nombre:null,
      apellido:null,
      correo:null
    }
  });
}

showEditDialog(){
  this.setState({
    visible:true,
      usuario:{
      iduser:this.state.SelectedUsuario.iduser,
      nombre:this.state.SelectedUsuario.nombre,
      apellido:this.state.SelectedUsuario.apellido,
      correo:this.state.SelectedUsuario.correo
    }
  });


}


}  

