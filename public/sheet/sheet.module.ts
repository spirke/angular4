import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sheet } from './sheet.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule,FormsModule,RouterModule],
    declarations: [
        Sheet
    ],
    exports: [
        Sheet
    ],
    providers: [],
})
export class SheetModule {}