import { Component } from '@angular/core';
import { CovidAPIService } from '../covid-api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [CovidAPIService]
})
export class Tab1Page {

  countries: any = null;
  searchCountry: any;

  constructor(
    private covidApiService: CovidAPIService,
    public router: Router,
    public alertController: AlertController) {
    this.covidApiService.getCountries().subscribe((data)=>{
      this.countries = data;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Log out',
      message: 'Deseja sair do aplicativo?',
      buttons: [{
        text: 'NÃO',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'SIM',
        handler: () => {
          this.logOut();
        }
      }]
    });

    await alert.present();
  }

  logOut(){
    this.router.navigateByUrl('/login')
  }

}
