import { Injectable } from '@nestjs/common';
import { clerkClient } from '@clerk/clerk-sdk-node';
@Injectable()
export class UserService {
  findAll() {
    return clerkClient.users.getUserList();
  }

  findOne(id: string) {
    return clerkClient.users.getUser(id);
  }
}
