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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import axios from 'axios';
import * as FormData from 'form-data';
import { readFileSync } from 'fs';
import { join } from 'path';


@Controller()
export class PlantsController {
  constructor(private plantsService: PlantsService) { }

  @UseGuards(JwtAuthGuard)
  @Post('plant')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )

  createPlant(@UploadedFile() file: any, @Body() body: any, @Req() req: any) {
    return this.plantsService.createPlant(
      {
        title: body.title,
        price: Number(body.price),
        quantity: Number(body.quantity),
        description: body.description,
        number: body.number,
        email: body.email,
        address: body.address,
        plantAge: Number(body.plantAge),
        image: file?.filename,
      },
      req.user.userId,
    );
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

  @Post('plant/detect')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueName =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      },
    }),
  }),
)
async detectDisease(@UploadedFile() file: any) {
  try {
    if (!file) {
      throw new Error('Image file not received by NestJS');
    }

    const imagePath = join(process.cwd(), 'uploads', file.filename);

    const formData = new FormData();
    formData.append(
      'image',
      readFileSync(imagePath),
      {
        filename: file.filename,
        contentType: file.mimetype,
      },
    );

    const response = await axios.post(
      'http://127.0.0.1:5000/predict',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 120000, // CNN slow hota hai
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('🔥 AI DETECT ERROR:', error?.response?.data || error.message);
    throw error;
  }
}


  @UseGuards(JwtAuthGuard)
  @Patch('plant/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  updatePlant(
    @Param('id') plantId: string,
    @UploadedFile() file: any,
    @Body() body: any,
    @Req() req: any,
  ) {
    const updateData: any = {
      title: body.title,
      price: Number(body.price),
      quantity: Number(body.quantity),
      description: body.description,
      number: body.number,
      email: body.email,
      address: body.address,
      plantAge: Number(body.plantAge),
    };

    if (file) {
      updateData.image = file.filename;
    }

    return this.plantsService.updatePlant(plantId, req.user.userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('plant/:id')
  deletePlant(@Param('id') plantId: string, @Req() req: any) {
    return this.plantsService.deletePlant(plantId, req.user.userId);
  }
}
