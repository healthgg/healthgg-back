import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './gateway/events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FitnessMachineModule } from './fitness_machine/fitness_machine.module';
import { BodyPartModule } from './body_part/body_part.module';
import { FoodModule } from './food/food.module';
import { NutrientModule } from './nutrient/nutrient.module';
import { ExerciseVolumeModule } from './exercise_volume/exercise_volume.module';
import { FitnessMachineModel } from './fitness_machine/entity/fitness_machine.entity';
import { foodModel } from './food/entity/food.entity';
import { nutrientModel } from './nutrient/entity/nutrient.entity';
import { ExerciseVolumeModel } from './exercise_volume/entity/exercise_volume.entity';
import { BodyPartModel } from './body_part/entity/body_part.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.*'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    FitnessMachineModule,
    BodyPartModule,
    FoodModule,
    NutrientModule,
    ExerciseVolumeModule,
    // TypeOrmModule.forFeature([
    //   FitnessMachineModel,
    //   foodModel,
    //   nutrientModel,
    //   ExerciseVolumeModel,
    //   BodyPartModel,
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
