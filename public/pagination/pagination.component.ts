import { Component,Input,Output,EventEmitter,OnInit,DoCheck } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Location } from '@angular/common';

interface ipagination{
}

@Component({
  selector: 'pagination',
  template: `
  <ul class="pagination">
    <li><a routerLink="/reports/1" (click)="changePage(1)">&laquo;</a></li>
    <li><a (click)="subtractNum()" routerLink="/reports/{{nowPage}}">&lt;</a></li>
    <li [ngClass]="{'active':this.pageNum.color=='blue'}" *ngFor="let pageNum of pageList" (click)="changePage(pageNum.num)"><a>{{pageNum.num}}</a></li>
    <li><a (click)="plus()" routerLink="/reports/{{nowPage}}">&gt;</a></li>
    <li><a routerLink="/reports/{{totalPage}}" (click)="changePage(totalPage)">&raquo;</a></li>
    <li>第{{nowPage}}/{{totalPage}}页</li>
    <li>跳转到<input type="text" [(ngModel)]="goToPage">页<button class="btn btn-default" (click)="writePageNum(goToPage)">跳转</button></li>
  </ul>
  `,
  styleUrls: ['./pagination.css']
})
export class Pagination implements OnInit,DoCheck{
  @Output() changeCurPage:EventEmitter<Number> = new EventEmitter;

  @Input() pageList;
  @Input() totalPage;
  nowPage=1;
  goToPage:number;
  pagination:ipagination={
  }
  constructor(private activatedRoute:ActivatedRoute,private location: Location) {
    this.activatedRoute.params.subscribe(params=>{
      if(params.id){
        console.log(params.id);
        this.nowPage=params.id;
      }
    });    
  }
  ngOnInit(){ 
    for(let i=0;i<this.pageList.length;i++){
      this.pageList[i].color="white";
    } 
  }
  ngDoCheck(){
    for(let i=0;i<this.pageList.length;i++){
      this.pageList[i].color="white";
    }
    this.pageList[this.nowPage-1].color='blue';
  }
  subtractNum(){
    if(this.nowPage>1){
      this.nowPage--;
      this.changeCurPage.emit(this.nowPage);      
    }
    //this.activatedRoute.params.subscribe(params=>{console.log(params.id)})
  }
  plus(){
    if(this.nowPage<this.totalPage){
      this.nowPage++;
      this.changeCurPage.emit(this.nowPage);
    }

  }
  writePageNum(pageNum){
    if(pageNum>0&&pageNum<this.totalPage){
      this.changePage(pageNum)
    }
  }
  changePage(pageNum) {
    // if(pageNum.color){
    //   for(let i=0;i<this.pageList.length;i++){
    //     this.pageList[i].color="white";
    //   }
    //   this.nowPage=pageNum.num;
    //   this.changeCurPage.emit(this.nowPage);
    //   pageNum.color="blue"
    // }else{
      this.nowPage=pageNum;
      this.changeCurPage.emit(this.nowPage);
    //}
  }
}