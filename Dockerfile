# set base image (host OS)
FROM python:3.8

# set the working directory in the container
WORKDIR  /code
# copy the dependencies file to the working directory
# install dependencies
COPY requirements.txt /code

RUN pip install -r requirements.txt

CMD python app.py
