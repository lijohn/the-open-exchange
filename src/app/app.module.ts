import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MarketsComponent } from './markets/markets.component';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';
import { SignupComponent } from './signup/signup.component';
import { SettlementComponent } from './settlement/settlement.component';

import { CookieService } from 'ngx-cookie-service';
import { UserComponent } from './user/user.component';
import { ClosedComponent } from './closed/closed.component';
import { FillsComponent } from './fills/fills.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MarketsComponent,
    OrderComponent,
    CreateComponent,
    SignupComponent,
    SettlementComponent,
    UserComponent,
    ClosedComponent,
    FillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
