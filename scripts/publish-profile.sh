#!/usr/bin/env bash
# Crea (o actualiza) el repo especial agustin-rios/agustin-rios con el
# README de perfil que se muestra en https://github.com/agustin-rios
# Requiere: gh autenticado como agustin-rios.
set -euo pipefail

OWNER="agustin-rios"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/profile"
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

if ! gh api "repos/$OWNER/$OWNER" >/dev/null 2>&1; then
  echo "→ Creando repo $OWNER/$OWNER…"
  gh api user/repos -f name="$OWNER" -F private=false \
    -f description="README de perfil — https://github.com/$OWNER" >/dev/null
fi

echo "→ Clonando…"
gh repo clone "$OWNER/$OWNER" "$WORK_DIR/repo" -- --quiet
cp "$SRC_DIR/README.md" "$WORK_DIR/repo/README.md"

cd "$WORK_DIR/repo"
if git status --porcelain | grep -q .; then
  git add README.md
  git commit -q -m "Update profile README"
  git push -q
  echo "✓ Perfil publicado: https://github.com/$OWNER"
else
  echo "✓ Sin cambios: el README de perfil ya está al día."
fi

echo
echo "Nota: los repos pinneados no se pueden cambiar por API."
echo "Pinnea manualmente en https://github.com/$OWNER → 'Customize your pins':"
echo "  platform-engineering-lab, Cururo, AegisFlows, buda-spread-api, product-dashboard, agustin-rios.github.io"
