#!/bin/bash
# 将 Cursor assets 中的 AI 图复制到 public/images/parts
ASSETS="${CURSOR_ASSETS:-$HOME/.cursor/projects/Users-simon-ma-ownproject-ai-car-master/assets}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/images/parts"
mkdir -p "$DEST"
for f in "$ASSETS"/*.png; do
  [ -f "$f" ] || continue
  cp "$f" "$DEST/$(basename "$f")"
  echo "copied $(basename "$f")"
done
echo "done -> $DEST"
