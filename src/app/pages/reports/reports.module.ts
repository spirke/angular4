import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Reports } from './reports';
import { ReportsRouteModule } from './reports.route.module';
import { PaginationModule } from '../../../public/pagination/pagination.module';

@NgModule({
    imports: [CommonModule,FormsModule,HttpModule,PaginationModule,ReportsRouteModule],
    exports: [],
    declarations: [
        Reports
    ],
    providers: [],
})
export class ReportsModule {}