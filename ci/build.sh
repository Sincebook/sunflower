# This script should build frontend and pack it as "frontend.tar.gz" in the working directory.
# Working directory is guaranteed to be the root of the frontend project where package.json exists.

yarn install
yarn build

cd dist
tar zcvf ./../frontend.tar.gz .
cd ..
