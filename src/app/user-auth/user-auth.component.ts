import { Component } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true
  authError:string=""


  constructor(private user:UserService,private product:ProductService){}

  ngOnInit():void{
    this.user.userAuthReload();
  }

  signUp(data:signUp){
    //console.warn(data);
    this.user.userSignUp(data);
      
    }

    login(data:login){
      // console.warn(data)
      this.user.userLogin(data);
      this.user.invalidUserAuth.subscribe((result)=>{
        //console.warn("apple",result)
        if(result){
          this.authError="Please enter valid user details"
        }
        else{
          setTimeout(() => {
            this.localCartToRemoteCart();
          }, 300);
        }
      })

    }

    /*
    login(val: login) {
      this.userService.userLogin(val);
      this.userService.isLoginError.subscribe((isError) => {
        if(isError) {
          this.authError = "Email And Password Doesn't Match"
        }else {
          setTimeout(() => {
            this.localCartToRemoteCart();
          }, 300);
        }
      })
    }
*/
    openSignUp(){
      this.showLogin=false
    }
    openLogin(){
  this.showLogin=true;
    }

     /*
    localCartToRemoteCart(){
      let data=localStorage.getItem('localCart')
      let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id
      if(data){
        let cartDataList:product[]=JSON.parse(data)
        
        console.warn("user=========================="+ user);
        
        console.warn("user id is "+ userId);
        

        cartDataList.forEach((product:product,index)=>{
          let cartData:cart={
            ...product,
            productId:product.id,
            userId
          }
          delete cartData.id
          setTimeout(() => {
            this.product.addToCart(cartData).subscribe((result)=>{
              if(result){
              console.warn("Product stored in DB!! with userid = " + userId);  
              }          
            }) 
          }, 500);

          ) 
        }
      }  

            if(cartDataList.length===index+1){
              localStorage.removeItem('localCart')       
            }   
            setTimeout(() => {
              this.product.getCartList(userId)
            }, 2000);     
         
        }
      */
       
  
   
    localCartToRemoteCart(){
      let data = localStorage.getItem('localCart');
      let user = localStorage.getItem('user');
      let userId= user && JSON.parse(user).id;
      console.warn("user=============="+ user);
      
      if(data){
       let cartDataList:product[]= JSON.parse(data);
     
       cartDataList.forEach((product:product, index)=>{
         let cartData:cart={
           ...product,
           productId:product.id,
           userId
         }
         delete cartData.id;
         setTimeout(() => {
           this.product.addToCart(cartData).subscribe((result)=>{
             if(result){
               console.warn("data is stored in DB");
             }
           })
         }, 500);
         if(cartDataList.length===index+1){
           localStorage.removeItem('localCart')
         }
       })
      }
   
      setTimeout(() => {
       this.product.getCartList(userId)
      }, 500);
       
     }

  
  }


