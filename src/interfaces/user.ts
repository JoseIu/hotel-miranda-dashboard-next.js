export interface User {
  id: string;
  name: string;
  created_at: Date;
  email: string;
  phone: string;
  status: boolean;
  jog_description: string;
  user_image: string;
}

export interface NewUser {
  name: string;
  email: string;
  phone: string;
  status: boolean;
  jog_description: string;
  user_image: string;
}
