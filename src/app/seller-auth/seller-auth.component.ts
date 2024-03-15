import { Component } from '@angular/core';
import { SellersService } from '../services/sellers.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin=false;
  authError:string='';
 constructor(private seller:SellersService,private router:Router){}


  ngOnInit():void{
    this.seller.reloadSeller();
  }

  signUp(data:signUp):void{
    this.seller.userSignUp(data) 
}

login(data:login):void{
  // console.warn(data);
  this.authError="";
  this.seller.userLogin(data);
  this.seller.isLoginError.subscribe((isError)=>{
    if(isError){
      this.authError="email or password is incorrect!"
    }
  })
}

  openLogin(){
      this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;
}
}

