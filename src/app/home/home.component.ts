import { Component } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ToolingComponent } from './tooling/tooling.component';
import { AboutMeComponent } from '../about-me/about-me.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjectsComponent, ContactComponent, AboutComponent, ExperienceComponent, ToolingComponent,AboutMeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
