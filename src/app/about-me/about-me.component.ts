import { Component, OnInit, inject } from '@angular/core';
import { GithubApiService } from '../service/github-api.service';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit {

  private gitApi = inject(GithubApiService);

  publicRepos: number = 0
  followers: number = 0



  ngOnInit(): void {
    this.gitApi.getInfo().subscribe((data: any) => {

      this.followers = data.followers;
      this.publicRepos = data.public_repos;

    });
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#title", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#title",
        start: "top 75%",
        once: true
      },
    });

    gsap.fromTo("#grid", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#grid",
        start: "top 75%",
        once: true
      },
    });
    gsap.fromTo("#github", {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#github",
        start: "top 75%",
        once: true
      },
    });
  }
}
