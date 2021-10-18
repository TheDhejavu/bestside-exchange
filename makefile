VERSION ?= $(shell git describe --tags --always --dirty --match=v* 2> /dev/null || echo "1.0.0")

.PHONY: default
default: help

# Read More https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help: ## help information about make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install npm dependencies for the web service
	@echo "Installing Python dependencies"
	@python3 -m pip install -r requirements.txt

.PHONY: server
server: ## run the API server
	@echo "Starting API Server"
	@uvicorn app.main:app --reload

.PHONY: start
start: ## start docker compose
	@echo "Starting up docker compose"
	docker-compose up -d --remove-orphans --build 

.PHONY: stop
stop: ## stop docker compose
	@echo "Stopping docker compose"
	docker-compose down --remove-orphans --volumes

.PHONY: db-start
db-start: ## start the database server
	docker run --name bestside_exchange_mongodb  -d -p 27017:27017 mongo:latest 

.PHONY: db-stop
db-stop: ## stop the database server
	docker stop bestside_exchange_mongodb
	docker rm bestside_exchange_mongodb

.PHONY: redis-start
redis-start: ## start the redis server
	@docker run --rm --name bestside_exchange_redis -d -p 6379:6379 redis:latest

.PHONY: redis-stop
redis-stop: ## stop the redis server
	docker stop bestside_exchange_redis

.PHONY: version
version: ## display the version of the API server
	@echo $(VERSION)

.PHONY: test
test: ## run unit tests
	@echo "Running Test"
	@ENV_NAME=test python3 -m pytest -W ignore::DeprecationWarning 

.PHONY: test-cover
test-cover:  ## run unit tests and show test coverage information
	@ENV_NAME=test coverage run -m pytest