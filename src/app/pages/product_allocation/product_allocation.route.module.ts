import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Product_allocation} from './product_allocation'; 

const routes:Routes=[
	{
		path:'',
		component:Product_allocation
	}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Product_allocationRouteModule {}