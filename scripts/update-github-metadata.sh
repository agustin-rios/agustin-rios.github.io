#!/usr/bin/env bash
# Actualiza la metadata pública de la cuenta y los repos de agustin-rios:
# bio/ubicación/website del perfil, y descripción + topics + homepage por repo.
# Usa gh api (REST) directamente, compatible con cualquier versión de gh.
# Requiere: gh autenticado como agustin-rios (PATCH /user necesita scope "user").
set -uo pipefail

OWNER="agustin-rios"
FAILS=0
step() { echo; echo "→ $*"; }

edit_repo() { # edit_repo <repo> <descripción> [homepage]
  local repo="$1" desc="$2" homepage="${3:-}"
  if [ -n "$homepage" ]; then
    gh api -X PATCH "repos/$OWNER/$repo" -f description="$desc" -f homepage="$homepage" >/dev/null \
      || { echo "  ✗ falló PATCH $repo"; FAILS=$((FAILS+1)); }
  else
    gh api -X PATCH "repos/$OWNER/$repo" -f description="$desc" >/dev/null \
      || { echo "  ✗ falló PATCH $repo"; FAILS=$((FAILS+1)); }
  fi
}

set_topics() { # set_topics <repo> <topic1,topic2,...>  (reemplaza la lista completa)
  local repo="$1" topics="$2"
  local json
  json=$(python3 -c "import json,sys; print(json.dumps({'names': sys.argv[1].split(',')}))" "$topics")
  echo "$json" | gh api -X PUT "repos/$OWNER/$repo/topics" --input - >/dev/null \
    || { echo "  ✗ falló topics $repo"; FAILS=$((FAILS+1)); }
}

step "Perfil: bio, ubicación y website"
gh api -X PATCH /user \
  -f bio='Ingeniero de software | TypeScript, Python y cloud | Platform engineering, IAM (Keycloak) y MCP | PUC, Chile' \
  -f location='Santiago, Chile' \
  -f blog='https://agustin-rios.github.io' >/dev/null \
  || { echo "  ✗ falló PATCH /user (¿scope?): ejecuta  gh auth refresh -s user"; FAILS=$((FAILS+1)); }

step "agustin-rios.github.io"
edit_repo agustin-rios.github.io 'Sitio personal y portafolio — HTML/CSS/JS vanilla, sin build step' 'https://agustin-rios.github.io'
set_topics agustin-rios.github.io 'portfolio,github-pages,personal-website,vanilla-js'

step "platform-engineering-lab"
edit_repo platform-engineering-lab 'Lab personal de platform engineering: roadmap de 12 meses, plantillas ADR/postmortem y scaffold para una plataforma cloud-native local'
set_topics platform-engineering-lab 'platform-engineering,devops,kubernetes,gitops,sre,infrastructure-as-code,learning-roadmap'

step "Cururo"
edit_repo Cururo 'CLI en Python que automatiza revisiones de código con la API de OpenAI; integrable en GitHub Actions y publicada en PyPI'
set_topics Cururo 'code-review,openai,python,cli,github-actions,developer-tools,automation'

step "AegisFlows"
edit_repo AegisFlows 'IAM autohospedado con Keycloak 26 y PostgreSQL: realms dinámicos, secretos OAuth vía Admin API, temas custom y automatización Make'
set_topics AegisFlows 'keycloak,iam,identity-management,oauth2,oidc,sso,docker-compose,postgresql'

step "buda-spread-api"
edit_repo buda-spread-api 'API REST en TypeScript/Express que calcula spreads de mercados de Buda.com y gestiona alertas. Con Docker, Jest y CI'
set_topics buda-spread-api 'typescript,nodejs,express,rest-api,docker,jest,cryptocurrency,fintech'

step "product-dashboard"
edit_repo product-dashboard 'Dashboard de productos con Next.js (App Router) y arquitectura hexagonal ligera: KPIs, tabla paginada y detalle sobre DummyJSON'
set_topics product-dashboard 'nextjs,react,typescript,tailwindcss,dashboard,hexagonal-architecture'

step "investment_portfolio"
edit_repo investment_portfolio 'API REST en Django/DRF para valorizar portafolios de inversión: precios y pesos desde Excel, valor diario por activo'
set_topics investment_portfolio 'django,django-rest-framework,python,pandas,portfolio-management,fintech'

step "mcprisma"
edit_repo mcprisma 'Experimento: servidor/cliente MCP (Model Context Protocol) con Prisma ORM y SQLite en un monorepo con npm workspaces'
set_topics mcprisma 'mcp,model-context-protocol,prisma,nodejs,monorepo,sqlite'

step "urlshort-front"
edit_repo urlshort-front 'Frontend en Vue 3 + TypeScript + Vite para un acortador de URLs: enlaces cortos, clics y expiración vía API REST'
set_topics urlshort-front 'url-shortener,vue3,typescript,vite,frontend'

step "lib"
edit_repo lib 'Plantilla de API REST con Express, TypeScript y Prisma: Swagger, tests Jest por capas, Husky y validación de entorno'
set_topics lib 'express,typescript,prisma,boilerplate,template'

step "paneles"
edit_repo paneles 'Calculadora de paneles solares: heurística de empaquetado 2D con rotación, notebook Jupyter + app Flask'
set_topics paneles 'python,flask,jupyter-notebook,heuristics'

step "lector-obj-tweets"
edit_repo lector-obj-tweets 'Análisis en pandas del dataset Farmers Protest Tweets (Kaggle): top 10 de retweets, usuarios, días y hashtags'
set_topics lector-obj-tweets 'python,pandas,data-analysis,jupyter-notebook'

step "Emoji-Diet-Nutritional-Data"
edit_repo Emoji-Diet-Nutritional-Data 'Herramienta interactiva en D3.js para calcular valores nutricionales de una comida con el dataset Emoji Diet (Kaggle)'
set_topics Emoji-Diet-Nutritional-Data 'd3js,data-visualization,javascript,jupyter-notebook'

echo
if [ "$FAILS" -gt 0 ]; then
  echo "⚠ Terminado con $FAILS paso(s) fallido(s)."
else
  echo "✓ Metadata actualizada en perfil y 13 repos."
fi

# Opcionales (descomenta si quieres) — también vía API para compatibilidad:
#   Renombrar 'lib' a un nombre descriptivo:
# gh api -X PATCH "repos/$OWNER/lib" -f name='express-ts-prisma-starter'
#   Archivar repos de práctica antiguos para destacar lo vigente:
# gh api -X PATCH "repos/$OWNER/lector-obj-tweets" -F archived=true
# gh api -X PATCH "repos/$OWNER/Emoji-Diet-Nutritional-Data" -F archived=true
