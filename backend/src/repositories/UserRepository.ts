import { getDbClient } from "./dbClient.js";

export class UserRepository {
  static async findByEmail(email: string) {
    return getDbClient().user.findUnique({
      where: { email },
    });
  }

  static async findById(id: string) {
    return getDbClient().user.findUnique({
      where: { id },
    });
  }
}
