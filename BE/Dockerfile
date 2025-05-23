# 1. Chọn base image
FROM node:18-alpine

# 2. Tạo thư mục làm việc trong container
WORKDIR /app

# 3. Copy package.json và package-lock.json để cài dependencies
COPY package*.json ./

# 4. Cài dependencies
RUN npm install --production

# 5. Copy toàn bộ source code vào container
COPY . .

# 6. Mở cổng ứng dụng
EXPOSE 3000

# 7. Lệnh chạy app khi container khởi động
CMD ["node", "index.js"]


