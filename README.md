# Raaijmakers.it

This repository contains the website and API for raaijmakers.it.

## Structure

```
.
├── website/              # Hugo static site
│   ├── content/         # Markdown content files
│   ├── themes/          # Hugo theme(s)
│   ├── static/          # Static assets
│   ├── public/          # Generated site (gitignored)
│   └── hugo.toml        # Hugo configuration
│
├── api/                 # ExpressJS API
│   ├── server.js        # Main API server
│   ├── package.json     # Node dependencies
│   └── .env            # Environment variables (gitignored)
│
├── scripts/             # Deployment and utility scripts
│   └── deploy.sh       # Main deployment script
│
├── deploy.config.sh     # Deployment configuration (gitignored)
└── README.md           # This file
```

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (for building the website)
- [Node.js](https://nodejs.org/) (for running the API)
- rsync (for deployment)
- SSH access to your deployment server

## Local Development

### Website

```bash
cd website
hugo server -D
```

Visit http://localhost:1313 to view the site.

### API

```bash
cd api
cp .env.example .env
# Edit .env with your configuration
npm install
node server.js
```

## Deployment

### Initial Setup

1. Copy the deployment configuration template:
   ```bash
   cp deploy.config.sh.example deploy.config.sh
   ```

2. Edit `deploy.config.sh` and configure your server settings:
   - SSH credentials (user, host, port)
   - Remote paths for website and API
   - API service name (if using systemd)

3. Make the deployment script executable:
   ```bash
   chmod +x scripts/deploy.sh
   ```

4. Ensure your SSH key is set up for passwordless login:
   ```bash
   ssh-copy-id user@your-server.com
   ```

### Deploy

Deploy both website and API:
```bash
./scripts/deploy.sh
```

Deploy only the website:
```bash
./scripts/deploy.sh --website-only
```

Deploy only the API:
```bash
./scripts/deploy.sh --api-only
```

Skip Hugo build (use existing build):
```bash
./scripts/deploy.sh --skip-build
```

### How Deployment Works

1. **Website**: Hugo builds the site into `website/public/`, then rsync copies it to the remote server
2. **API**: rsync copies the API files (excluding node_modules, .env, etc.) to the remote server and runs `npm ci --production`

**Note for Plesk users**: After deployment, restart your Node.js application through:
- Plesk Panel: Domains > Your Domain > Node.js
- Or CLI: `plesk ext nodejs restart-app <domain>`

## Server Setup

### Plesk Setup

1. **Website**:
   - Hugo builds to `website/public/` which should be set as your document root in Plesk
   - Or set a specific subdomain for the static site

2. **API**:
   - Go to Domains > Your Domain > Node.js
   - Enable Node.js for your domain
   - Set Application Root to your API directory
   - Set Application Startup File to `server.js`
   - Configure environment variables in Plesk
   - Click "Enable Node.js" and "Restart App"

### Alternative: Nginx + systemd

If you're not using Plesk, here's a traditional setup:

**Website (Nginx)**:
```nginx
server {
    listen 80;
    server_name raaijmakers.it www.raaijmakers.it;
    root /var/www/raaijmakers.it;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

**API (systemd service)**:
```bash
# Create /etc/systemd/system/raaijmakers-api.service
sudo systemctl enable raaijmakers-api
sudo systemctl start raaijmakers-api
```

## Environment Variables

### API

Copy `.env.example` to `.env` and configure:
- Database credentials
- API keys
- Port settings
- etc.

**Important**: Never commit `.env` files to version control!

## License

Private project
