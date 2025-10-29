🚀 Quick Deploy (Production)

1. Prerequisites

Ensure docker and docker-compose are installed on your server.

Point your domain's (YOUR-DOMAIN.com) A-record to your server's IP.

Create a .env file from .env.example and fill in your production values (especially DOMAIN=YOUR-DOMAIN.com).

2. Step 1: Get SSL Certificate (First-time only)

Temporarily edit your docker-compose.yml:

In the nginx service volumes section:

Change ./nginx/nginx.prod.conf to ./nginx/nginx.init.conf.

Start only Nginx:

docker-compose up -d nginx

Run Certbot (replace with your email and your domain):

docker run -it --rm \
 -v application_certbot_conf:/etc/letsencrypt \
 -v application_certbot_www:/var/www/certbot \
 certbot/certbot certonly \
 --webroot -w /var/www/certbot \
 -d eventmanagement.duckdns.org \
 -m YOUR-EMAIL@example.com \
 --agree-tos \
 --no-eff-email
Stop the temporary Nginx:

docker-compose down

3. Step 2: Launch Application

Revert your docker-compose.yml change:

In the nginx service, change ./nginx/nginx.init.conf back to ./nginx/nginx.prod.conf.

Launch the entire application stack:

docker-compose up -d --build

Your site is now live at https://YOUR-DOMAIN.com. Certificates will renew automatically.
