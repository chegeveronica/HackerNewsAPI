import { Module } from '@nestjs/common';
import { TopWordsController } from './app.controller';
import { HackerNewsService } from './app.service';

@Module({
  imports: [],
  controllers: [TopWordsController],
  providers: [HackerNewsService],
})
export class AppModule {}
