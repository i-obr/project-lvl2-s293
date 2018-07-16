install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

publish:
	npm publish

build:
	rm -rf dist
	npm run build

# test:
# 	npm test

# watch-test:
# 	npm run test -- --watch

lint:
	npm run eslint .

.PHONY: test
