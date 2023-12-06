export interface LoginType {
    email: string;
    password: string;
}
export interface PrivateProps {
    roles: ("ADMIN" | "BUYER" | "VENDOR" )[];
  }

export interface SignupType extends LoginType {
    
}


export interface ProductType {
    author: AuthorType;
    authorId:number;
    category: CategoryType;
    categoryId:number;
    createdAt:Date;
    id:number;
    published: boolean;
    title:string;
    updatedAt : Date;
}

export interface CategoryType {
    id:number;
    name:string;
    createdAt:Date;
}

export interface AuthorType{
    
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "BUYER" | "VENDOR";
  createdAt: Date;
  products: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    authorId: number;
    author?: any;
    categoryId: number;
    category?: {
      id: number;
      createdAt: Date;
      name: string;
    };
  }[];
  image: string;
}