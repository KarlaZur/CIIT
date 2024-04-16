import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/models/Rol';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  rol: Rol = new Rol();
  rolNuevo: Rol = new Rol();
  pageSize = 4;
  p = 1;
  idioma : any = 2;

  constructor(private rolesService: RolesService, private cambioIdiomaService: CambioIdiomaService) { 
    this.idioma=2;
    console.log("entrando a constructor de roles")
  }

  ngOnInit(): void {
    console.log("entrando a oninit de roles")
    this.rolesService.list().subscribe((resRoles: any) => {
      this.roles = resRoles;
    }, err => console.error(err));

    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) =>
      {
      this.idioma=msg;
      console.log("idioma actual:",this.idioma," aaaa");
      }
    );
  }

  actualizarRol(id_rol: any) {
    this.rolesService.listOne(id_rol).subscribe((resRol: any) => {
      this.rol = resRol;
      console.log(this.rol)
      $('#modalModificarEmpresa').modal();
      $("#modalModificarEmpresa").modal("open");
    }, err => console.error(err));
  }
  guardarActualizarRol() {
    this.rolesService.actualizarRol(this.rol).subscribe((res) => {
      $('#modalModificarEmpresa').modal('close');
      this.rolesService.list().subscribe((resRoles: any) => {
        this.roles = resRoles;
      }, err => console.error(err));
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Plan Actualizado'
      })
    }, err => console.error(err));
  }
  crearRol() {
    this.rolNuevo = new Rol();
    console.log("rol nuevo")
    $('#modalCrearEmpresa').modal();
    $("#modalCrearEmpresa").modal("open");
  }
  guardarNuevoRol() {
    console.log("GuardandoRol")
    this.rolesService.crearRol(this.rolNuevo).subscribe((res) => {
      $('#modalCrearEmpresa').modal('close');
      this.rolesService.list().subscribe((resRoles: any) => {
        this.roles = resRoles;
      }, err => console.error(err));
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Plan Actualizado'
      })
    }, err => console.error(err));
  }
  eliminarRol(id_rol: any) {
    console.log("Click en eliminar Rol");
    console.log("Identificador del Rol: ", id_rol);
    Swal.fire({
      title: "¿Estás seguro de eliminar este Rol?",
      text: "¡Este rol depende de alguna otra tabla!, ¡CUIDADO!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.eliminarRol(id_rol).subscribe((resRol: any) => {
          console.log("resRol: ", resRol);
          this.rolesService.list().subscribe((resRol: any) => {
            this.roles = resRol;
            //console.log(resRol);
            console.log(this.roles)
          },
            err => console.error(err)
          );
        },
          err => console.error(err)
        );


        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success"
        });
      }
    });

  }

}
