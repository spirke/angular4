import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Reports } from './reports'; 

const routes:Routes=[
	{
		path:'',
		component:Reports, children: [
            { path: 'reports/:id', component: Reports }
        ]
	}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRouteModule {}