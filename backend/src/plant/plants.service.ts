import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Plant ,PlantDocument } from './schemas/plant.schema';

export class CreatePlantDto {
  title: string;
  price: number;
  quantity: number;
  description: string;
  number: string;
  email: string;
  address: string;
  plantAge: number;
  image?: string;
}

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name)
  private plantModel: Model<PlantDocument>,
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
      .find({ user: new Types.ObjectId(userId) })
      .populate('user', 'email')
      .sort({ createdAt: -1 });
  }

  async updatePlant(
    plantId: string,
    userId: string,
    dto: any,
  ) {
    const plant = await this.plantModel.findById(plantId);

    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    if (plant.user.toString() !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this plant',
      );
    }

    Object.assign(plant, dto);
    return plant.save();
  }

  async deletePlant(plantId: string, userId: string) {
    const plant = await this.plantModel.findById(plantId);

    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    if (plant.user.toString() !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this plant',
      );
    }

    await plant.deleteOne();
    return { message: 'Plant deleted successfully' };
  }
}
