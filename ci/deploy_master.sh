mkdir dist
cd dist
tar zxvf ./../frontend.tar.gz
cd ..
docker build -f ./ci/Dockerfile -t $IMAGE_REPO_PREFIX-master:$IMAGE_VER .
docker stop $CONTAINER_NAME_PREFIX-master || true && docker rm $CONTAINER_NAME_PREFIX-master || true
docker run -d -p 127.0.0.1:18891:80 --name $CONTAINER_NAME_PREFIX-master $IMAGE_REPO_PREFIX-master:$IMAGE_VER
