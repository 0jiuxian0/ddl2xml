"""XML generation service"""
from utils.string_utils import to_camel_case

def generate_insert_xml(table_info: dict) -> str:
    """Generate INSERT batch XML"""
    xml = f'    <insert id="insertBatch" parameterType="java.util.List">\n'
    xml += f'        insert into {table_info["table_name"]} (\n'
    xml += f'        {", ".join(field["name"] for field in table_info["fields"])}\n'
    xml += f'        ) values\n'
    xml += f'        <foreach collection="list" index="index" item="item" separator=",">\n'
    xml += f'            (\n'

    for index, field in enumerate(table_info['fields']):
        camel_case_name = to_camel_case(field["name"])
        separator = ',' if index < len(table_info['fields']) - 1 else ''
        xml += f'            #{{item.{camel_case_name}, jdbcType={field["jdbc_type"]}}}{separator}\n'

    xml += f'            )\n'
    xml += f'        </foreach>\n'
    xml += f'    </insert>'
    return xml

def generate_update_xml(table_info: dict) -> str:
    """Generate UPDATE batch XML"""
    xml = f'    <update id="updateBatch" parameterType="java.util.List">\n'
    xml += f'        update {table_info["table_name"]}\n'
    xml += f'        <trim prefix="set" suffixOverrides=",">\n'

    primary_key_camel_case = to_camel_case(table_info["primary_key"])

    for field in table_info['fields']:
        if field["name"] == table_info["primary_key"]:
            continue
        camel_case_name = to_camel_case(field["name"])
        jdbc_type = field["jdbc_type"]

        xml += f'            <trim prefix="{field["name"]} = case" suffix="end,">\n'
        xml += f'                <foreach collection="list" index="index" item="item">\n'
        xml += f'                    <if test="item.{camel_case_name}!= null">\n'
        xml += f'                        when {table_info["primary_key"]} = #{{item.{primary_key_camel_case},jdbcType=BIGINT}} then #{{item.{camel_case_name},jdbcType={jdbc_type}}}\n'
        xml += f'                    </if>\n'
        xml += f'                </foreach>\n'
        xml += f'            </trim>\n'

    xml += f'        </trim>\n'
    xml += f'        where {table_info["primary_key"]} in\n'
    xml += f'        <foreach close=")" collection="list" item="item" open="(" separator=", ">\n'
    xml += f'            #{{item.{primary_key_camel_case},jdbcType=BIGINT}}\n'
    xml += f'        </foreach>\n'
    xml += f'    </update>'
    return xml