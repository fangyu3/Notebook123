from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class BaseModel(db.Model):
    __abstract__ = True

    def __repr__(self):
        return ",".join([f"{column.name}:{getattr(self,column.name)}" for column in self.__table__.columns])
    
     # Change to dictionary to be returned by jsonify
    def to_dict(self):
        return {column.name:getattr(self,column.name) for column in self.__table__.columns}