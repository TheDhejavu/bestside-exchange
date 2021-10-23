#!/bin/bash
# hostname=$(curl http://169.254.169.254/metadata/v1/hostname)
docker run -d -p 8000:8000 --name bestside-exchange thedejavu/bestside-exchange
