#! /bin/bash -xe

if [[ -d ./dist ]]
then
  rm -rf ./dist
fi

mkdir ./dist

cp package*.json ./dist

cd ./dist || exit

npm ci --omit=dev

npm run build

zip -9 -q -r ./flight-info-aggregate-lambda.zip ./
