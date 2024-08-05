import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '안녕헬스지지ㅋㅋㅋ';
  }
}
