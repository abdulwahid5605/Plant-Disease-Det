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

@Controller()
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  // ✅ ADD PLANT (WITH IMAGE)
  @UseGuards(JwtAuthGuard)
  @Post('plant')
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
  createPlant(
    @UploadedFile() file: any,   // 🔥 ONLY CHANGE
    @Body() body: any,
    @Req() req: any,
  ) {
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

  // ✅ GET ALL PLANTS (PUBLIC)
  @Get('plants')
  getAllPlants() {
    return this.plantsService.getAllPlants();
  }

  // ✅ GET MY PLANTS (AUTH)
  @UseGuards(JwtAuthGuard)
  @Get('plants/my')
  getMyPlants(@Req() req: any) {
    return this.plantsService.getMyPlants(req.user.userId);
  }

  // ✅ UPDATE PLANT
 @UseGuards(JwtAuthGuard)
@Patch('plant/:id')
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

  // 🔥 image sirf tab update hogi jab new file aaye
  if (file) {
    updateData.image = file.filename;
  }

  return this.plantsService.updatePlant(
    plantId,
    req.user.userId,
    updateData,
  );
}


  // ✅ DELETE PLANT
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
