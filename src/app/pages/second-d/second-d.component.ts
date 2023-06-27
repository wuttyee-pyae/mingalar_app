import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpConfigService } from '../http-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-second-d',
  templateUrl: './second-d.component.html',
  styleUrls: ['./second-d.component.scss']
})
export class SecondDComponent implements OnInit {
  lang: string;
  showFiller = false;
  itemList: any;
  secondPanelOpenState: boolean = false;

  constructor( public translate: TranslateService,
    public httpService : HttpConfigService,
    public confirmationDialogService : ConfirmationDialogService,
    private router: Router,
    private cdf : ChangeDetectorRef) {
    translate.addLangs(['en','mm']);
    translate.setDefaultLang('en');
    this.lang = "en";
    this.getList();
  }

  async ngOnInit() {  }

  public openConfirmationDialog(status : string , index? : number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure want to '+ status +' item ?')
    .then((confirmed : any) =>{
      console.log('User confirmed:', confirmed)
      status == 'add' ? this.navigateDetail('create') : this.deleteItem(index)
    })
    .catch(() => console.log('User dismissed'));
  }

  getList(){
    this.httpService.getList().subscribe((res) => {
      this.itemList = res;
      this.cdf.detectChanges()
    })
  }

  switchLang() {
    this.lang == 'en' ? this.translate.use('mm')  :  this.translate.use('en');
    (this.lang == 'en') ? this.lang = 'mm' :  this.lang = 'en';
  }

  navigateDetail(status : string ,id?: number){
    this.router.navigate(['second-d/detail'] , {
      queryParams: { id: id , pageStatus : status }
    })
  }

  deleteItem(id : any){
    this.httpService.deleteItem(id).subscribe((res)=>{
      this.httpService.deleteItem(id)
      this.getList()
    })
  }
}
