import { ValidationArguments } from 'class-validator';

export const emptyValidationMessage = (args: ValidationArguments) => {
  if (args.constraints.length === 0) {
    return `${args.property}은 필수 입력값 입니다.`;
  } else {
    return `${args.property}는 최소 ${args.constraints[0]} 글자를 입력해주세요`;
  }
};
