FROM node:lts

# With the NODE_OPTIONS env variable we specify couple of default options for NodeJS which can be overwritten
# For what's --max-old-space-size=512? Check: https://komed-health.atlassian.net/wiki/spaces/PROD/pages/36831303/Kubernetes#NodeJS-containers
ENV NODE_ENV=dev \
	TZ=Europe/Belgrade \
	HOME=/home/app \
	NODE_OPTIONS="--max-old-space-size=512"

RUN mkdir -p $HOME
WORKDIR $HOME/

CMD ["npm", "run", "start:debug"]
