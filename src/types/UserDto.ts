type UserDTO = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  plantIds: number[];
};

export default UserDTO;
