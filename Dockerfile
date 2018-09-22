FROM node:latest
# Working directory for application
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i
COPY . .
# Binds to port 3000
EXPOSE 3000
# Creates a mount point
CMD ["npm", "run", "dev"]