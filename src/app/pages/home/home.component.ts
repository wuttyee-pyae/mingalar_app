import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userText : any = 'Welcome from Mingalar App.';
  subject = new Subject<string>();
  ramdomList = ["Welcome from Mingalar App.",
                "Bienvenue de l'application Mingalar..",
                "Bienvenida desde la aplicación Mingalar.",
                "Willkommen von der Mingalar App.",
                "Benvenuto dall'app Mingalar."
              ]
  showWalletAmount = true;
  imgCollection = [
    {
      image: 'assets/images/slide1.png',
      thumbImage: 'assets/images/slide1.png',
    }, {
      image: 'assets/images/slide1.png',
      thumbImage: 'assets/images/slide1.png',
    }, {
      image: 'assets/images/slide1.png',
      thumbImage: 'assets/images/slide1.png',
    }
];
  slides = [
    {image: 'assets/images/2D.png'}, 
    {image: 'assets/images/3D.png'},
    {image: 'assets/images/item1.png'}, 
    {image: 'assets/images/item2.png'}, 
    {image: 'assets/images/item3.png'},
    {image: 'assets/images/item4.png'},
    {image: 'assets/images/item5.png'},
    {image: 'assets/images/item6.png'},
    {image: 'assets/images/item7.png'},
  ];
  constructor( 
    public confirmationDialogService : ConfirmationDialogService,
    private router: Router) {
      this.subject.subscribe({
        next: (msg : any) => {
          this.userText = msg
        },
      })

      setInterval(() => {
        let randomIndex = Math.floor(Math.random() * this.ramdomList.length);
        this.subject.next(this.ramdomList[randomIndex])
      }, 5000);
      console.log(this.subject)
     }
  async ngOnInit() { }

  showAmount(){
    this.showWalletAmount = !this.showWalletAmount;
  }

  navigateToDetail() {
    this.router.navigate(['/second-d'] )
  }
}