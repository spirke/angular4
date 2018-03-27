import { Component,Input,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Params,Router } from '@angular/router';

//import 'rxjs/add/operator/switchMap';
import { AppComponent } from '../../app.component';

interface iReports{

}
@Component({
  selector: 'app-root',
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class Reports{
  public pageList = [{num:1}, {num:2},{num:3},{num:4},{num:5}];
  public totalPage = 5;
  public nowPage=1;

  constructor(private app:AppComponent,private activatedRoute:ActivatedRoute,private router: Router,private location: Location) {    
        this.activatedRoute.params.subscribe(params=>{
            if(params.id){
                console.log(params.id);
                this.nowPage=params.id;
            }
        });
  }
  goToNewPage(pageNow) {
    this.nowPage = pageNow;
    this.router.navigate(['/reports',pageNow]);
    console.log(this.nowPage)
    // this.route.params
    //   .switchMap(params =>this.getnowPage(+params['reportsChild']))
      //.subscribe(params => params['reportsChild'] = pageNow);
  }
}