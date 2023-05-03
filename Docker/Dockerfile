FROM nginx:alpine
COPY ./dist/data-export-app /usr/share/nginx/html

COPY ./Docker/config/default.conf /etc/nginx/conf.d/

ARG builddate

LABEL build-date=$builddate

EXPOSE 80
