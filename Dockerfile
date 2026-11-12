# Site estático da exposição servido pelo nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html style.css app.js dados.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80
