import { Injectable } from '@nestjs/common';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { generateClerkUsers } from '../faker/fake';
@Injectable()
export class UserService {
  findAll() {
    return clerkClient.users.getUserList({ offset: 0, limit: 500 });
  }

  findOne(id: string) {
    return clerkClient.users.getUser(id);
  }

  remove(id: string) {
    return clerkClient.users.deleteUser(id);
  }

  async seed(n: number) {
    const users = generateClerkUsers(n);
    await Promise.all(users.map((user) => clerkClient.users.createUser(user)));
    return await clerkClient.users.getCount();
  }

  async removeSeed() {
    const users = await clerkClient.users.getUserList({
      offset: 0,
      limit: 500,
    });
    const userIDs = users.data.map((user, id) => id > 0 && user.id);
    await Promise.all(userIDs.map((id) => clerkClient.users.deleteUser(id)));
    return await clerkClient.users.getCount();
  }
}
