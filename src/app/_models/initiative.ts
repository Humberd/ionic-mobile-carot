export interface Initiative {
  id: string;
  title: string;
  body: string;
  date_created: Date;
  date_edited: Date;
  is_edited: boolean;
  votes: number;
  author: Author;
  is_starred: boolean;
  user_vote: null;
}

export interface Author {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  badge: string;
}
