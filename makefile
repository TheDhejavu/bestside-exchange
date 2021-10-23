VERSION ?= $(shell git describe --tags --always --dirty --match=v* 2> /dev/null || echo "1.0.0")

.PHONY: default
default: help

.PHONY: help
help: ## help information about make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: web
web: ## run the web frontend
	@cd frontend && npm run start

.PHONY: install
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

.PHONY: prod-start
prod-start: ## start prod docker compose
	@echo "Starting up docker compose"
	make prod-stop && docker-compose  -f docker-compose-prod.yml build --pull && docker-compose -f docker-compose-prod.yml up -d --remove-orphans

.PHONY: prod-stop
prod-stop: ## stop prod docker compose
	@echo "Stopping docker compose"
	docker-compose -f docker-compose-prod.yml down --remove-orphans

.PHONY: version
version: ## display the version of the API server
	@echo $(VERSION)

.PHONY: test
test: ## run unit tests
	@echo "Running Test"
	@APP_ENV=test python3 -m pytest -W ignore::DeprecationWarning 

.PHONY: test-cover
test-cover:  ## run unit tests and show test coverage information
	@APP_ENV=test coverage run -m pytest
