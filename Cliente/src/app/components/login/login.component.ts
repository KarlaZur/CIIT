import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TranslateService } from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = new Usuario() ;
  idioma: any;
  constructor(private usuarioService : UsuarioService , private router: Router,private translate: TranslateService){
    this.idioma = localStorage.getItem("idioma");
    if (this.idioma === null || this.idioma === undefined || this.idioma === '') {
        //Si el usuario no cambio el idioma lo dejamos por default en español
        localStorage.setItem("idioma","1"); 
        this.idioma = '1';
    }
    this.setIdioma(this.idioma);
  }
  ngOnInit(): void {
    $(document).ready(function () { $(".dropdown-trigger").dropdown(); });
    //this.idioma = localStorage.getItem('idioma');
    this.verificarIdioma();
  }

  logueo()
  {
    this.verificarIdioma();
    this.usuarioService.existe(this.usuario.correo,this.usuario.contrasena).subscribe((resusuario: any) =>
    {
      if(resusuario.id_Rol != -1)
      {
        localStorage.setItem('correo', resusuario.correo);
        localStorage.setItem('id_Rol', resusuario.id_Rol);
        this.router.navigateByUrl('/principal');
      }else{
        console.log("Error, usuario o contrasena no valida");
      }
    },
    err => console.error(err)
    );
  }
  setIdioma(idioma:any) {
    localStorage.removeItem('idioma');
    if (idioma == '1'){
      this.translate.use("es");
      localStorage.setItem('idioma', idioma.toString());
      this.idioma = '1';
    }
    if (idioma == '2'){
      this.translate.use("en");
      localStorage.setItem('idioma', idioma.toString());
      this.idioma = '2';
    }
    if (idioma == ''){
      this.translate.use("es");
      localStorage.setItem("idioma", "1");
      this.idioma = '1';
    }
  }
  verificarIdioma(){
    if(this.idioma == '1')
      this.translate.use("es");
    if(this.idioma == '2')
      this.translate.use("en");
  }
}
