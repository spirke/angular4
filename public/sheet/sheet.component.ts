import { Component,Input, Output,EventEmitter,ChangeDetectorRef,ElementRef, enableProdMode } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpService } from '../../services/http.service';

declare let $: any;

interface iSheet{
    originalData:any,
    selectTitle:any[],
    choiceCondition:string,
    inputSeek:string,
    checkBtn:boolean,
    newRfid:string,
    newRfidArea:boolean,
    group:string,
    groupArray:any[],
    onesheet:string,
    othersheet:string,
    modalTarget:any,
    modalTitle:any[],
    needImg:boolean,
    imgError:boolean,
    base64:string
}
@Component({
    selector: 'sheet',
    template: `
    <form class="bs-example bs-example-form" role="form" *ngIf="sheetAll.showSelect">
        <div class="form-group selectForm">
            <select class="form-control" [(ngModel)]="sheet.choiceCondition" name="select">
                <option *ngFor="let title of sheet.selectTitle">{{title.out}}</option>
            </select>
        </div> 
        <div class="form-group selectForm">
            <div class="col-lg-6">
                <div class="input-group">
                    <input type="text" class="form-control" [(ngModel)]="sheet.inputSeek" name="0">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" (click)="titleSeek()">搜索</button>
                    </span>
                </div>
            </div>
        </div> 
    </form>
    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">勾选进行编辑</h3>
        </div>
        <div class="panel-body">
            <table class="table">
                <tbody>
                    <div class="leftCheck">
                        <button type="button" class="btn btn-default" (click)="checkAll()">全/不全选</button>
                        <ul>
                            <li *ngFor="let sheet of sheetData.data">
                                <input type="checkbox" [(ngModel)]="sheet.check">
                            </li>
                        </ul>                    
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="commonWidth" *ngFor="let title of sheetTitle">{{title}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let sheet of sheetData.data;let i = index">
                                <td class="commonWidth" *ngFor="let td of sheetData.td;let j = index"><input type="text" [(ngModel)]="sheet[sheetData.td[j]]" name="{{j}}"></td>
                                <td class="commonWidth"><a (click)="edit(i,sheet)" data-toggle="modal" data-target="#myModal">编辑</a></td>
                            </tr>
                        </tbody>
                    </table>    
                </tbody>
            </table>
        </div>
    </div>
    <div class="btn-three" *ngIf="sheetAll.showBtn">
        <button type="submit" class="btn btn-default" (click)="delete()">删除</button>
        <button type="submit" class="btn btn-default" (click)="add()">添加</button>
        <button type="submit" class="btn btn-default" (click)="endEdit()">提交新添加条目的编辑</button>
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">放大编辑</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group" *ngFor="let left of sheet.modalTitle;let i=index">
                            <label class="col-sm-2 control-label">{{left}}</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="focusedInput" type="text" [(ngModel)]="modal[sheetData.td[i]]" name="{{'model'+i}}">
                            </div>
                        </div>
                        <div class="form-group" *ngIf="sheet.needImg">
                            <label class="col-sm-2 control-label">图片</label>
                            <div class="col-sm-10">
                                <input type="file" id="myphote_mess" (click)="getImg()">
                                <button type="button" class="fakebtn btn btn-default">从本地文件里选择照片</button>
                                <div class="redHint" *ngIf="sheet.imgError">图片大小不能超过2M</div>
                            </div>
                        </div>
                        <img id="exhibition" *ngIf="sheet.needImg">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="modelComplete()">提交更改</button>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrls: ['./sheet.css']
})
export class Sheet{
    // @Output() changeCurPage:EventEmitter<Number> = new EventEmitter;
    @Input() sheetAll;
    @Input() sheetData;
    @Input() modal;
    @Input() sheetTitle;
    // @Input() sheetTd;

    sheet:iSheet={
        originalData:'',
        selectTitle:[],
        choiceCondition:'',
        inputSeek:'',
        checkBtn:false,
        newRfid:'',
        newRfidArea:false,
        groupArray:[],
        group:'',
        onesheet:'',
        othersheet:'',
        modalTarget:'',
        modalTitle:[],
        base64:'',
        needImg:false,
        imgError:false      
    }
    constructor(private cd:ChangeDetectorRef,private el:ElementRef,private httpService:HttpService) {  
        // enableProdMode();
    }
    ngOnInit(){
        for(let i=0;i<this.sheetTitle.length-1;i++){
            if(this.sheetTitle[i]!='图片'){
                this.sheet.modalTitle.push(this.sheetTitle[i])
            }
        }
        this.sheet.needImg=Boolean(this.sheetTitle.indexOf("图片")+1)

        for(let i=0;i<this.sheetAll.title.length-1;i++){
            if(this.sheetAll.title[i].out!='图片'){
                this.sheet.selectTitle.push(this.sheetAll.title[i])
            }
        }         
    }
    ngDoCheck(){
    }
    ngAfterContentInit(){
    }
    ngAfterContentChecked(){
        if(this.useOne){
            this.useOne()
        }
    }
    ngAfterViewInit(){
        this.el.nativeElement.querySelectorAll('.commonWidth').forEach((data)=>{
            data.style.width=100/this.sheetTitle.length+'%';
        })
    }
    useOne(){
        if(this.sheetData.data.length!=0){
            this.sheet.originalData=JSON.parse(JSON.stringify(this.sheetData.data))
            console.log(this.sheet.originalData)
            this.useOne=null;
        }
    }
    titleSeek(){
        let a=[];
        let b;
        this.sheet.selectTitle.forEach((data)=>{
            if(data.out==this.sheet.choiceCondition){
                b=data.in
            }
        })
        console.log(this.sheet.originalData)
        this.sheet.originalData.forEach((data)=>{
            console.log(b)
            console.log(data[b])
            if(data[b]==this.sheet.inputSeek){
                a.push(data)
            }
        })
        console.log(a)
        this.sheetData.data=a;
        console.log(this.sheetData.data)
    }
    checkAll(){
        let nowCheckBtn=this.sheet.checkBtn;
        for(let i=0;i<this.sheetData.data.length;i++){
            this.sheetData.data[i].check=!nowCheckBtn;
        }
        this.sheet.checkBtn=!nowCheckBtn;       
    }
    add(){
        this.sheet.checkBtn=false;
        this.sheetData.data.push({check:false,isNew:true})
    }
    endEdit(){
        //模块页面添加与后端交互  
        if(this.sheetData.data[0].moduleCode){
            this.sheetData.data.forEach((data)=>{
                if(data.isNew==true){
                    let bizcontent={moduleCode:data.moduleCode,moduleName:data.moduleName}
                    let method="addModule".toLowerCase();
                    let resource="SysconfigController".toLowerCase();
                    this.httpService.httpPost(resource,method,bizcontent).map(res=>res.json())
                            .subscribe(
                                data=>{
                                }
                            )                    
                }
            })            
            
        }
    }
    delete(){
        //模块页面删除与后端交互  
        if(this.sheetData.data[0].moduleCode){
            this.sheetData.data.forEach((data)=>{
                if(data.check==true){
                    console.log(data.moduleCode)
                    let bizcontent={moduleCode:data.moduleCode}
                    let method="delModule".toLowerCase();
                    let resource="SysconfigController".toLowerCase();
                    this.httpService.httpPost(resource,method,bizcontent).map(res=>res.json())
                            .subscribe(
                                data=>{
                                }
                            )                    
                }
            })            
            
        }
        //前端dom删除
        this.sheet.checkBtn=false;
        this.sheetData.data=this.sheetData.data.filter((key)=>{
            return key.check==false;
        })       
    }
    getImg(){
        let that=this;
        $('#myphote_mess').on('change',function(e){
            let tar = this,
            files = tar.files,
            fNum = files.length,
            URL = window.URL;
            if(!files[0])return;
            for(let i=0;i<fNum;i++){
                if(files[i].type.search(/image/)>=0){
                    let blob = URL.createObjectURL(files[i]);
                    let newImg = new Image();
                    newImg.src = blob;
                    $('#exhibition').attr({'src':newImg.src});

                    var file = this.files[0];
                    //判断类型是不是图片  
                    if(!/image\/\w+/.test(file.type)){     
                        alert("请确保文件为图像类型");   
                        return false;   
                    }   
                    var reader = new FileReader();   
                    reader.readAsDataURL(file);   
                    reader.onload =function(e){
                        if(files[0].size<1024*1024*2){
                          that.sheet.imgError=false;
                          that.sheet.base64=this.result.split(",")[1];
                        }else{
                          that.sheet.imgError=true;
                        }
                    }
                }
            }
        });
    }
    edit(index?:any,data?:any){
        this.sheet.modalTarget=index;
        this.modal=JSON.parse(JSON.stringify(data));
    }
    modelComplete(target?:any){
        this.sheetData.data[this.sheet.modalTarget]=JSON.parse(JSON.stringify(this.modal));
    }
}