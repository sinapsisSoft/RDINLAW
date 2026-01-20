FROM nginx:latest
COPY src /usr/share/nginx/php/RDLAW
COPY nginx.conf /etc/nginx/nginx.conf
