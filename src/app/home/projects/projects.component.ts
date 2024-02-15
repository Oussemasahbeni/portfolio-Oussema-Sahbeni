import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects: any[] = [
    {
      name: 'Workout Buddy',
      type: 'Web Application',
      description: 'A MERN project with JWT for logging exercises, tracking workout history, and monitoring progress.',
      techs: ['mongodb', 'express', 'react', 'nodejs', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/Workout-Tracker-mern-project',
      report: 'https://www.linkedin.com/in/oussema-sahbeni/overlay/projects/1867084073/multiple-media-viewer/?profileId=ACoAADaHwFsB8ZAUWeC4HIGti4flwdD8WRI-Jm4&treasuryMediaId=1635554528160',
      image: [
        'assets/workout buddy/login.jpg',
        'assets/workout buddy/signup.jpg',
        'assets/workout buddy/homepage.jpg',
        'assets/workout buddy/bmi.jpg'
      ]

    },
    {
      name: 'Project Manger',
      type: 'Web Application',
      description: 'Developed a Project Manager Website with Angular, PHP, and  MySQL, optimizing workflows, enhancing collaboration, and  ensuring seamless data management.',
      techs: ['mysql', 'php', 'angularjs', 'bootstrap'],
      github: 'https://github.com/Oussemasahbeni/Angular-PHP-project-manager',
      report: 'https://www.linkedin.com/in/oussema-sahbeni/overlay/experience/2150513633/multiple-media-viewer/?profileId=ACoAADaHwFsB8ZAUWeC4HIGti4flwdD8WRI-Jm4&treasuryMediaId=1635554522687s',
      image: [
        'assets/projexus/login.jpg',
        'assets/projexus/signup.jpg',
        'assets/projexus/view.jpg',
        'assets/projexus/delete.jpg',
        'assets/projexus/add.jpg',
      ]

    },
    {
      name: 'Simon-Game      ',
      type: 'Web Application',
      description: 'Created Simon Game in JavaScript, highlighting creative coding and game design for an engaging user experience',
      techs: ['javascript', 'css3', 'html5',],
      github: 'https://github.com/Oussemasahbeni/Simon-Game-Challenge',
      image: [
        'assets/simongame/end.jpg',
        'assets/simongame/howto.jpg',
        'assets/simongame/start.jpg'
      ]
    },
    {
      name: 'Products Managers ',
      type: 'Web Application',
      description: 'a Spring Boot /Angular application designed to provide a robust and secure authentication system with BCrypt for password hashing.The main goal of this project is to manage products and categories.',
      techs: ['angularjs', 'spring', 'mysql', 'tailwindcss'],
      github: 'https://github.com/Oussemasahbeni/restApiFront',
      image: [
        'assets/product manager/categories.jpg',
        'assets/product manager/landing.jpg',
        'assets/product manager/login.jpg',
        'assets/product manager/manage.jpg',
      ]
    },
  ]



  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#card", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#card",
        start: "top 75%",
        once: true
      },
    });

    gsap.fromTo("#projects", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 75%",
        once: true
      },
    });

  }




}
