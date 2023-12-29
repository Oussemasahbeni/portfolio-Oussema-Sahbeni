import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {

  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
    }
  }




}
