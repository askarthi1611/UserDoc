import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { CoreModule } from './core/core.module';

// PrimeNG modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderbarComponent
  ],
  imports: [
    BrowserModule, // Import BrowserModule only in AppModule
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,ToastModule,
    HttpClientModule,ConfirmPopupModule,TooltipModule,
    CoreModule // Import CoreModule
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
