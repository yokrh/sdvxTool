# sudo apt-get -install awscli
# sudo pip install --upgrade awscli
# aws --version
# mkdir lambda
# pip install BeautifulSoup4 -t lambda_function
## pip install --upgrade --force-reinstall BeautifulSoup4
cd ./lambda
zip -r lambda-sdvx-api-track-update.zip *
aws lambda --region ap-northeast-1 update-function-code --function-name sdvx-api-track-update --zip-file fileb://lambda-sdvx-api-track-update.zip
