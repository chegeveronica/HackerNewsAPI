import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class HackerNewsService {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0/';

  async getNewStories(): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/newstories.json`);
    const data = await response.json();
    // console.log(data);
    return data;
  }
  async getStoryDetails(storyId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/item/${storyId}.json`);
    const data = await response.json();
    return data;
  }

  async getStoriesFromLastWeek(): Promise<number[]> {
    const oneWeekAgo = moment().subtract(1, 'weeks').startOf('week').unix();
    const response = await fetch(`${this.baseUrl}/newstories.json`);
    const data = await response.json();
    return data.filter((id) => this.hackerNewsTimeDetails(id, oneWeekAgo));
 }

 private hackerNewsTimeDetails(storyId: number, Timestamp: number): Promise<boolean> {
  return fetch(`${this.baseUrl}/item/${storyId}.json`)
    .then((response) => response.json())
    .then((story) => story && story.time && story.time > Timestamp);
}

  async getStoriesByKarmaThreshold(karmaThreshold: number): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/users.json`);
    const data = await response.json();
  
    const userIds = Object.keys(data).filter((id) => data[id].karma >= karmaThreshold);
    const stories = [];
    for (const userId of userIds) {
      const userSubmitted = await fetch(`${this.baseUrl}/user/${userId}/submitted.json`);
      const submittedStories = await userSubmitted.json();
      stories.push(...(submittedStories || []));
    }
    return stories;
  }

}

