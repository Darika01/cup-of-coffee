import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';
import { HomeUsComponent } from './pages/home-us/home-us.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';

@NgModule({
  declarations: [
    AddArticleComponent, 
    UserAccountComponent, 
    CategoryComponent, 
    HomeUsComponent
  ],
  imports: [
    // CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }