FROM python:3.7-alpine
WORKDIR /backend


COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
