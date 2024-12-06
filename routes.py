from flask import Flask
from views.converter import get_batch_insert, get_batch_update

def register_routes(app: Flask):
    """Register all routes for the application"""
    app.add_url_rule('/get_batch_insert', view_func=get_batch_insert, methods=['POST'])
    app.add_url_rule('/get_batch_update', view_func=get_batch_update, methods=['POST'])