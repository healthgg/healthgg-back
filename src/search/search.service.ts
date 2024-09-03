import { BadRequestException, Injectable } from '@nestjs/common';
import { OpensearchClient } from 'nestjs-opensearch';
import {
  canBeChoseong,
  canBeJongseong,
  canBeJungseong,
  getChoseong,
} from 'es-hangul';

@Injectable()
export class SearchService {
  constructor(private readonly esService: OpensearchClient) {}

  public async searchFood(q: string) {
    const { search } = q;
    const stringSearch: string = search.toString();
    const IsChoseong: Boolean = canBeJongseong(stringSearch);

    if (!search || search.length < 1) {
      throw new BadRequestException('검색어를 입력해주세요');
    }

    if (IsChoseong) {
    }

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

    if (arr.length === 0) {
      throw new BadRequestException('검색 결과가 없습니다');
    }
    arr.map((item) => {
      results.push({
        food_name: item._source.food_name,
        food_notice: item._source.food_notice,
        food_imageurl: item._source.food_imageurl,
        score: item._score,
      });
    });
    return results; // 결과에서 문서들 추출
  }

  public async searchFitness(q: string) {
    if (!q.search) {
      throw new BadRequestException('검색어를 입력해주세요');
    }
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

    if (arr.length === 0) {
      throw new BadRequestException('검색 결과가 없습니다');
    }

    arr.map((item) =>
      results.push({
        finess_machine_name: item._source.finess_machine_name,
        finess_machine_imageurl: item._source.finess_machine_imageurl,
        finess_machine_notice: item._source.finess_machine_notice,
        score: item._score,
      }),
    );

    return results;
  }
}
