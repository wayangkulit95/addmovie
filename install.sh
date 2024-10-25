#!/bin/bash

# Set the project directory (change this if necessary)
PROJECT_DIR="vod"

# Clone the repository if it doesn't exist
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Cloning the repository..."
    git clone https://your-repo-url.git $PROJECT_DIR
else
    echo "Project directory already exists. Pulling latest changes..."
    cd $PROJECT_DIR
    git pull
fi

# Change into the project directory
cd $PROJECT_DIR

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js before proceeding."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm before proceeding."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the server
echo "Starting the server..."
npm start &

# Wait for the server to start
sleep 5

# Notify user
echo "Server is running at http://localhost:3000"
echo "Access the M3U playlist at http://localhost:3000/api/playlist.m3u"
