import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { BlogPost } from 'src/app/models/blog-post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  public blogPosts: BlogPost[];
  isLoading: boolean;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.isLoading = true;
    this.blogService.getBlogPosts().subscribe({
      next: (response: BlogPost[]) => {
        this.blogPosts = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }
}
