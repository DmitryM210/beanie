# beanie

beanie is a block-based visual programming environment and an educational tool designed for kids. 
The game of beanie consists of multiple levels with gradually increasing diffuculty.
With the help of beanie, while playing, you can learn how to construct basic algorithms by completing various programming tasks, and more!

## Usage

The project of beanie is a web-application with its frontend written in React and backend written in Django. If needed, you might want to compile React project located at `.\frontend` via Webpack, and run the server of beanie afterwards.

### Frontend

Navigate to `.\beanie` directory and install Webpack:
```
npm install webpack webpack-cli --save-dev
```

Via Webpack, assemble all the frontend's code into a single file of `.\main.js` using:
```
npm run dev
```

### Backend

If needed, install Django via:
```
pip install django
```

In the same directory of `.\beanie`, call this command to run the server on Django:
```
python manage.py runserver 
```
With the server started, you can for instance open it in the browser at `localhost:8000` (those address and port are used by default). You can stop the server with `CTRL+C` in the terminal.

## Tests
The project of beanie has unit-tests for the logic written on the backend. From the directory of `.\beanie` you can run those tests via:
```
python manage.py test .\tests\
```
