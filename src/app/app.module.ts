import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { AuthInterceptorService } from './interceptors/auth-interceptor.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { AccountModule } from './account/account.module'; 
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { BlogListingComponent } from './blog/blog-listing/blog-listing.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { BlogsComponent } from './home/blogs/blogs.component';
import { MyBlogComponent } from './blog/my-blog/my-blog.component'; 

@NgModule({
  declarations: [
    AppComponent,  
    BlogListingComponent,
    BlogCreateComponent,
    HeaderComponent,
    FooterComponent,
    BlogsComponent,
    MyBlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    AppRoutingModule,
    AccountModule 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
