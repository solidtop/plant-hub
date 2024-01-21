import User from "@/types/User";
import UserDTO from "@/types/UserDTO";

class UserConverter {
  static convertToDTO(user: User): UserDTO {
    return {
      id: user._id.toString(),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      plantIds: user.plantIds,
    };
  }
}

export default UserConverter;
