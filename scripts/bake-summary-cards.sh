#!/usr/bin/env bash
# Bake static github-profile-summary-cards into the repo so the profile
# README does not depend on the rate-limited public Vercel API.
set -euo pipefail
export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:${PATH:-}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/profile-summary-card-output/github_dark"
BASE="https://github-profile-summary-cards.vercel.app/api/cards"
mkdir -p "$OUT"

download() {
  local name="$1" idx="$2" qs="$3"
  local out="$OUT/${idx}-${name}.svg"
  curl -sL -o "$out" "${BASE}/${name}?username=ml-lubich&theme=github_dark${qs}"
  if grep -q "ERROR!!!" "$out"; then
    echo "RATE_LIMITED $name"
    return 1
  fi
  echo "OK $out ($(wc -c <"$out" | tr -d ' ') bytes)"
}

download profile-details 0 ""
download repos-per-language 1 ""
download most-commit-language 2 ""
download stats 3 ""

ok_pt=0
for n in 1 2 3 4 5 6; do
  if download productive-time 4 "&utcOffset=-7"; then
    ok_pt=1
    break
  fi
  echo "retry productive-time ($n)…"
  sleep 10
done

if [[ "$ok_pt" -ne 1 ]]; then
  echo "writing fallback productive-time from public events"
  python3 "$ROOT/scripts/fallback_productive_time.py" "$OUT/4-productive-time.svg"
fi

if grep -q "ERROR!!!" "$OUT"/*.svg; then
  echo "ERROR: still have rate-limit cards" >&2
  exit 1
fi
echo "All cards ready in $OUT"
