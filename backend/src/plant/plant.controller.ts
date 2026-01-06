import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
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
  constructor(private plantsService: PlantsService) { }

  @UseGuards(JwtAuthGuard)
  @Post('plant')
  createPlant(@Body() dto: CreatePlantDto, @Req() req: any) {
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

  @UseGuards(JwtAuthGuard)
  @Patch('plant/:id')
  updatePlant(
    @Param('id') plantId: string,
    @Body() dto: any,
    @Req() req: any,
  ) {
    return this.plantsService.updatePlant(
      plantId,
      req.user.userId,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('plant/:id')
  deletePlant(
    @Param('id') plantId: string,
    @Req() req: any,
  ) {
    return this.plantsService.deletePlant(
      plantId,
      req.user.userId,
    );
  }
}
