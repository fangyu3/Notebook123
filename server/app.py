from flask import Flask
from flask_migrate import Migrate
from config import DevelopmentConfig
from model.base_model import db
from api.todo.todo_handler import todo_handler

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(todo_handler,url_prefix="/api/todo")

if __name__=="__main__":
    print("hello world")
    app.run()
