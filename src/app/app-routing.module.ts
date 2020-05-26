import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketsComponent } from './markets/markets.component';
import { CreateComponent } from './create/create.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { ClosedComponent } from './closed/closed.component';
import { FillsComponent } from './fills/fills.component';

const routes: Routes = [
  {path: '', component: SignupComponent},
  {path: 'create', component: CreateComponent},
  {path: 'markets', component: MarketsComponent},
  {path: 'markets/:id', component: OrderComponent},
  {path: 'closed', component: ClosedComponent},
  {path: 'payments', component: FillsComponent},
  {path: 'users/:user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
