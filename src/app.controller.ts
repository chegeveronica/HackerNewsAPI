import { Controller, Get } from '@nestjs/common';
import { HackerNewsService } from './app.service';

@Controller()
export class TopWordsController {
  constructor(private readonly hackerNewsService: HackerNewsService) {}

  @Get('topWords')
  async getTopWords(): Promise<string[]> {
    const stories = await this.hackerNewsService.getNewStories();
    const storyTitles = await Promise.all(
      stories.slice(0, 25).map((id) => this.hackerNewsService.getStoryDetails(id).then((story) => story.title || ''))
    );
    const wordCounts: { [key: string]: number } = {};
    for (const title of storyTitles) {
    // Extract words from title, split, and count occurrences
      const words = title.split(/\s+/) || [];
      for (const word of words) {
        wordCounts[word.toLowerCase()] = (wordCounts[word.toLowerCase()] || 0) + 1;
      }
    }
    // Sort word counts and return top 10
      const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
      return sortedWords.slice(0, 10).map(([word]) => word);
  }

  @Get('topWordsLastWeek')
  async getTopWordsFromLastWeek(): Promise<string[]> {
    console.log('Fetching stories from last week...');
    const posts = await this.hackerNewsService.getStoriesFromLastWeek();
    console.log('Fetched stories from last week...');
    const postTitles = await Promise.all(
      posts.map((id) => this.hackerNewsService.getStoryDetails(id).then((story) => story.title || ''))
    );
    console.log(postTitles)
    // console.log('hello world')
    const wordCounts: { [key: string]: number } = {};
    for (const title of postTitles) {
      const words = title.split(/\s+/) || [];
      for (const word of words) {
        wordCounts[word.toLowerCase()] = (wordCounts[word.toLowerCase()] || 0) + 1;
      }
    }
    const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 10).map(([word]) => word);
  } 

  @Get('highKarma')
  async getTopWordsFromHighKarmaUsers(karmaThreshold: number = 10000): Promise<string[]> {
    const stories = await this.hackerNewsService.getStoriesByKarmaThreshold(karmaThreshold);
    const storyTitles = await Promise.all(
      stories.slice(0, 600).map((id) => this.hackerNewsService.getStoryDetails(id).then((story) => story.title || ''))
    );
    const wordCounts: { [key: string]: number } = {};
    for (const title of storyTitles) {
      // Extract words from title, split, and count occurrences
      const words = title.split(/\s+/) || [];
      for (const word of words) {
        wordCounts[word.toLowerCase()] = (wordCounts[word.toLowerCase()] || 0) + 1;
      }
    }
    // Sort word counts and return top 10
    const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 10).map(([word]) => word);
  }
}