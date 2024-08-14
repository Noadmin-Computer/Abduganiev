import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Importing Modules
import { AboutBannerModule } from './about/about-banner/about-banner.module';
import { AboutWhyModule } from './about/about-why/about-why.module';
import { PartnersModule } from './about/partners/partners.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './auth/users.module';
import { ContactModule } from './contact/contact.module';
import { MainServiceModule } from './main-service/main-service.module';
import { MainModule } from './main/main.module';
import { MediaModule } from './media/media.module';
import { PortfolioMainModule } from './portfolio-main/portfolio-main.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ServicesModule } from './services/services.module';
import { WhoWeModule } from './who-we/who-we.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/api/uploads',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb+srv://gaynutdinovasliddin:codecoffee09@cluster0.j4y7f.mongodb.net/',
    ),
    AuthModule,
    UsersModule,
    MediaModule,
    MainModule,
    PartnersModule,
    WhoWeModule,
    MainServiceModule,
    ReviewsModule,
    AboutBannerModule,
    AboutWhyModule,
    ServicesModule,
    PortfolioMainModule,
    PortfolioModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
