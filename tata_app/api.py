import frappe
import requests
import json
from erpnext.utilities.transaction_base import TransactionBase
from erpnext.crm.utils import (
	CRMNote,
)
def non_match_elements(list_a, list_b):
    non_match = []
    for i in list_a:
        ia=i['id']
        if ia not in list_b:
            non_match.append(i)
    return non_match

def match_client_no_customer(cl_no1):
    i1=cl_no1[3:]
    print("Hello this is function to match the client number with the customer")
    c=frappe.db.sql(f"""select name from `tabCustomer` where whatsapp_no='{i1}' or mobile='{i1}' or phone='{i1}' or phone_ext='{i1}'""",as_list=True)
    if len(c)>0:
        ac=(c[0][0])
        return ac
    else:
        print("None")
        return

def match_client_no_lead(cl_no1):
    i1=cl_no1[3:]
    print("Hello this is function to match the client number with lead")
    b=frappe.db.sql(f"""select name from `tabLead` where whatsapp_no='{i1}' or mobile_no='{i1}' or phone='{i1}'or phone_ext='{i1}';""",as_list=True)
    if len(b)>0:
        a=(b[0][0])
        return a
    else:
        print("None")
        return

def Convert(result):
    res_dct = {result[i]: result[i + 1] for i in range(0, len(result), 2)}
    return res_dct

def call_log():
    # this is simple code to bring the data from the tata database 
    url = "https://api-smartflo.tatateleservices.com/v1/call/records?limit=271"
    headers = {
    "accept": "application/json",
    "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMxMjU2MiwiaXNzIjoiaHR0cHM6XC9cL2Nsb3VkcGhvbmUudGF0YXRlbGVzZXJ2aWNlcy5jb21cL3Rva2VuXC9nZW5lcmF0ZSIsImlhdCI6MTY2NTQwMDM4MiwiZXhwIjoxOTY1NDAwMzgyLCJuYmYiOjE2NjU0MDAzODIsImp0aSI6IlRLZGJLV2tuV1lNQmcxRXUifQ.ne6SKA5wm4P_L9zFzXnCxfxCb-IzNQ9C1h6hLkT0Ozk"
    }
    response =requests.get(url, headers=headers)
    y=response.text
    x=json.loads(y)
    result=[]
    list=[]
    for x2 in x['results']:
        if 'id' in x2:
            result.append("id")
            result.append(x2['id'])
        if 'call_id' in x2:
            result.append("call_id")
            result.append(x2['call_id'])
        if 'status' in x2:
            result.append("status")
            result.append(x2['status'])
        if 'time' in x2:
            result.append("time")
            result.append(x2['time'])
        if 'service' in x2:
            result.append("service")
            result.append(x2['service'])
        if 'date' in x2:
            result.append("date")
            result.append(x2['date'])
        if 'call_duration' in x2:
            result.append("call_duration")
            result.append(x2['call_duration'])
        if 'department_name' in x2:
            result.append("department_name")
            result.append(x2['department_name'])
        if 'agent_name' in x2:
            result.append("agent_name")
            result.append(x2['agent_name'])
        if 'agent_number' in x2:
            result.append("agent_number")
            result.append(x2['agent_number'])
        if 'did_number' in x2:
            result.append("did_number")
            result.append(x2['did_number'])
        if 'client_number' in x2:
            result.append("client_number")
            result.append(x2['client_number'])
        if 'recording_url' in x2:
            result.append("recording_url")
            result.append(x2['recording_url'])
        list.append(Convert(result))
    a=list
    print("This is data-base Call Logs Id Fetch Function")
    b=frappe.db.sql("""select id from `tabCall Logs`;""")
    c=[]
    for i in b:
        for i1 in i:
            c.append(i1)
    
    non_match = non_match_elements(a, c)
    if len(non_match)>0:
        print(len(non_match))
        print ("The lists a and c are not the same")
        print("No match elements: ", non_match)
        for i in non_match:
            print("This is client number fetch field")
            cl_no1=i["client_number"]
            get_cust=match_client_no_customer(cl_no1)
            get_lead=match_client_no_lead(cl_no1)
            print("this is printed by skype function")
            print(get_cust)
            print(type(get_cust))
            print(get_lead)
            print(type(get_lead))
    
            if get_cust==None:
            # working model
                if get_lead==None:
                    print("hello")
                    frappe.get_doc(({"doctype" : "Call Logs", "id": i['id'], "call_id": i['call_id'], "service": i['service'], "date": i['date'], "call_duration": i['call_duration']
                    , "department_name": i['department_name'], "agent_name": i['agent_name'], "agent_number": i['agent_number'], "status": i['status'], "time": i['time'], "did_number": i['did_number'], "client_number": i['client_number']
                    , "recording_url": i['recording_url']})).insert()
                else:
                    print("This is true lead function")
                    print(len(get_lead))
                    if len(get_lead)==19:
                        print("this is the crm-lead")
                        frappe.get_doc(({"doctype" : "Call Logs", "id": i['id'], "call_id": i['call_id'], "service": i['service'], "date": i['date'], "call_duration": i['call_duration']
                        , "department_name": i['department_name'], "status": i['status'], "agent_name": i['agent_name'], "agent_number": i['agent_number'], "status": i['status'], "time": i['time'], "did_number": i['did_number'], "client_number": i['client_number']
                        , "recording_url": i['recording_url'], "lead": get_lead})).insert()  
            else:
                    print("this is the crm-Customer ")
                    frappe.get_doc(({"doctype" : "Call Logs", "id": i['id'], "call_id": i['call_id'], "service": i['service'], "date": i['date'], "call_duration": i['call_duration']
                        , "department_name": i['department_name'], "status": i['status'], "agent_name": i['agent_name'], "agent_number": i['agent_number'], "status": i['status'], "time": i['time'], "did_number": i['did_number'], "client_number": i['client_number']
                        , "recording_url": i['recording_url'], "customer": get_cust})).insert()
            frappe.db.commit()
            print("End Note")
    else:
        print ("The lists a and c are the same")



@frappe.whitelist()
def click_to_call(agent_number,destination_number):
	# print("ghkuhyjl")
	url = "https://api-smartflo.tatateleservices.com/v1/click_to_call"
	payload = {
		"agent_number": agent_number,
		"destination_number": destination_number
	}
	headers = {
		"accept": "application/json",
		"Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMxMjU2MiwiaXNzIjoiaHR0cHM6XC9cL2Nsb3VkcGhvbmUudGF0YXRlbGVzZXJ2aWNlcy5jb21cL3Rva2VuXC9nZW5lcmF0ZSIsImlhdCI6MTY2NTQwMDM4MiwiZXhwIjoxOTY1NDAwMzgyLCJuYmYiOjE2NjU0MDAzODIsImp0aSI6IlRLZGJLV2tuV1lNQmcxRXUifQ.ne6SKA5wm4P_L9zFzXnCxfxCb-IzNQ9C1h6hLkT0Ozk",
		"content-type": "application/json"
	}
	response = requests.post(url, json=payload, headers=headers)
	print(response.text)



class Opportunity(TransactionBase, CRMNote):
	def disable_lead(self):
		if self.opportunity_from == "Lead":
			frappe.db.set_value("Lead", self.party_name, {"disabled": 0, "docstatus": 1})