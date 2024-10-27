import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  private async performSearch(
    index: string,
    keyword: string,
    fields: string[],
  ) {
    if (!keyword || keyword.length < 1) {
      throw new BadRequestException('검색어를 입력해주세요');
    }

    try {
      const result = await this.esService.search({
        index,
        body: {
          query: {
            bool: {
              should: fields.map((field) => ({
                match: {
                  [field]: {
                    query: keyword,
                    // analyzer: 'ngram_analyzer',
                  },
                },
              })),
            },
          },
        },
      });

      const hits = result.body.hits.hits;

      if (hits.length === 0) {
        return { message: '검색 결과가 없습니다' };
      }

      return hits.map((item) => ({
        ...fields.reduce((acc, field) => {
          acc[field] = item._source[field];
          return acc;
        }, {}),
        score: item._score,
      }));
    } catch (error) {
      console.error(error);
      throw new BadRequestException('검색 중 오류가 발생했습니다');
    }
  }

  public async searchFood(q: string) {
    const keyword = q?.search?.toString();
    return this.performSearch('indexfood', keyword, [
      'food_name',
      'food_notice',
      'food_imageurl',
    ]);
  }

  public async searchFitness(q: string) {
    const keyword = q?.search?.toString();
    return this.performSearch('indexfitness', keyword, [
      'fitness_machine_name',
      'fitness_machine_notice',
      'fitness_machine_imageurl',
    ]);
  }
}
