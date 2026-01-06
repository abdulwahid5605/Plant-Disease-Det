import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

export class CreatePlantDto {
  title: string;
  price: number;
  image?: string;
  description?: string;
}

@Controller()
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('plant')
  createPlant(@Body() dto: CreatePlantDto, @Req() req: any) {
    console.log('USER FROM JWT:', req.user);
    return this.plantsService.createPlant(dto, req.user.userId);
  }

  @Get('plants')
  getAllPlants() {
    return this.plantsService.getAllPlants();
  }

  @UseGuards(JwtAuthGuard)
  @Get('plants/my')
  getMyPlants(@Req() req: any) {
    return this.plantsService.getMyPlants(req.user.userId);
  }
}
