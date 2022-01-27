import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { MaterialModule } from './material/material.module';
import { QuestionModule } from './question/question.module';
import { OrganizationModule } from './organization/organization.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    UsersModule,
    ProfileModule,
    MaterialModule,
    QuestionModule,
    OrganizationModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
