#!/bin/bash
set -e

# Path for generated .env
ENV_FILE=".env"
echo "Creating $ENV_FILE ..."

# Function to fetch secret and append to .env
fetch_secret() {
  local secret_name=$1
  local env_key=$2
  local value=$(gcloud secrets versions access latest --secret="$secret_name" 2>/dev/null || echo "")
  echo "$env_key=$value" >> $ENV_FILE
}

# Start fresh
> $ENV_FILE

# Server
fetch_secret "PORT" "PORT"
fetch_secret "NODE_ENV" "NODE_ENV"

# Database
fetch_secret "DATABASE_URL" "DATABASE_URL"

# Authentication
fetch_secret "GOOGLE_VERIFY_OAUTH_URL" "GOOGLE_VERIFY_OAUTH_URL"

# Security
fetch_secret "JWT_SECRET" "JWT_SECRET"

# GCP / Storage
fetch_secret "GCP_BUCKET_NAME" "GCP_BUCKET_NAME"
fetch_secret "GCP_PROJECT_ID" "GCP_PROJECT_ID"

# Docker creds
fetch_secret "DOCKER_IMAGE_NAME" "DOCKER_IMAGE_NAME"
fetch_secret "DOCKER_USERNAME" "DOCKER_USERNAME"
fetch_secret "DOCKER_PASSWORD" "DOCKER_PASSWORD"

# GCP Service Account JSON fields
fetch_secret "type" "type"
fetch_secret "project_id" "project_id"
fetch_secret "private_key_id" "private_key_id"
fetch_secret "private_key_id" "private_key_id"
fetch_secret "client_email" "client_email"
fetch_secret "auth_provider_x509_cert_url" "auth_provider_x509_cert_url"
fetch_secret "client_x509_cert_url" "client_x509_cert_url"
fetch_secret "universe_domain" "universe_domain"

echo ".env file generated ✅"
