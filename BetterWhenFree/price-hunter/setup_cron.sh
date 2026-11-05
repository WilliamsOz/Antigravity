#!/usr/bin/env bash
# Script d'installation de la tâche de fond automatique pour PriceHunter sur macOS

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_EXEC="$DIR/.venv/bin/python"
CLI_EXEC="$DIR/cli.py"
LOG_FILE="$DIR/data/cron.log"
PLIST_NAME="com.betterwhenfree.pricehunter.plist"
LAUNCH_AGENTS_DIR="$HOME/Library/LaunchAgents"
PLIST_PATH="$LAUNCH_AGENTS_DIR/$PLIST_NAME"

echo "=================================================="
echo "⚡ Installation de la Tâche de Fond PriceHunter"
echo "=================================================="

mkdir -p "$DIR/data"
mkdir -p "$LAUNCH_AGENTS_DIR"

# Création du fichier LaunchAgent macOS (déclenchements à 08:00, 13:00 et 19:00)
cat << EOF > "$PLIST_PATH"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.betterwhenfree.pricehunter</string>
    <key>ProgramArguments</key>
    <array>
        <string>$PYTHON_EXEC</string>
        <string>$CLI_EXEC</string>
        <string>check</string>
    </array>
    <key>StartCalendarInterval</key>
    <array>
        <dict>
            <key>Hour</key>
            <integer>8</integer>
            <key>Minute</key>
            <integer>0</integer>
        </dict>
        <dict>
            <key>Hour</key>
            <integer>13</integer>
            <key>Minute</key>
            <integer>0</integer>
        </dict>
        <dict>
            <key>Hour</key>
            <integer>19</integer>
            <key>Minute</key>
            <integer>0</integer>
        </dict>
    </array>
    <key>StandardOutPath</key>
    <string>$LOG_FILE</string>
    <key>StandardErrorPath</key>
    <string>$LOG_FILE</string>
    <key>WorkingDirectory</key>
    <string>$DIR</string>
</dict>
</plist>
EOF

# Déchargement si déjà actif puis chargement
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"

echo "✅ Tâche de fond macOS activée avec succès !"
echo "🕒 Vérification automatique à 08:00, 13:00 et 19:00 chaque jour."
echo "📄 Logs disponibles dans : $LOG_FILE"
echo "Pour désactiver : launchctl unload $PLIST_PATH"
