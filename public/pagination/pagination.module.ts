import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule,FormsModule,RouterModule],
    declarations: [
        Pagination
    ],
    exports: [
        Pagination
    ],
    providers: [],
})
export class PaginationModule {}