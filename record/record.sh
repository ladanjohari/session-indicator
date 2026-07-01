#!/bin/bash
# One-shot wrapper: starts a local server, runs the Playwright choreography,
# stops the server, then converts the .webm to .mp4.
#
# Run from the repo root:
#   bash record/record.sh

set -e
cd "$(dirname "$0")/.."  # always run from repo root

# Start local HTTP server on port 3456
npx serve . -p 3456 --no-clipboard &
SERVER_PID=$!
echo "Server started (PID $SERVER_PID) at http://localhost:3456"

# Give it a moment to bind
sleep 1

# Run the choreography
node record/choreography.js

# Stop the server
kill $SERVER_PID 2>/dev/null || true
echo "Server stopped."

# Convert webm → mp4
bash record/convert.sh
