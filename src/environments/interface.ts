export interface Enviroment {
  apiKey: string;
  production: boolean;
  fDBUrlL: string;
}

export interface Post {
  title: string;
  author: string;
  text: string;
  date: any;
  name?: string | undefined;
}
