import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData:order[] | undefined
  orderDeleteMsg:string | undefined
  constructor(private product:ProductService){}

  ngOnInit():void{
    this.getOrderList()
   
  }

  cancelOrder(orderId:number | undefined){
    orderId && this.product.deleteOrder(orderId).subscribe((result)=>{
      if(result){
        this.orderDeleteMsg="Order deleted successfully!!"
        setTimeout(() => {
          this.orderDeleteMsg=undefined
        }, 3000);
        this.getOrderList()

      }
    })
  }

  getOrderList(){

    this.product.orderList().subscribe((result)=>{
      this.orderData=result
      console.warn(this.orderData);
      
    })
  }

}
