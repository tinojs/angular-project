import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { appInterceptorProvider } from './app.interceptor';
import { AboutComponent } from './about/about.component';
import { PropertiesModule } from './properties/properties.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    NotFoundComponent,
    AuthenticateComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule, 
    HttpClientModule,
    PropertiesModule,
    AppRoutingModule
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
