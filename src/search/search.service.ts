import { Injectable } from '@nestjs/common';

import { OpensearchClient } from 'nestjs-opensearch';

@Injectable()
export class SearchService {
  constructor(private readonly esService: OpensearchClient) {}

  async searchFood(q: string) {
    try {
      let results = [];
      const keyword = q.search;
      const result = await this.esService.search({
        index: 'indexfood',
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    food_name: keyword,
                  },
                },
                {
                  match: {
                    food_notice: keyword,
                  },
                },
              ],
            },
          },
        },
      });

      let arr = result.body.hits.hits;

      arr.map((item) => {
        results.push({
          food_name: item._source.food_name,
          food_notice: item._source.food_notice,
          food_imageurl: item._source.food_imageurl,
          score: item._score,
        });
      });
      return results; // 결과에서 문서들 추출
    } catch (e) {
      console.error(e);
    }
  }

  async searchFitness(q: string) {
    try {
      let results = [];
      const keyword = q.search;
      const result = await this.esService.search({
        index: 'indexfitnessmachine',
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    finess_machine_name: keyword,
                  },
                },
                {
                  match: {
                    finess_machine_notice: keyword,
                  },
                },
              ],
            },
          },
        },
      });

      let arr = result.body.hits.hits;

      arr.map((item) =>
        results.push({
          finess_machine_name: item._source.finess_machine_name,
          finess_machine_imageurl: item._source.finess_machine_imageurl,
          finess_machine_notice: item._source.finess_machine_notice,
          score: item._score,
        }),
      );

      return results;
    } catch (e) {
      console.error(e);
    }
  }
}
