import { Injectable } from '@nestjs/common';

import { InjectOpensearchClient, OpensearchClient } from 'nestjs-opensearch';

@Injectable()
export class SearchService {
  constructor(
    //@InjectOpensearchClient('foo')
    private readonly esService: OpensearchClient,
  ) {}

  async search(q: string) {
    console.log(q);
    try {
      const result = await this.esService.search({
        index: '.kibana',
        body: {
          query: {
            match: { 'visualization.title': 'Sales' },
          },
          // sort: [{ timestamp: { order: 'desc' } }],
        },
      });

      let arr = result.body.hits.hits;
      //console.log(result);

      console.log(arr);
      return arr; // 결과에서 문서들 추출
    } catch (e) {
      console.error(e);
    }
  }
}
