// Importar los modulos del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoNewComponent } from './components/video-new/video-new.component';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';

import { IdentityGuard } from './services/identity.guard';

// Array de tutas
const appRoutes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'home', component:HomeComponent },
  { path: 'home/:page', component:HomeComponent },
  { path: 'login', component:LoginComponent },
  { path: 'logout/:sure', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'settings', component:UserEditComponent, canActivate: [IdentityGuard] },
  { path: 'save-favorites', component:VideoNewComponent, canActivate: [IdentityGuard] },
  { path: 'video-edit/:id', component:VideoEditComponent, canActivate: [IdentityGuard] },
  { path: 'video/:id', component:VideoDetailsComponent, canActivate: [IdentityGuard] },
  { path: 'error', component:ErrorComponent },
  { path: '**', component:ErrorComponent }
];

// Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);