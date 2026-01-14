import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

async createUser(data: any) {
  return this.userModel.create(data); 
}


  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
