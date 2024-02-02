import { MicroBlogPost } from './microblog-post';

export class MicroBlogFeed {
  public title: string;
  public icon: string;
  public home_page_url: string;
  public feed_url: string;
  public items: MicroBlogPost[];
}
