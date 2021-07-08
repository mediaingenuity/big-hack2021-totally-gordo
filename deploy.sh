#!/bin/bash

yarn build

aws s3 sync --acl public-read public s3://bighack2021-totally-gordo