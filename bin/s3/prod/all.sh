aws s3 sync ../../../dist s3://sdvx/ --include "*"
aws s3 sync ../../track_update/data/ s3://sdvx/data/ --include "*.json"
