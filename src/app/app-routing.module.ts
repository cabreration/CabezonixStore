import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainComponent } from './main/main.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'pagos', component: CheckoutComponent },
  { path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ AppComponent,
                                   MainComponent,
                                   CheckoutComponent,
                                   ChatComponent ]
