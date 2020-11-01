deploy-azure:
	docker build -f Dockerfile -t friendly-frontend .
	az acr login --name apiregcon
	docker tag friendly-frontend apiregcon.azurecr.io/friendly-frontend
	docker push apiregcon.azurecr.io/friendly-frontend