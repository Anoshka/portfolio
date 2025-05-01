import requests

# Paste your token here (it should start with "hf_")
token = "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"

print(f"Token starts with: {token[:4]}...")  # This will show "hf_..." to verify format

headers = {
    "Authorization": f"Bearer {token}"
}

print("\nTesting Hugging Face API access...")
response = requests.get(
    "https://huggingface.co/api/whoami",
    headers=headers
)

print(f"\nStatus code: {response.status_code}")
print(f"Response body: {response.text}")