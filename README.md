## 🛠️ Development Quick Start

### 1. Environment

1.  Create a `.env` file from `.env.example`.
2.  Fill it with your **development** values (e.g., `ASPNETCORE_ENVIRONMENT=Development`, `DB_NAME=myapp_db_dev`, `DOMAIN=localhost`, `NGINX_PORT=80`).

### 2. Launch

1.  Run the development build:
    ```bash
    docker-compose -f docker-compose.dev.yml up --build
    ```
2.  The application will be available at `http://localhost` (or the port you specified in `NGINX_PORT`).
3.  Swagger UI will be available at `http://localhost/swagger/`.

---

## 🚀 Quick Deploy (Production)

### 1. Prerequisites

- Ensure `docker` and `docker-compose` are installed on your server.
- Point your domain's (`YOUR-DOMAIN.com`) A-record to your server's IP.
- Create a `.env` file from `.env.example` and fill in your **production** values (especially `DOMAIN=YOUR-DOMAIN.com`).

### 2. Step 1: Get SSL Certificate (First-time only)

1.  Temporarily edit your `docker-compose.yml`:

    - In the `nginx` service `volumes` section, change `./nginx/nginx.prod.conf` to `./nginx/nginx.init.conf`.

2.  Start only Nginx:

    ```bash
    docker-compose up -d nginx
    ```

3.  Run Certbot (replace with your email and your domain):

    ```bash
    docker run -it --rm \
     -v application_certbot_conf:/etc/letsencrypt \
     -v application_certbot_www:/var/www/certbot \
     certbot/certbot certonly \
     --webroot -w /var/www/certbot \
     -d eventmanagement.duckdns.org \
     -m YOUR-EMAIL@example.com \
     --agree-tos \
     --no-eff-email
    ```

4.  Stop the temporary Nginx:
    ```bash
    docker-compose down
    ```

### 3. Step 2: Launch Application

1.  Revert your `docker-compose.yml` change:

    - In the `nginx` service, change `./nginx/nginx.init.conf` back to `./nginx/nginx.prod.conf`.

2.  Launch the entire application stack:

    ```bash
    docker-compose up -d --build
    ```

3.  Your site is now live at `https://YOUR-DOMAIN.com`. Certificates will renew automatically.
