import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpConfigService } from '../http-config.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent  implements OnInit  {
  detailForm : UntypedFormGroup ;
  id: any;
  pageStatus: any;


  constructor( private route: ActivatedRoute,
    private httpService : HttpConfigService,
    private cdf : ChangeDetectorRef,
    private location : Location) {
   this.loadForm();
   this.route.queryParams.subscribe((params : any) => {
    this.id = params.id;
    this.pageStatus = params.pageStatus
    this.getData();
  })
  }

  async ngOnInit() {  }

  loadForm(data?: any) {
    this.detailForm = new UntypedFormGroup({
      title: new UntypedFormControl(data ? data.title : null ,[Validators.required,Validators.minLength(1)]),
      body : new UntypedFormControl(data ? data.body : null , [Validators.required,Validators.minLength(1)]),
    })
  }

  getData(){
    this.httpService.getItem(this.id).subscribe((result : any) => {
      console.log("result -- " , result)
      this.loadForm(result[0])
      this.cdf.detectChanges()
    })
  }

  uploadData(){
    let requestData = {
      title : this.detailForm.value.title,
      body : this.detailForm.value.body,
      userId : 1
    }
    this.httpService.postItem(requestData).subscribe((result)=>{
      console.log(result);
      this.location.back()
    })
  }

  updateData(){
    let requestData = {
      title : this.detailForm.value.title,
      body : this.detailForm.value.body,
      userId : 1,
      id: this.id
    }
    this.httpService.editItem(requestData , this.id).subscribe((result)=>{
      console.log(result);
      this.location.back()
    })
  }

  isControlValid(controlName: string): boolean {
    const control = this.detailForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.detailForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation : any, controlName : any): boolean {
    const control = this.detailForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: any): boolean {
    const control = this.detailForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
