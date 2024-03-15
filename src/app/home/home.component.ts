import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts:undefined | product[]
  trendyProducts:undefined | product[]



  constructor(private product:ProductService){}
  ngOnInit():void{
    this.product.popularProducts().subscribe((result)=>{
      console.warn(result);
      this.popularProducts=result;
      
    })

    this.product.trendyProducts().subscribe((result)=>{
      console.warn(result);
      this.trendyProducts=result;

    })


  }
}
