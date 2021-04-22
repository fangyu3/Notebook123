from flask import jsonify, Blueprint, request
from model.todo import Todo
from app import db
from datetime import datetime

todo_handler = Blueprint('todo_handler', __name__)


@todo_handler.route("/", methods=["GET"])
def get_all_todos():
    try:
        todos = Todo.query.filter(Todo.status=="in-progress").order_by(Todo.due_date).all()

        return jsonify({
            "success": True,
            "todos": [todo.to_dict() for todo in todos],
            "msg":"Get all todos successfully"
        }),200
    except Exception as e:
        return jsonify({
            "Success": False,
            "msg": str(e)
        }),400


@todo_handler.route("", methods=["POST"])
def create_todo():
    try:
        data = request.get_json()
        print(data.get("dueDate"))

        todo = Todo(name=data.get("name"),
                    description=data.get("description"),
                    due_date=datetime.strptime(
                        data.get("dueDate"), "%Y-%m-%d"),
                    category=data.get("category"),
                    status = "in-progress",
                    created_at=datetime.now()
                    )
        db.session.add(todo)
        db.session.commit()
        return jsonify({
            "success": True,
            "todo": todo.to_dict(),
            "msg": "Added new todo successfully"
        }),200
    except Exception as e:
        return jsonify({
            "Success": False,
            "msg": str(e)
        }),400


@todo_handler.route("/<int:id>", methods=["PUT"])
def update_todo(id):
    try:
        todo_to_update = Todo.query.get(id)

        if todo_to_update is None:
            raise Exception(f"task with id {id} does not exist")

        data = request.get_json()

        todo_to_update.name = data.get("name")
        todo_to_update.description = data.get("description")
        todo_to_update.due_date = datetime.strptime(
            data.get("dueDate"), "%Y-%m-%d")

        db.session.commit()

        return jsonify({
            "success": True,
            "todo":todo_to_update.to_dict(),
            "msg": "Update successful"
        }),200
    except Exception as e:
        return jsonify({
            "Success": False,
            "msg": str(e)
        }),400


@todo_handler.route("/<int:id>", methods=["DELETE"])
def delete_todo(id):

    try:
        print(id)
        todo_to_delete = Todo.query.get(id)

        if todo_to_delete is None:
            raise Exception(f"task with id {id} does not exist")

        db.session.delete(todo_to_delete)
        db.session.commit()

        return jsonify({
            "success": True,
            "msg": "Delete successful"
        }),200
    except Exception as e:
        return jsonify({
            "Success": False,
            "msg": str(e)
        }),400


@todo_handler.route("/clear", methods=["DELETE"])
def delete_all_todos():
    try:
        todos = Todo.query.all()
        for todo in todos:
            db.session.delete(todo)
            db.session.commit()

        return jsonify({
            "success": True,
            "msg": "Cleared todo list"
        }),200

    except Exception as e:
        return jsonify({
            "Success": False,
            "msg": str(e)
        }),400

@todo_handler.route("/<int:id>/complete",methods=["PUT"])
def complete_todo(id):
    try:
        data = request.get_json()
        completed_todo = Todo.query.get(id)
        completed_todo.status = data.get("status")
        db.session.commit()
        return jsonify({
            "success":True,
            "todo":completed_todo.to_dict(),
            "msg":"Task completed!"
        }),200
    except Exception as e:
        return jsonify({
            "success":False,
            "msg": str(e)
        }),400