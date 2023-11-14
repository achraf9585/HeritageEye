import json

def create_json_file():
    print("How many picture do you have: ")
    n = int(input())
    print("What is the file name that will be created example (house-of-allegiance): ")
    ch = str(input())

    data = {
        "infos": {
            "id": ch,
            "title": ch,
            "shortDescription": "",
            "longDescription": "",
            "image": {
                "placeholder": "",
                "url": ""
            }
        },
        "photos": []
    }
    
    for i in range(0,n):
        photo = {
            "id": i,
            "name": "",
            "names": ["prec","next"],
            "modals": [
                {
                    "title": "",
                    "text": "",
                    "image": None,
                    "position": []
                }
            ],
            "positions": [[83.09913429616091, 2.302713378367165, -17.240689960836928],[83.09913429616091, 12.302713378367165, -17.240689960836928]],
            "nextCameraPositions": [[83.09913429616091, 2.302713378367165, -17.240689960836928],[83.09913429616091, 2.302713378367165, -17.240689960836928]],
            "url": "https://d2vm0afvtrg4mc.cloudfront.net/adosareyah/.jpg",
            "urlLQ": "https://d2vm0afvtrg4mc.cloudfront.net/adosareyah/lq/.jpg",
            "links": [i-1,i+1],
            "cameraPosition": [5, 0, 0.1]
        }
        data["photos"].append(photo)

    with open(ch, "w") as f:
        json.dump(data, f, indent=2)

# Example usage
create_json_file()