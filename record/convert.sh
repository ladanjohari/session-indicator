#!/bin/bash
# Converts the latest .webm from Playwright into a portfolio-ready .mp4.
# Run from the repo root or from record/:
#   bash record/convert.sh

set -e

RECORDINGS_DIR="$(dirname "$0")/recordings"
OUTPUT_DIR="$(dirname "$0")/output"
mkdir -p "$OUTPUT_DIR"

# Pick the most recently modified .webm
WEBM=$(ls -t "$RECORDINGS_DIR"/*.webm 2>/dev/null | head -1)
if [ -z "$WEBM" ]; then
  echo "No .webm found in $RECORDINGS_DIR — run choreography.js first."
  exit 1
fi

BASENAME=$(basename "$WEBM" .webm)
MP4="$OUTPUT_DIR/${BASENAME}.mp4"

echo "Converting: $WEBM"
echo "       → $MP4"

# -c:v libx264   H.264 video — widest browser/portfolio support
# -crf 18        Quality 0–51; 18 is visually lossless for screen recordings
# -pix_fmt yuv420p  Required for QuickTime + iOS compatibility
# -movflags +faststart  Puts metadata at front so video plays before fully downloaded
# -an            No audio track (screen recording has none)
ffmpeg -i "$WEBM" \
  -c:v libx264 \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  "$MP4"

echo ""
echo "✓ Done: $MP4"
echo "  File size: $(du -sh "$MP4" | cut -f1)"
