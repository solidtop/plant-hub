type User = {
  _id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  plantIds: number[];
  save: () => Promise<void>;
  toJSON: () => { _id: string };
};

export default User;
