import { CursorPageOptionsDto } from './cursor-page-option.dto';

export interface CursorPageMetaDtoParameters {
  cursorPageOptionDto: CursorPageOptionsDto;
  total: number;
  hasNextData: boolean;
  cursor: number;
}
