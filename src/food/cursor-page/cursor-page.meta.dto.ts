// cursor-page.meta.dto.ts

import { CursorPageMetaDtoParameters } from './cursor-page-options-parameter.interface';

export class CursorPageMetaDto {
  readonly total: number;
  readonly take: number;
  readonly hasNextData: boolean;
  readonly cursor: number;

  constructor({
    cursorPageOptionDto,
    total,
    hasNextData,
    cursor,
  }: CursorPageMetaDtoParameters) {
    this.take = cursorPageOptionDto.take;
    this.total = total;
    this.hasNextData = hasNextData;
    this.cursor = cursor;
  }
}
