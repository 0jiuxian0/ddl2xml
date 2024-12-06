"""API view handlers"""
from flask import request, jsonify
from services.parser import parse_create_table
from services.xml_generator import generate_insert_xml, generate_update_xml

def get_batch_insert():
    """Handle batch insert XML generation request"""
    sql = request.json.get('sql')
    if not sql:
        return jsonify({"error": "SQL query not provided"}), 400
    
    try:
        table_info = parse_create_table(sql)
        xml_output = generate_insert_xml(table_info)
        return xml_output
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def get_batch_update():
    """Handle batch update XML generation request"""
    sql = request.json.get('sql')
    if not sql:
        return jsonify({"error": "SQL query not provided"}), 400
    
    try:
        table_info = parse_create_table(sql)
        xml_output = generate_update_xml(table_info)
        return xml_output
    except Exception as e:
        return jsonify({"error": str(e)}), 400