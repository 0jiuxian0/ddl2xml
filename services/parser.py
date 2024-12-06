"""SQL parsing service"""
from simple_ddl_parser import DDLParser
from utils.type_mapping import get_jdbc_type

def parse_create_table(sql: str) -> dict:
    """Parse CREATE TABLE SQL statement"""
    result = DDLParser(sql).run()
    
    if not result:
        raise ValueError("Invalid SQL statement")
        
    table_info = {
        "table_name": result[0]["table_name"].strip("`"),
        "primary_key": result[0]["primary_key"][0].strip("`"),
        "fields": []
    }

    for column in result[0]["columns"]:
        field_info = {
            "name": column["name"].strip("`"),
            "type": column["type"],
            "jdbc_type": get_jdbc_type(column["type"]),
        }
        table_info["fields"].append(field_info)

    return table_info