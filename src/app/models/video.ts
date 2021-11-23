export class User{
    constructor(
      public id: number,
      public user_id: number,
      public title: string,
      public description: string,
      public url: string,
      public status: string,
      public created_at: string
    ){}
  }