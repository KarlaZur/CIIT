import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CommonModule } from '@angular/common';
import { ReestablecerContrasenaComponent } from './components/reestablecer-contrasena/reestablecer-contrasena.component';
import { OlvideContrasenaComponent } from './components/olvide-contrasena/olvide-contrasena.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { OfertaLaboralComponent } from './components/oferta-laboral/oferta-laboral.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RolesComponent } from './components/roles/roles.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresaComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    UsuarioComponent,
    ReestablecerContrasenaComponent,
    OlvideContrasenaComponent,
    PrincipalComponent,
    OfertaLaboralComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, 
    CommonModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
