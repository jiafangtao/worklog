export TAG=$(git log -1 --pretty=format:%h)
echo "Use git hash as tag: $TAG"

echo $1

if [ "package" == "$1" ]; then
    vite build
    docker build -t worklog-vue:$TAG .
    docker tag worklog-vue:$TAG worklog-vue:latest
elif [ "run" == "$1" ]; then
    docker run -it -d --rm --name worklog -p 9000:80 worklog-vue:latest
elif [ "stop" == "$1" ]; then
    docker stop worklog
elif [ "publish" == "$1" ]; then
    docker tag worklog-vue:$TAG brucejia/worklog:vue.$TAG
    docker tag worklog-vue:$TAG brucejia/worklog:vue.latest
    docker push brucejia/worklog:vue.$TAG
    docker push brucejia/worklog:vue.latest
fi

echo done