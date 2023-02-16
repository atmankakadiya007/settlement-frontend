export const states = [
    "ACT", 
    "NSW",
    "NT",
    "QLD",
    "SA",
    "TAS",
    "VIC", 
    "WA"
]


export const homepagehighlights = {
    "1" : "High Growth" , 
    "2" : "Positive Geared",
    "3" : "Under Value",
    "4" : "Top School",
    "5" : "Transport",
    "6" : "Subdivide/Granny" ,
    "7" : "City Life" ,
}


export const propertyTypes = [
    "APARTMENT",
    "TOWNHOUSE",
    "HOUSE",
    "UNIT",
    "ACREAGE",
    "RURAL", 
    "VILLA",
    "LAND",
    "BLOCK OF UNITS"
]

export const suburb = [
    "BENOWA",
    "BENOWA WATERS",
    "BUNDALL",
    "BUNDALL BC",
    "BUNDALL DC",
    "CANAL ESTATES",
    "CHEVORON ISLAND",
    "CRONIN ISLAND",
    "GOLD COAST",
    "GOLD COAST MAIL CENTER",
    "GOLD COAST MC",
    "ISLE OF CAPRI",
    "MAIN BEACH",
    "PARADISE ISLAND",
    "PARADISE WATERS",
    "SORRENTO",
    "SURFFERS PARADISE",
    "THE SPIT",
]



export const trans_data = [
    {
        'transaction_uuid': 'INV-0001', 
        'transaction_created_date':'2021-02-19T07:33:39.000Z', 
        'user_information_fullname': 'Elizabeth W', 
        'plan_name': 'Basic', 
        'amount': 264,
    },
    {
        'transaction_uuid': 'INV-0001', 
        'transaction_created_date':'2021-02-19T07:33:39.000Z', 
        'user_information_fullname': 'Elizabeth W', 
        'plan_name': 'Basic', 
        'amount': 264,
    },
    {
        'transaction_uuid': 'INV-0001', 
        'transaction_created_date':'2021-02-19T07:33:39.000Z', 
        'user_information_fullname': 'Elizabeth W', 
        'plan_name': 'Basic', 
        'amount': 264,
    }
]

export const userTypes = [ 
    { 'label': 'Agent', 'value' : 'AGENT'},
    { 'label': 'Buyer', 'value' : 'CUSTOMER'},
    { 'label': 'Solicitor', 'value' : 'SOLICITOR'},
    { 'label': 'Inspector', 'value' : 'INSPECTOR'},
    { 'label': 'Broker', 'value' : 'BROKER'} 
]

export const userTypesMap = {
    'AGENT' : 'Agent', 
    'BROKER' : 'Broker',  
    'SOLICITOR' : 'Solicitor', 
    'INSPECTOR' : 'Inspector', 
    'CUSTOMER': 'Buyer'
}

export const RoleActionsCombo = {
    'CUSTOMER' : ['Offer Sent', 'Pre-Settlement Inspection', 'Final inspection' ],
    'AGENT' : ['Offer Received', 'Offer Accept' ],
    'INSPECTOR' : ['Inspection Finished'], 
    'BROKER' : ['Finance Arranged'],
    'SOLICITOR' : ['Contract Reviewed', 'Contract Exhanged', 'Cooling Off Period Started', 
        'Cooling Off Period End', 'Payment Sent', 'Stamp Duty', 'Settlement Finished'  ]
}

export const homepageFilters = [
    'is_expert_picks',
    'is_most_view',
    'is_new_in_market',
    'is_promoted',
    'is_rare_find',
    'is_spacius_home',
    'is_stress_free'
]