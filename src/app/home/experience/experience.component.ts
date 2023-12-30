import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',



})
export class ExperienceComponent {

  experience = [{
    title: 'End of Studies Internship',
    date: " Jan 2024 to Present",
    company: "Inspark Tunis",
    description: "tba.",
    skills: ["angular", "git", "github", "tailwind css", "spring boot", "mySql"]
  },
  {
    title: 'Professional Internship',
    date: " Jan 2023 to Feb 2023",
    company: "CNI Tunis",
    description: "Developed a full-stack web app to streamline project management tasks",
    skills: ["angular", "git", "github", "bootstrap", "php", "mySql"]
  },
  {
    title: 'Introductory Internship',
    date: " Jan 2022 to Feb 2022",
    company: "UIB Tunis",
    description: "Extensively observed financial transactions and account management."
  }]
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#experience-title", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#experience-title",
        start: "top 75%",
        once: true
      },
    });

    gsap.fromTo("#icon", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#icon",
        start: "top 75%",
        once: true
      },
    });
  }


}
