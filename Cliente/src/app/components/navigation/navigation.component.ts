import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
declare var $: any;


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private translate: TranslateService, private cambioIdiomaService: CambioIdiomaService) { }

  ngOnInit(): void {
    $(document).ready(function () { $(".dropdown-trigger").dropdown(); });
  }

  logout() {
    console.log("Cerrando sesion");
    localStorage.removeItem("id_Rol")
    localStorage.removeItem("correo")
    this.router.navigateByUrl('');
  }

  enviarMensajeIdioma(idioma:any)
{
this.cambioIdiomaService.sendMsg(idioma);
}
  setIdioma(idioma: any) {
    if (idioma == 1){
      this.translate.use("en");
      this.enviarMensajeIdioma(1);
    }  
    if (idioma == 2){
      this.translate.use("es");
      this.enviarMensajeIdioma(2);
    }
      
  }

}
