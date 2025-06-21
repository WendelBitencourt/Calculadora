FROM nginx:alpine

# Copiar arquivos do projeto para o diretório padrão do Nginx
COPY index.html /usr/share/nginx/html/
COPY css/style.css /usr/share/nginx/html/
COPY js/script.js /usr/share/nginx/html/js/

# Copiar configuração do Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]