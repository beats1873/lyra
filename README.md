# Discord Bot Template

Bot Tempalte is a modular, scalable Discord bot built with `discord.js` and designed to support community features such as examples, tests, and more.

## Setup

### 1. Clone the Repository

```bash
git clone git@github.com:beats1873/bot_template.git
cd bot_template
```

### 2. Install Dependencies

```bash
npm install
npm install sqlite3 sqlite
```

### 3. Create a `.env` File

Create a `.env` file in the root directory based on `.env.example`:

```env
DISCORD_TOKEN=your-bot-token
CLIENT_ID=your-client-id
DEBUG=false
```

### 4. Make a directory for the database

```bash
mkdir data
```

## Running the Bot

### With PM2

```bash
pm2 start index.js --name "bot_template"
pm2 save
```

---

## Slash Command Deployment

After running the bot, deploy slash commands:

```bash
npm run deploy
```

This registers all slash commands globally. (May take up to 1 hour to propagate.)

## 📄 License

MIT License 
