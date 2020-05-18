export interface ICard {
  id: string;
  value: number;
  isOpen: boolean;
}

export interface IGame {
  id: number;
  user_id: number;
  score: number;
  time: number;
  uid: string;
  user: IUser;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: number;
  username: string;
  best_time: number;
  best_score: number;
  created_at: string;
  updated_at: string;
}

export interface IError {
  message: string;
}

export interface ISpinner {
  message: string;
}