export interface ITodo {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  user: string;
  status: boolean;
  canva: ICanva;
}

export interface ICanva {
  _id: string;
  title: string;
  user: string;
  todos: ITodo[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  canva: ICanva[];
}
