import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        node: configService.get<string>('ES_HOST'),
        auth: {
          username: configService.get<string>('ES_USERNAME'), // Elasticsearch 사용자 이름
          password: configService.get<string>('ES_PASSWORD'), // Elasticsearch 비밀번호
        },
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,

        ssl: {
          // 개발 환경에서는 false, 프로덕션에서는 true로 설정
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
