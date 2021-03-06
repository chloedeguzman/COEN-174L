import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppRoutingModule } from './app-routing.module';
import { CourseService } from './services/course.service';
import { EquivCourseService } from './services/equiv_courses';
import { LocalCourseService } from './services/local_courses';
import { UserService } from './services/users';
import { ChangeService } from './services/changes';
import { SchoolService } from './services/schools';
import { ForeignCourseService } from './services/foreign_courses';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { CoursesComponent } from './components/courses.component';
import { EquivCoursesComponent } from './components/equiv_courses';
import { LocalCoursesComponent } from './components/local_courses';
import { UserComponent } from './components/users';
import { ChangeComponent } from './components/changes';
import { SchoolComponent } from './components/schools';
import { ForeignCourseComponent } from './components/foreign_courses';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent,
    EquivCoursesComponent,
    LocalCoursesComponent,
    UserComponent,
    ChangeComponent,
    SchoolComponent,
    ForeignCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    Ng2SmartTableModule
  ],
  providers: [CourseService, EquivCourseService, LocalCourseService, UserService, ChangeService, SchoolService, ForeignCourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
