export type Item = {
  id: number;
  name: string;
  description: string;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  thumbnail: string;
}

export interface Message {
  id: number;
  from: User;
  message: string;
  date: string;
}
