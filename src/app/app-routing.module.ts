import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListingComponent } from './blog/blog-listing/blog-listing.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { BlogsComponent } from './home/blogs/blogs.component';
import { MyBlogComponent } from './blog/my-blog/my-blog.component';

const routes: Routes = [ 
  { path: '', component: BlogsComponent },
  { path: 'my-blog', component: MyBlogComponent },
  { path: 'blog-listing', component: BlogListingComponent },
  { path: 'blog-create', component: BlogCreateComponent },
  { path: 'blog-create/:value', component: BlogCreateComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: '**', redirectTo:'/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
