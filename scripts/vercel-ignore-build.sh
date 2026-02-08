#!/bin/bash

# Vercel Ignore Build Step script
# Restricts builds to the 'main' branch only.

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed (main branch)"
  exit 1;
else
  # Don't build
  echo "🛑 - Build cancelled (not building branch: $VERCEL_GIT_COMMIT_REF)"
  exit 0;
fi
