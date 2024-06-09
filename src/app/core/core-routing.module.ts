import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: FormComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      },
      {
        path: 'table',
        component: TableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
