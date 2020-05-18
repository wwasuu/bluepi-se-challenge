test:
	npm run test:coverage

install:
	npm install
	npm run build
	pip install -r requirements.txt

start: 
	npm start
	python server.py