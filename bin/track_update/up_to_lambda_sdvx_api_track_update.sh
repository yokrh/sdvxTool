# rm -rf ~/.cache/pip/
# rm -rf ~/.local/lib/python2.7/site-packages/awscli-1.15.1.dist-info/
# sudo apt-get install awscli
# sudo pip install --upgrade awscli
# aws --version
# mkdir lambda
### delete some files to resolve 'Unzipped size must be smaller than 262144000 bytes'
cd ./lambda
rm lambda-sdvx-api-track-update.zip
zip -r lambda-sdvx-api-track-update.zip *
aws lambda --region ap-northeast-1 update-function-code --function-name sdvx-api-track-update --zip-file fileb://lambda-sdvx-api-track-update.zip
