from model.base_model import BaseModel,db
from datetime import datetime
class Todo(BaseModel):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(64),nullable=False)
    description = db.Column(db.String(128),nullable=False)
    status = db.Column(db.String(64),nullable=False)
    category = db.Column(db.String(64),nullable=False)
    due_date = db.Column(db.Date,nullable=False)
    created_at = db.Column(db.DateTime,nullable=False)
