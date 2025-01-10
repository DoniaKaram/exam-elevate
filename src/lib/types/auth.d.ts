declare type User = {
   
       _id: string,
        username: string,
        firstName:string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        isVerified: boolean,
        
  } & DatabaseFields;
  
  declare type LoginResponse = {
    token: string;
    user: User;
  };
  
  declare type RegisterFields = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    passwordConfirm: string;
  };