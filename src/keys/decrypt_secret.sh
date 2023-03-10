#!/bin/sh

# Decrypt the file
mkdir ~/secrets
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" --output ~/secrets/ec2_key.pem ${GITHUB_WORKSPACE}/src/keys/checkpoint-ec2-1-key.pem.gpg
chmod 700 ~/secrets/ec2_key.pem
