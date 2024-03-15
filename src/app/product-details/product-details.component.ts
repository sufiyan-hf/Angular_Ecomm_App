import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData:undefined | product
  productQuantity:number=1
  quantity:number=1
  removeCart=false
  cartData: product | undefined
  constructor(private activeRoute:ActivatedRoute,private product:ProductService){}

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
   // console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData= result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.cartData=item[0]
        this.removeCart=true;
       }
        })
      }
      
      
      
    })
    
  }

  

  handleQuantity(val:string){
    if(this.productQuantity < 20 && val=='plus'){
      this.productQuantity=this.productQuantity+1;
    }
    else if(this.productQuantity > 1 && val=='min'){
      this.productQuantity=this.productQuantity-1;

    }

  }

  addToCart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      //console.warn(this.productData)
      //user not logged in
      if(!localStorage.getItem('user')){
      this.product.localAddToCart(this.productData);
      this.removeCart=true

      }
      else{
        //console.warn("user is logged in");
        let user=localStorage.getItem('user')
        let userId=user && JSON.parse(user).id
        //console.warn(userid);
        let cartData:cart={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id
        //console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            alert("Product added to cart!!!")
            this.product.getCartList(userId);
            this.removeCart=true

          }

        })      
      }
    }
  }

  removeFromCart(productId:number){
    if(!localStorage.getItem('user')){
    this.product.removeProductFromCart(productId)
    alert("Product removed from cart")
    }
    else{
      let user=localStorage.getItem('user')
      let userId=user && JSON.parse(user).id
      console.warn(this.cartData);
      this.cartData && this.product.removeProductFromDB(this.cartData?.id).subscribe((result)=>{
        if(result){
          alert("Product removed from cart")
          this.product.getCartList(userId)
        }

      })
      this.removeCart=false
      
    }
    
  }

    
}
