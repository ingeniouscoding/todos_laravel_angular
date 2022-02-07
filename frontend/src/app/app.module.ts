import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WithCredentialsInterceptor } from './modules/app-root/interceptors/with-credentials.interceptor';
import { AddHeadersInterceptor } from './modules/app-root/interceptors/add-headers.interceptor';
import { TodosModule } from './modules/todos/todos.module';
import { PageNotFoundComponent } from './modules/app-root/pages/page-not-found/page-not-found.component';
import { UserModule } from './modules/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TodosModule,
    UserModule,
    AppRoutingModule,
    HammerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
