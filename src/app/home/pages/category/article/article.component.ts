import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { Article } from '../../../../core/models/article.model';
import { ArticleService } from '../../../../core/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;

  isLiked: boolean = false;
  isFavorite: boolean = false;

  artLink: string;
  artColor: boolean;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { 

    // let artId: number = parseInt(this.route.snapshot.params['articleId']);
    let artTitle: string = this.route.snapshot.params['title'];
    // let artrId: string = artId.toExponential();
    this.articleService.getHttpArticleObsById(artTitle).subscribe(
      (article: Article) => {
        this.article = article;
        console.log("Artykuł: ", this.article);
      },
      error => {
        console.log(error);
      }
    )

    //this.article = articleService.getArticleObsById(artId);

  }

  ngOnInit() {
  }

  // getBgrUrl() {
  //   console.log(this.article.link);
  //   let artLink = this.article.link;
  //   // return 'url(`${this.article.link}`)';
  //   return  'url(' + this.article.link + ')';
  //   // return "url(./assets/img/image2.jpg)";
  // }
  ngOnChanges() {
    // if (this.article.link.includes('#')) {
    //   this.artColor = true;

    // } else {
    //   this.artColor = false;

    // }
  }

  checkBgr() {
    this.artLink = this.article.link;
    if (this.artLink.includes('#')) {
      console.log("color: ", this.artLink, this.artColor);
      return {
        'background-color': this.artLink
      };
    } else {
      // this.artLink = this.article.link;
      console.log("link: ", this.artLink, this.artColor);
      this.artColor = false;
      return  {
        'background-image': 'url(' + this.article.link + ')'
      };
    }
  }

  onLike() {
    console.log(this.isLiked);
    this.isLiked = !this.isLiked;
    
  }

  onFavorite() {
    console.log(this.isFavorite);
    this.isFavorite = !this.isFavorite;
    
  }

}
