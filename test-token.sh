#!/bin/bash

# Replace this with your token
TOKEN="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"

echo "Testing Hugging Face API access..."
curl -s \
  -H "Authorization: Bearer $TOKEN" \
  "https://huggingface.co/api/whoami"