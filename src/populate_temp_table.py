import sys
import json

# this is only reponsible for populating the tabular data as
# eugene said it would be preferable to split the PDF into 
# 3 parts: header, table, footer... so yeah

# grab + parse the DTO object -> JSON inputted previously
document_data = json.load(sys.stdin)

# this grabs the array of transactions objects + specified template's name
# note to self 1: no need to verify template existence since that's done before script is ran
# note to self 2: is it possible to search the json data for array objects and populate from that 
# instead of specifically defining "transactions" -> for dynamic/compatibility purposes
transactions = document_data.get("transactions", [])
template_name = document_data.get("template_name")

# init empty string for storage purposes
# populate it with transaction object data with latex formatting
tabular_data = ""
for transaction in transactions:
    tabular_data += f"{transaction['description']} & {transaction['quantity']} & {transaction['unit_price']} & {transaction['tax']} \\\\\\hline\n"

# open + read the specified template
# note to self: r = read-only mode
template_path = "src/temp_tex_template/" + template_name + ".tex"

with open(template_path, "r") as template_file:
    latex_template = template_file.read()

# put transactions data into template
latex_template = latex_template.replace("%{tabular_data_placeholder}", tabular_data)

# save the template as new file
# note to self: w = write-mode
with open("to_be_processed.tex", "w") as output_file:
    output_file.write(latex_template)

# this is necessary -- for now -- since the PDF is converted only if
# this script actually outputs something... that could be changed later ofc
print ('Script execution complete.')



