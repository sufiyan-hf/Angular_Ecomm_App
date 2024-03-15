import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList: undefined | product[]
  deleteProductMessage:undefined | string
  icon=faTrash
  editIcon=faEdit
  constructor(private product:ProductService){}

  ngOnInit():void{
    this.ListOfProduct();
  
  }

  deleteProduct(id:number){
    console.warn("test id "+ id);
    this.product.removeProduct(id).subscribe((result)=>{
      if(result){
        this.deleteProductMessage="product deleted sucessfully";
        this.ListOfProduct();
      }

    })

    setTimeout(() => {
      this.deleteProductMessage=undefined;
      
    }, 2000);
    
  }

  ListOfProduct(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
  })

  }

}
