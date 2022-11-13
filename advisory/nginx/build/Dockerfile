FROM nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN mkdir /etc/nginx/certs/
COPY ./fullchain.pem /etc/nginx/certs/
COPY ./privkey.pem /etc/nginx/certs/

ENTRYPOINT ["nginx", "-g", "daemon off;"]

