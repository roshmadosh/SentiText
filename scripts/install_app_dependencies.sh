#!/bin/bash

sudo apt-get update
sudo apt-get -y install python3 python3-pip

cd /sentitext/src

sudo pip3 install --no-cache-dir -r requirements.txt