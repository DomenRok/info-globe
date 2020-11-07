# set base image (host OS)
FROM node

# set the working directory in the container
WORKDIR  /code
# copy the dependencies file to the working directory
# install dependencies

COPY package*.json ./

WORKDIR /code/frontend/dragonhack-sinergise/

RUN npm install

CMD npm run serve

