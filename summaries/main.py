import json

# Open the JSON file
with open("IntelligentInvestor.json", "r") as f:
    # Load the contents of the file into a variable
    data = json.load(f)

# Now you can access the contents of the file as a dictionary
print(data)

with open("IntelligentInvestor.md", "w") as f:
    # Load the contents of the file into a variable
    for i in data["chaps"]:
        f.write(f"\n## {i['name']}\n")
        f.write(i["sum"])