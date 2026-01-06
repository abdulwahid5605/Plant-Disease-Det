import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Plant } from './schemas/plant.schema';

export class CreatePlantDto {
  title: string;
  price: number;
  image?: string;
  description?: string;
}

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name) private plantModel: Model<Plant>,
  ) {}

  async createPlant(dto: CreatePlantDto, userId: string) {
    const plant = new this.plantModel({
      ...dto,
      user: new Types.ObjectId(userId),
    });
    return plant.save();
  }

  async getAllPlants() {
    return this.plantModel
      .find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
  }

  async getMyPlants(userId: string) {
    return this.plantModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
  }
}
