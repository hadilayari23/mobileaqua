# downlink  without security
import requests
import pymongo
myclient = pymongo.MongoClient(
    "mongodb+srv://admin:admin@dhawinidb.b3dtx.mongodb.net/?retryWrites=true&w=majority")
mydb = myclient["myFirstDatabase"]
mycol = mydb["devices"]
list = []
for x in mycol.find({}, {"_id": 0, "deveui": 1, "active": 1}):
    # print(x)
    list.append(x)
DevEUI = []
Payload = []
for i in list:
    DevEUI.append(i['deveui'])
    Payload.append(i['active'])

TPWAPIURL = "https://api-iot.gnet.tn"
#DevEUI = y
#Payload = z
FPort = "2"
# inetrval time
#Payload = "FEFEFEFE6804002810192068140E3434933735333333646464646F339916"
# On
#Payload ="FEFEFEFE68040028101920681C1035333333646464644F333434343434CC2116"
# Off


#Payload ="F12345"


for j in range(0, len(list)):
    QueryString = "DevEUI=" + DevEUI[j] + \
        "&FPort=" + FPort + "&Payload=" + Payload[j]

    SendDownlinkURL = TPWAPIURL + "/thingpark/lrc/rest/downlink?" + QueryString
    SendDownlinkHeaders = {'Content-Type': 'application/x-www-form-urlencoded'}
    SendDownlinkPayload = ""
    SendDownlinkResponse = requests.request("POST",
                                            SendDownlinkURL,
                                            headers=SendDownlinkHeaders,
                                            data=SendDownlinkURL
                                            )
    print("#1 - Send Downlink")
    print("URL:", SendDownlinkURL)
    print("Headers:", SendDownlinkHeaders)
    print("Payload:", SendDownlinkPayload)
    print("Response:", SendDownlinkResponse)
    print("Response Text:", SendDownlinkResponse.text)
    print("Cookies:", SendDownlinkResponse.cookies)
