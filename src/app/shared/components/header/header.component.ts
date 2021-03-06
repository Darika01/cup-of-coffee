import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // jeśli false to menu burger bara jest niewidoczne. Przy zmianie na true dla małych rozdzielczości pojawia się menu burger bara
  toggleBtn = false;

  // zmienna przechowująca stan użytkownika (zalogowany czy nie)
  isLoggedIn$: Observable<boolean>;

  categories = ['wszystkie', 'nauka', 'sztuka', 'filozofia', 'psychologia'];


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;

    // bez tego nie dało się zmieniać widok przy wyborze poszczególnych kategorii z menu nawigacji. Reseture za każdym razem url
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  // metoda wywoływana przy naciśnięciu na przycisk Wyloguj z menu nawigacji
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Metoda obsługująca click na icon bar
  toggle() {
    this.toggleBtn = !this.toggleBtn;
  }

  // zmiana icon bar w zależności od tego, czy menu jest otwarte czy zamknięte
  toggleIcon() {
    if (this.toggleBtn) {
      return 'fa fa-times';
    } else {
        return 'fa fa-bars';
    }
  }

  private navigationInterceptor(event: Event): void {
    if (this.toggleBtn) {
      if (event instanceof NavigationStart) {
        this.toggleBtn = false;
      }
    }
    
  }


}
