// user.model.ts
export class User {
  Name: string;
  Email: string;
  Password: string;

  constructor(name: string, email: string, password: string) {
    this.Name = name;
    this.Email = email;
    this.Password = password;
  }
}
