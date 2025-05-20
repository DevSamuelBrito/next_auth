export interface User {
    name: string;
    email: string;
    profilePicture: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}

export interface SimpleUser {
  name: string;
  email: string;
  username:string;
  profilePicture: string | null;
}
