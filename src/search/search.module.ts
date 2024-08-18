import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { OpensearchModule } from 'nestjs-opensearch';

@Module({
  imports: [
    OpensearchModule.forRoot({
      node: process.env.ES_HOST,
      auth: {
        username: process.env.ES_USERNAME, // Elasticsearch 사용자 이름
        password: process.env.ES_PASSWORD, // Elasticsearch 비밀번호
      },
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
