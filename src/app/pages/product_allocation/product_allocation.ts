import { Component,ElementRef,ChangeDetectorRef } from '@angular/core';
import { Headers,Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpService } from '../../../services/http.service';
import { AppComponent } from '../../app.component';

interface iProduct_allocation{
}
@Component({
  selector: 'app-root',
  templateUrl: './product_allocation.html',
  styleUrls: ['./product_allocation.css'],
  providers: [HttpService]
})
export class Product_allocation{
    product_allocationSheetTitle=["品名","大类","子类","商标","生产日期","保质期","单价","图片","放大编辑"]
    product_allocationSheetData={data:[],td:[]};
    product_allocationModal={
        name:'',
        kind:'',
        childKind:'',
        brand:'',
        date:'',
        validity:'',
        price:''
    }
    product_allocationSheet={
        showSelect:true,
        showBtn:true,
        title:[
            {
                out:'品名',
                in:'name'
            },
            {
                out:'大类',
                in:'kind'            
            },
            {
                out:'子类',
                in:'childKind'            
            },
            {
                out:'商标',
                in:'brand'            
            },
            {
                out:'生产日期',
                in:'date'            
            },
            {
                out:'保质期',
                in:'validity'            
            },
            {
                out:'单价',
                in:'price'            
            },
            {
                out:'图片',
                in:''            
            },
            {
                out:'放大编辑',
                in:''            
            }
        ]        
    }
    constructor(private app:AppComponent,private cd:ChangeDetectorRef){
        this.product_allocationSheetData.data=[
            {
                name:'1'
            },
            {
                name:'2',
            },
        ]
        this.product_allocationSheetData.td=["name","kind","childKind","brand","date","validity","price","price"]

        for(let i=0;i<this.product_allocationSheetData.data.length;i++){
            this.product_allocationSheetData.data[i].check=false;
            this.product_allocationSheetData.data[i].num='';
        }	
	}


}