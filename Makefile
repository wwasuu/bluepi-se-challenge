test.frontend:
	cd frontend && npm run test:coverage

install.frontend: 
	cd frontend && npm install

install.server: 
	cd service && virtualenv env && source env/bin/activate && pip3 install -r requirements.txt

start.frontend: 
	cd frontend && rm -rf .next && npm run build && npm start

start.server: 
	cd service && source env/bin/activate && python src/server.py
