import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(members: number): number {
    return members;
  }
}
