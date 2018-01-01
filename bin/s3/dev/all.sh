aws s3 rm s3://sdvxdev --recursive
aws s3 sync ../../../dist s3://sdvxdev/ --include "*" --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
aws s3 sync s3://sdvx/data s3://sdvxdev/data --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
