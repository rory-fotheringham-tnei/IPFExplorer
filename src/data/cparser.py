import os
import pandas as pd
import json

df = pd.read_excel('capex.xlsx')
keys_df = pd.read_csv('keys.csv')

capex_df = df.iloc[:,0:5]
losses_df = df.iloc[:,5:11]
avail_df = df.iloc[:,11:16]
print('hello')
data_list = []
key_list = []
for i in range(len(df)):
    capex_dic = capex_df.iloc[i].to_dict()
    losses_dic = losses_df.iloc[i].to_dict()
    avail_dic = avail_df.iloc[i].to_dict()
    data_object = {'capex': capex_dic,
                   'losses': losses_dic,
                   'avail': avail_dic}
    
    key_dict = keys_df.iloc[i].to_dict()
    
    data_list.append(data_object)
    key_list.append(key_dict)
    
with open('data_out.json', 'w') as f:
    f.write(json.dumps(data_list, indent=2))
    
with open('key_out.json', 'w') as f:
    f.write(json.dumps(key_list, indent=2))
    
    