mkdir dist
cd dist
tar zxvf ./../frontend.tar.gz
cd ..
docker build -f ./ci/Dockerfile -t $IMAGE_REPO_PREFIX-dev01:$IMAGE_VER .
docker stop $CONTAINER_NAME_PREFIX-dev01 || true && docker rm $CONTAINER_NAME_PREFIX-dev01 || true
docker run -d -p 127.0.0.1:18890:80 --name $CONTAINER_NAME_PREFIX-dev01 $IMAGE_REPO_PREFIX-dev01:$IMAGE_VER
