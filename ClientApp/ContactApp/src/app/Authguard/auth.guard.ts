import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ContactsServiceService} from '../Service/contacts-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private contactService:ContactsServiceService,
    private router:Router
  ){}

  
  canActivate():boolean{
    if (this.contactService.allowNavigate()) {
      return true;
    } else {
      //redirected to main page
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
