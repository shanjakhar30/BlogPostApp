import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service'; 
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-my-blog',
  standalone: false, 
  templateUrl: './my-blog.component.html',
  styleUrl: './my-blog.component.css'
})
export class MyBlogComponent implements OnInit {
  blogList: any;
  public imageUrl = environment.imageUrl;
  currentPage = 1;
  pageSize = 4;
  totalPages: number =0;
  searchQuery = '';
  userId = sessionStorage.getItem('UserId');
  
  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router) {
      this.blogList = []; 
  }
  ngOnInit() {   
    this.loadBlogs();
  }
  
  getAllBlog() {
    this.blogService.GetActiveBlog().subscribe(data => {
      this.blogList = JSON.parse(JSON.stringify(data) ?? "");
    });
  }

  onViewBlog(value: any) {
    this.router.navigate(['/blog-detail', value]);
  }
  loadBlogs() { 
    this.userId = sessionStorage.getItem('UserId');
    this.blogService.GetPagedBlogList(this.currentPage, this.pageSize, this.userId, this.searchQuery).subscribe(
      (response) => { 
        this.blogList  = response.body; // Access the response body X-Pagination
        const paginationHeader = response.headers.get('X-Pagination');
        if (paginationHeader !== null) {
          const pagination = JSON.parse(paginationHeader);
            this.totalPages = pagination.TotalPages;
        } else {
            console.error("X-Pagination header is missing");
            const pagination = {}; // or whatever default structure you want
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    ); 
}
onPageChange(page: number) {
  this.currentPage = page;
  this.loadBlogs();
}

onPageNumber(page: number) {
  if (page < 1 || page > this.totalPages) return; // Ensure page is within bounds
  this.currentPage = page;
  // Fetch new data based on currentPage
  this.loadBlogs();
}
onSearch() {
  if (this.searchQuery) {
    console.log('Searching for:', this.searchQuery);
    // Implement your search logic here
  } else {
    console.log('Please enter a search query.');
  }
  this.currentPage = 1;
  this.loadBlogs();
} 
}

