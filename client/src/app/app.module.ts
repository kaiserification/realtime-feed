import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedComponent } from './feed/feed.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';

const appRoutes: Routes = [
  { path: 'creer-article', component: FeedFormComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'feed', component: FeedComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FeedFormComponent,
    DashboardComponent,
    FeedComponent,
    PageNotFoundComponent,
    FlashMessageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
