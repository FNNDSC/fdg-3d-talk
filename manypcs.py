
# coding: utf-8

# # Create a slew of "pc" fdgs

# In[114]:


import json


# In[115]:


l_nodesCloudHeterogeneous = []
l_linksCloudHeterogeneous = []
l_nodesCloudHomogeneous   = []
l_linksCloudHomogeneous   = []
cloudNodes                = 300
edgeNodes                 = 30
linkToEdgeNodes           = 10
d_graphDisconnected       = {}
d_graphCentralServer      = {}
d_graphCloudHomogeneous   = {}
d_graphEdge               = {}
d_graphFog                = {}


# In[116]:


for i in range(1, cloudNodes):
    l_nodesCloudHeterogeneous.append({"id": "pc%d" % i, "group": i})
    l_nodesCloudHeterogeneous.append({"id": "human%d" % i, "group": i})
    l_linksCloudHeterogeneous.append({"source": "pc%d" % i, "target": "human%d" % i, "value": 10})


# In[117]:


d_graphDisconnected = {
    "nodes": l_nodesCloudHeterogeneous,
    "links": l_linksCloudHeterogeneous
}
with open('pcss.json', 'w') as f:
    json.dump(d_graphDisconnected, f, sort_keys=True, indent=4)


# # Create a central server

# In[118]:


l_nodesCloudHeterogeneous.append({"id": "server1", "group": 200})


# In[119]:


for i in range(1, cloudNodes):
    l_linksCloudHeterogeneous.append({"source": "pc%d" % i, "target": "server1", "value": 1})


# In[120]:


d_graphCentralServer = {
    "nodes": l_nodesCloudHeterogeneous,
    "links": l_linksCloudHeterogeneous
}
with open('pcss-net.json', 'w') as f:
    json.dump(d_graphCentralServer, f, sort_keys=True, indent=4)


# # Create a "cloud" topology

# # First create the node and links out from the cloud to the edge

# In[121]:


# Create a homogeneous cloud
l_nodesCloudHomogeneous.append({"id": "headnode", "group": 100})
for i in range(1, cloudNodes):
    l_nodesCloudHomogeneous.append({"id": "node%d" %i, "group": 1})
    l_linksCloudHomogeneous.append({"source": "node%d" % i, "target": "headnode", "value": 1})


# In[122]:


# Create the nodes out of the cloud
for i in range(1, linkToEdgeNodes):
    l_nodesCloudHomogeneous.append({"id": "link%d" % i, "group": cloudNodes})
l_nodesCloudHomogeneous.append({"id": "client", "group": 400})


# In[123]:


# Link the nodes to create a chain out of the cloud
for i in range(1, linkToEdgeNodes-1):
    l_linksCloudHomogeneous.append({"source": "link%d" % i, "target": "link%s" % str(i+1)})
l_linksCloudHomogeneous.append({"source": "link1", "target": "headnode", "value": 1})
l_linksCloudHomogeneous.append({"source": "link%s" % str(linkToEdgeNodes-1), "target": "client", "value": 1})


# In[124]:


d_graphCloudHomogeneous = {
    "nodes": l_nodesCloudHomogeneous,
    "links": l_linksCloudHomogeneous
}
with open('cloud.json', 'w') as f:
    json.dump(d_graphCloudHomogeneous, f, sort_keys=True, indent=4)


# # Create another cloud for the "edge" computing

# In[125]:


for i in range(1, edgeNodes):
    l_nodesCloudHomogeneous.append({"id": "edgeNode%d" % i, "group": 2})
    l_linksCloudHomogeneous.append({"source": "edgeNode%d" %i, "target": "link%s" % str(linkToEdgeNodes-1), "value": 1})


# In[126]:


d_graphEdge = {
    "nodes": l_nodesCloudHomogeneous,
    "links": l_linksCloudHomogeneous
}
with open('edge.json', 'w') as f:
    json.dump(d_graphEdge, f, sort_keys=True, indent=4)


# # Fog computing

# In[130]:


for i in range(1, edgeNodes):
    l_nodesCloudHomogeneous.append({"id": "fogNode3.%d" %i, "group": 3})
    l_linksCloudHomogeneous.append({"source": "fogNode3.%d" %i, "target": "link3", "value": 1})
    l_nodesCloudHomogeneous.append({"id": "fogNode6.%d" %i, "group": 4})
    l_linksCloudHomogeneous.append({"source": "fogNode6.%d" %i, "target": "link6", "value": 1})


# In[131]:


d_graphFog = {
    "nodes": l_nodesCloudHomogeneous,
    "links": l_linksCloudHomogeneous
}
with open('fog.json', 'w') as f:
    json.dump(d_graphFog, f, sort_keys=True, indent=4)

