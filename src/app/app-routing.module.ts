import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogComponent} from "./pages/blog/blog.component";
import {BlogPageComponent} from "./pages/blog-page/blog-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'blog' ,pathMatch: 'full'},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/:id', component: BlogPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
