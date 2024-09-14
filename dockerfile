# 단계 1: 빌드 단계
FROM node:20.9.0-alpine AS builder

# 작업 디렉터리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# npm 패키지 설치
RUN npm install

# 소스 코드 복사
COPY . .

# NestJS 빌드 (생략 가능: 개발 환경에서는 실시간 빌드로도 대체 가능)
# RUN npm run build

# 단계 2: 실행 단계 (개발용)
FROM node:20.9.0-alpine

# 작업 디렉터리 설정
WORKDIR /app

# 빌드 단계에서 생성된 파일 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY . .

# 개발 모드에서 서버를 실행할 포트
EXPOSE 3000

# 개발 모드로 실행 (hot-reloading 가능)
CMD ["npm", "run", "start:dev"]
