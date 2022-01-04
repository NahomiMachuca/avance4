import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SesionComponent } from './sesion/sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SimpleComponent } from './simple/simple.component';
import { RouterModule, Routes } from '@angular/router';
import { DobleComponent } from './doble/doble.component';
import { TripleComponent } from './triple/triple.component';
import { CuadrupleComponent } from './cuadruple/cuadruple.component';
import { FamiliarComponent } from './familiar/familiar.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { PagoComponent } from './pago/pago.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sesion', component: SesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'simple', component: SimpleComponent },
  { path: 'doble', component: DobleComponent },
  { path: 'triple', component: TripleComponent },
  { path: 'cuadruple', component: CuadrupleComponent },
  { path: 'familiar', component: FamiliarComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'alquiler', component: AlquilerComponent },
  { path: 'pago', component: PagoComponent },

];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
