aws s3 sync ../../track_update/data/ s3://sdvxdev/data/ --include "*.json" --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
