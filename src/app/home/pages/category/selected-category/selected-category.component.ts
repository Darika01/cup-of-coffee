import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs';

import { Article } from '../../../../core/models/article.model';
import { ArticleService } from '../../../../core/services/article.service';

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedCategoryComponent implements OnInit {
  
  articles: Article[] = [];

  category: string;

  showFour: boolean = false;
  // private subscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private articleService: ArticleService, 
    public cdRef:ChangeDetectorRef) { 
    // this.articleService.getArticleObsByCategory
    //setTimeout(() => {
    // this.category = this.route.snapshot.params['category'];
    // if (this.category === 'wszystkie') {
    //   // this.subscription = 
    //   this.articleService.getHttpArticlesObs().subscribe((articles: Array<Article>) => {
    //       this.articles = articles;        
    //     },
    //     error => { 
    //       console.log("errrr "+error);
    //     }
    //   )
    //   // console.log("wszystkie: ", this.articles);

    // } 
    // else {
    //   // this.subscription = 
    //   this.articleService.getArticleObsByCategory(this.category).subscribe((articles: Array<Article>) => {
    //     this.articles = articles;
    //   });
      // console.log("articles: ", this.articles);
    //}
    // console.log("articles: ", this.articles);
    // console.log("category: ", this.category);
    // console.log("Kategoria: ", this.category);
    //})
    
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe((param: Params) => {
      this.category = param.get('category');
    });
    console.log("category: ", this.category);


    // this.articles = this.articleService.getArticleByCategory(this.category);
  }

  // ngAfterViewInit() {
  //   this.cdRef.detectChanges();
  //   console.log("articles: ", this.articles);
  // }

  // ngAfterContentChecked(): void {
  //   // this.cdRef.detectChanges();
  // }

  // ngOnDestroy() {
  //   // this.subscription.unsubscribe();
  // }

}
