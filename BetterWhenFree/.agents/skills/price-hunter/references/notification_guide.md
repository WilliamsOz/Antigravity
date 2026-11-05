# Guide de Configuration des Notifications (Smartphone & Bureau)

PriceHunter peut envoyer des alertes instantanées dès qu'un prix baisse ou passe sous votre prix cible.

---

## 1. Notifications Bureau macOS (Activées par défaut)
Aucune configuration requise ! Le script envoie automatiquement des bannières macOS via le centre de notifications d'Apple avec effet sonore.

---

## 2. Notifications Discord (Sur Smartphone / PC)
1. Ouvrez Discord sur votre serveur (ou créez un serveur privé gratuit).
2. Allez dans les **Paramètres d'un salon** > **Intégrations** > **Webhooks** > **Nouveau Webhook**.
3. Copiez l'URL du Webhook.
4. Ouvrez `workdirectory/BetterWhenFree/price-hunter/config.json` et configurez :
```json
"discord": {
  "enabled": true,
  "webhook_url": "https://discord.com/api/webhooks/VOTRE_WEBHOOK_ICI"
}
```
5. Testez en exécutant :
```bash
./.venv/bin/python cli.py test-alert
```

---

## 3. Notifications Telegram (Sur Smartphone)
1. Sur Telegram, cherchez **@BotFather** et envoyez `/newbot`.
2. Donnez un nom à votre bot et copiez le `Token` fourni.
3. Lancez une conversation avec votre nouveau bot (cliquez sur `Démarrer`).
4. Pour récupérer votre `chat_id`, contactez le bot **@userinfobot** sur Telegram.
5. Ouvrez `workdirectory/BetterWhenFree/price-hunter/config.json` et configurez :
```json
"telegram": {
  "enabled": true,
  "bot_token": "VOTRE_TOKEN",
  "chat_id": "VOTRE_CHAT_ID"
}
```
6. Testez avec :
```bash
./.venv/bin/python cli.py test-alert
```
