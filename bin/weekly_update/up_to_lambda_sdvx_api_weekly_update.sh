cd ./lambda
zip -r lambda-sdvx-api-weekly-update.zip *
aws lambda --region ap-northeast-1 update-function-code --function-name sdvx-api-weekly-update --zip-file fileb://lambda-sdvx-api-weekly-update.zip
