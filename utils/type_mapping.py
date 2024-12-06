"""JDBC type mapping utilities"""

JDBC_TYPE_MAP = {
    "int": "INTEGER",
    "bigint": "BIGINT",
    "varchar": "VARCHAR",
    "char": "VARCHAR",
    "datetime": "TIMESTAMP",
    "time": "TIMESTAMP",
    "float": "FLOAT",
    "double": "DOUBLE",
    "text": "VARCHAR",
    "decimal": "DECIMAL",
    "date": "DATE",
    "longtext": "VARCHAR",
}

def get_jdbc_type(sql_type: str) -> str:
    """Convert SQL type to JDBC type"""
    return JDBC_TYPE_MAP.get(sql_type.lower(), "UNKNOWN")