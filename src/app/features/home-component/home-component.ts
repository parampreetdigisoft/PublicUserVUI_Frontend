
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit{


  constructor(){

  }
  ngOnInit(): void {
    
  }
}
