FROM node:18 AS builder
WORKDIR /home/node
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /home/node
ENV TUF_EXPLORER_ROOT_DIR=/etc/tuf-explorer/data
ENV TUF_EXPLORER_REPOS_ROOT_DIR_SUFFIX=repos
ENV TUF_EXPLORER_REPOS_KEY_INFO_DIR_SUFFIX=keyinfo
COPY --from=builder /home/node/build /home/node/build/
COPY --from=builder /home/node/package.json .
CMD ["node", "build"]
