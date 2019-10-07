FROM node:10.16-alpine
RUN apk add --no-cache git && \
    cd /home && \
    git clone https://github.com/t01090929/Midterm-Web-Design.git code && \
    cd code && \
    npm install && \
    rm -rf .git
CMD ["node", "/home/code/server.js"]