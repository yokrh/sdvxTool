# SDVX fumen tool

## Prerequisite

* Node.js (recommended: ver 10.x)
* AWS cli (resommended: ver 2)
https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2-linux-mac.html
```sh
# install
curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-macos.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# check
aws2 --version

# configure credential
aws2 configure
```


## Update data

See package.json.

```sh
npm run update
```
