import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';

// PrimeNG modules
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {MessageService} from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    TableComponent,
    FormComponent
  ],
  imports: [
    CommonModule, // Import CommonModule in feature modules
    ReactiveFormsModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    TableModule,ConfirmPopupModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    TagModule,
    DialogModule,
    ButtonModule,
    ToastModule,TooltipModule,
    CoreRoutingModule,ConfirmDialogModule
  ],
  providers:[MessageService,ConfirmationService]
})
export class CoreModule { }
