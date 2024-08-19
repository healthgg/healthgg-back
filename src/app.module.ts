import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway/events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FitnessMachineModule } from './fitness_machine/fitness_machine.module';
import { BodyPartModule } from './body_part/body_part.module';
import { FoodModule } from './food/food.module';
import { NutrientModule } from './nutrient/nutrient.module';
import { ExerciseVolumeModule } from './exercise_volume/exercise_volume.module';
import { MainModule } from './main/main.module';
import { CacheModule } from '@nestjs/cache-manager';
//import { RedisModule } from '@liaoliaots/nestjs-redis';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }), // 환경 변수 모듈 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.*'],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    FitnessMachineModule,
    BodyPartModule,
    FoodModule,
    NutrientModule,
    ExerciseVolumeModule,
    MainModule,
    SearchModule,
    // RedisModule.forRoot({
    //   readyLog: true,
    //   config: {
    //     host: 'my-redis',
    //     port: 6379,
    //     //   password: 'bitnami'
    //   },
    //}),
    // TypeOrmModule.forFeature([
    //   FitnessMachineModel,
    //   foodModel,
    //   nutrientModel,
    //   ExerciseVolumeModel,
    //   BodyPartModel,
    // ]),
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
