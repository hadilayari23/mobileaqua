from kafka import KafkaConsumer
import pymongo
import json
myclient = pymongo.MongoClient(
    "mongodb+srv://admin:admin@dhawinidb.b3dtx.mongodb.net/?retryWrites=true&w=majority")
mydb = myclient["myFirstDatabase"]
mycol = mydb["devices"]
mycol1 = mydb["IoT1"]
list = []
for x in mycol.find({}, {"_id": 0}):
   #print(x["deveui"])
   list.append(x['deveui'])
#print(list)

#mydb = myclient["Device"]
#mycol = mydb["OSS.LRR.v1"]
#mycol2 = mydb["devices"]

#-----------------------------------------------------------------------------------------

#compare
#-----------------------------------------------------------------------------------------
consumer = KafkaConsumer('AS.SUPCOM.v1', 'AS.topic.v1',
                         bootstrap_servers='kafka.treetronix.com:9095')
for msg in consumer:
   print(msg.value)
   data = json.loads(msg.value)
   print(data["DevEUI_uplink"])
   for i in list:
     if(data["DevEUI_uplink"]["DevEUI"] == i):
       #print(data["DevEUI_uplink"])
       x = mycol1.insert_one(data["DevEUI_uplink"])

 









   #print(json.dumps(data, indent=4))
   #print(json.dumps(data, indent=4, sort_keys=True))
   

   #print(data["DevEUI"])
   #for device in data:
    #if device['DevEUI_uplink']["DevEUI"] == "FFFFFF100001BE77":
       #print(device)







   #x = mycol.insert_one(json.loads(msg.value))
  
#outs = data['DevEUI_uplink']
   #print(x.inserted_id)
   
   




