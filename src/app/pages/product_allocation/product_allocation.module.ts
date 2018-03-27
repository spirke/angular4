import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http';

import {Product_allocation} from './product_allocation'; 
import {Product_allocationRouteModule} from './product_allocation.route.module';
import { SheetModule } from '../../../public/sheet/sheet.module';

@NgModule({
    imports: [CommonModule,FormsModule,HttpModule,Product_allocationRouteModule,SheetModule],
    exports: [],
    declarations: [
        Product_allocation
    ],
    providers: [],
})
export class Product_allocationModule {}