from python:3

RUN python -m pip install --upgrade pip

WORKDIR /app

COPY ./app/requirements.txt .

RUN python -m pip install -r ./requirements.txt

COPY ./app .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
