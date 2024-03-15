import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData:undefined | product
  productMessage:undefined | string

  constructor(private route:ActivatedRoute,private product:ProductService){}

  ngOnInit():void{
    let productId=this.route.snapshot.paramMap.get("id");
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result;
      
    })
  }

  submit(data:any){
    console.warn(data);
    // console.warn("product data");
    // console.warn(this.productData);
    if(this.productData){
      data.id=this.productData.id;

    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product updated sucessfully!!"
      }

    });
    setTimeout(() => {
      this.productMessage=undefined
    }, 3000);


    
  }
}
