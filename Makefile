install:
	@echo '************                               ************'
	@echo '************       Install packages        ************'
	@echo '************                               ************'
	pnpm install

up:
	@echo '************                               ************'
	@echo '************        UP CONTAINERS          ************'
	@echo '************                               ************'
	docker-compose up -d

down:
	@echo '************                               ************'
	@echo '************        DOWN CONTAINERS        ************'
	@echo '************                               ************'
	docker-compose down

stop:
	@echo '************                               ************'
	@echo '************        STOP CONTAINERS        ************'
	@echo '************                               ************'
	docker-compose stop

dev:
	@echo '************                               ************'
	@echo '************        DEV INIT     	      ************'
	@echo '************                               ************'
	STAGE=dev docker-compose up --build -d

exec:
	@echo '************                               ************'
	@echo '************       Exec Bash NODE          ************'
	@echo '************                               ************'
	docker-compose exec node bash

sh:
	@echo '************                               ************'
	@echo '************        Exec SH NODE    	      ************'
	@echo '************                               ************'
	docker-compose exec node sh

ts_check:
	@echo '************                               ************'
	@echo '************       Exec NODE TS CHECK      ************'
	@echo '************                               ************'
	docker-compose exec node pnpm ts-check

clean:
	docker-compose down -v --remove-orphans
	docker ps -a | grep _run_ | awk '{print $$1}' | xargs -I {} docker rm {}
