import { Component } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { IntroductionComponent } from '../introduction/introduction.component';

@Component({
    selector: 'app-home',
    imports: [
        ProjectsComponent,
        ContactComponent,
        IntroductionComponent,
        ExperienceComponent,
        AboutMeComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {}
