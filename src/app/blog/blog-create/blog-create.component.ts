import { Component, OnInit } from '@angular/core';
import {  AbstractControl,  FormBuilder,  FormGroup,  FormControl,  Validators} from '@angular/forms'; 
import { BlogService } from '../../services/blog/blog.service';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-blog-create',
  standalone: false,
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css'
})
export class BlogCreateComponent implements OnInit { 
  public imageUrl = environment.imageUrl;
  value: any;
  blogForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    shortContent: new FormControl(''),
    postContent: new FormControl(''),
    blogImage: new FormControl(''), 
  });
  formSubmitted: boolean = false;
  formDataRespo: any;
  blogList: any;
  model: any = {};
  querySuccess: boolean = false; 
  blogStatusList: any[] = [];
  selectedFile: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  currentUserId = sessionStorage.getItem('UserId');
  constructor(
    private fb: FormBuilder,
    private router: Router,  
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {
    this.blogList = [];   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.blogForm.controls;
  }

  ngOnInit() {
    this.blogForm = this.fb.group({
      id: [null],
      title: [
        null,
        [Validators.required, Validators.min(5), Validators.max(100)],
      ],
      shortContent: [
        null,
        [Validators.required, Validators.min(5), Validators.max(200)],
      ],
      postContent: [
        null,
        [Validators.required, Validators.min(5), Validators.max(2000)],
      ],
      blogImage: [null],   
    });  
    this.route.paramMap.subscribe(params => {
      const value = params.get('value');
      console.log('Value from route:', value);
    });
    this.value = this.route.snapshot.paramMap.get('value');
    if(this.value != null)
    {
      this.GetBlogById(this.value);
    } 
  }

  GetBlogById(value: any) {
    this.blogService.GetBlogById(value).subscribe(data => { 
      this.formDataRespo = data;
      console.log(" GetBlogById res" + JSON.stringify(this.formDataRespo));
      this.blogForm.setValue({
        id: this.formDataRespo.id,
        title: this.formDataRespo.title,
        shortContent: this.formDataRespo.shortContent,
        postContent: this.formDataRespo.postContent,  
        blogImage: this.formDataRespo.image 
      });
    });
  }

  validateNotZero(control: any) {
    return control.value === '0' ? { invalidSelection: true } : null;
  }

  
  onSubmit(): void { 
    this.formSubmitted = true;

    if (this.blogForm.invalid) {
      console.log('invalid');
      return;
    }
    
    console.log(JSON.stringify(this.blogForm.value));
    console.log('currentUserId   ' + this.currentUserId);
    if (this.blogForm.value.id != null) {
      this.model.id = parseInt(this.blogForm.value.id);
    } else {
      this.model.id = 0;
    }
    this.model.title = this.blogForm.value.title;
    this.model.shortContent = this.blogForm.value.shortContent;
    this.model.postContent = this.blogForm.value.postContent;   
    this.model.File = this.selectedFile; 

    const formData = new FormData();
    if (this.blogForm.value.id != null) {
      formData.append('id', this.blogForm.value.id);
    } else {
      formData.append('id', '0');
    }
    formData.append('title', this.blogForm.value.title);
    formData.append('shortContent', this.blogForm.value.shortContent);
    formData.append('postContent', this.blogForm.value.postContent);   
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.warn('No file selected, skipping file append.');
    }
    if (this.currentUserId) {
      formData.append('userId', this.currentUserId);
    }  
    // this.createBlogService.SubmitBlog(formData).subscribe(res => {
    //   this.querySuccess = true;
    //   this.blogForm.reset();
    // })

    this.blogService.SubmitBlog(formData).subscribe({
      next: (response) => {
        console.log('Response from API:', response); 
        if (response.id > 0) {
          this.successMessage = response.message;
          console.log(response.message);
          this.querySuccess = true;
          this.router.navigate(['/blog-listing']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        console.error('SubmitBlog Error from API:', err);
        this.errorMessage = err;
      },
    });

     this.formSubmitted = false;
    // this.blogForm.reset()
    // ;
  }
  onFileSelect(event: any) { 
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; 
    }
  }
}
