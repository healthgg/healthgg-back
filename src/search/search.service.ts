import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  canBeChoseong,
  canBeJongseong,
  canBeJungseong,
  getChoseong,
} from 'es-hangul';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  public async searchFood(q: string) {
    const { search } = q;
    const stringSearch: string = search.toString();

    if (!search || search.length < 1) {
      throw new BadRequestException('검색어를 입력해주세요');
    }

    const keyword = stringSearch;
    console.log(keyword);
    try {
      const result = await this.esService.search({
        index: 'indexfood',
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    food_name: {
                      query: keyword,
                      //analyzer: 'ngram_analyzer',
                    },
                  },
                },
                {
                  match: {
                    food_notice: {
                      query: keyword,
                      // analyzer: 'ngram_analyzer',
                    },
                  },
                },
              ],
            },
          },
        },
      });

      const hits = result.body.hits.hits;

      if (hits.length === 0) {
        throw new BadRequestException('검색 결과가 없습니다');
      }

      return hits.map((item) => ({
        food_name: item._source.food_name,
        food_notice: item._source.food_notice,
        food_imageurl: item._source.food_imageurl,
        score: item._score,
      }));
    } catch (error) {
      console.error(error);
      throw new BadRequestException('검색 중 오류가 발생했습니다');
    }
  }

  public async searchFitness(q: string) {
    const { search } = q;
    const stringSearch: string = search.toString();
    if (!q.search) {
      throw new BadRequestException('검색어를 입력해주세요');
    }
    if (!search || search.length < 1) {
      throw new BadRequestException('검색어를 입력해주세요');
    }

    const keyword = stringSearch;
    console.log(keyword);
    try {
      const result = await this.esService.search({
        index: 'indexfitness',
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    finess_machine_name: {
                      query: keyword,
                      //analyzer: 'ngram_analyzer',
                    },
                  },
                },
                {
                  match: {
                    finess_machine_notice: {
                      query: keyword,
                      // analyzer: 'ngram_analyzer',
                    },
                  },
                },
              ],
            },
          },
        },
      });

      const hits = result.body.hits.hits;
      if (hits.length === 0) {
        throw new BadRequestException('검색 결과가 없습니다');
      }

      console.log(hits);
      return hits.map((item) => ({
        finess_machine_name: item._source.finess_machine_name,
        finess_machine_imageurl: item._source.finess_machine_imageurl,
        finess_machine_notice: item._source.finess_machine_notice,
        score: item._score,
      }));
    } catch (e) {
      console.error(e);
      throw new BadRequestException('검색 중 오류가 발생했습니다');
    }
  }
}
