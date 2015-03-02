# bed-interview

Here you'll find a small node.js + express.js + backbone.js project that contains:

1. Simple client that allows viewing, adding and editing models 
2. Degenerated node.js server that respects REST api on the `/api/models` 

You need to implement the server side, good luck.

A change in the model should upload new content to s3 bucket bed.interview.rollout.io/&lt;your_name_here&gt;


Here is the story of the application:
  1. The client side CRUD the models and send the server via REST api
  2. On every change the server need to put a json objects on AWS s3 bed.interview.rollout.io/&lt;your_name_here&gt;
  3. The json object should be an an array of a list of the models which `model.status=="production"` with a bit of change in the actual content, the only fields that should be available are `name` and `value`
    - if `model.type==="normal"` `value` should be `normal_value`
    - if `model.type==="weird"` `value` should be `weird_value`

For Example, if available models are:
  `{ _id:"1", name:"name 1", status:"disable", type:"normal", normal_value:1, wierd_value:1},{ _id:"2", name:"name 2", status:"production", type:"wierd", normal_value:2, wierd_value:20.2}, { _id:"3", name:"name 3", status:"production", type:"normal", normal_value:3, wierd_value:30.3}`

The result json should be (on s3 object) 
`[ {name: "name 2", value: 20.2}, {name:"name 3", value:3}]`

Some notes: 
  - Caching should be disabled on the s3 object
  - The server code is just a boilerplate code, feel free to remove it
  - The server code can be written in any language you wish (that can run on linux) 
  - You need some DB on your side, we use mongodb
  - We want to be able the structure of your application and decisions you take. 
  - You should forget about security in this question 
  - For any question please contact eyal, if you got this question you should know how to do it
