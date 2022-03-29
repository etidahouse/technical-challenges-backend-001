SHELL=/bin/bash

start-postgres:
	docker run -d \
		--rm \
		--name dev-postgres \
		-p 5432:5432  \
		-e TZ=CET \
		-e PGTZ=CET \
		-e POSTGRES_HOST=localhost \
		-e POSTGRES_DB=database \
		-e POSTGRES_USER=user \
		-e POSTGRES_PASSWORD=password \
		postgres

stop-postgres:
	docker stop dev-postgres

start-rabbitmq:
	docker run -d \
		--rm \
		--name dev-rabbitmq \
		-p 15672:15672 \
		-p 5672:5672 \
		rabbitmq:management

stop-rabbitmq:
	docker stop dev-rabbitmq 

start: start-postgres start-rabbitmq

stop: stop-postgres stop-rabbitmq