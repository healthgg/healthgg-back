import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { visitor } from './entity/visitor.entity';
import { Repository } from 'typeorm';
import { CronJob } from 'cron';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(visitor)
    private readonly visitorRepository: Repository<visitor>,
  ) {}

  async getTotlaVisitor() {
    const result = await this.visitorRepository.findBy({
      id: 1,
    });
    return result[0].totalvistor;
  }

  async incrementVisitor(): Promise<void> {
    await this.visitorRepository.increment({ id: 1 }, 'totalvistor', 1);
  }

  // @Cron('* * * * * *')
  // async addVisitor() {}
}
