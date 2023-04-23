#!/bin/bash
# Wait for port to become awailable
echo "waiting for port"
while ! nc -z localhost 5432; do
echo "cheking port"
  sleep 0.1 # wait for 1/10 of the second before check again
done
echo "waiting port available"

#todo add timeout
npm run test:integration
