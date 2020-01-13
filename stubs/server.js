import express from 'express';
import cors from 'cors';
import io from 'socket.io';
import http from 'http';
import uuid from 'uuid';

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const PORT = 3006;

const app = express()
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const ws = io(server);

const accounts = [];
const skills = [{
    id: uuid.v4(),
    endpoint: 'http://someurl.com',
    accessLevel: 3,
}];
const memories = [];
const exampleProfile = {
    name: 'test',
    birthday: "9/19/1998",
    relationships: [
        {
            name: 'bob shoomer',
            createdOn: 1577338448,
            type: 'family'
        },
        {
            name: 'test acc',
            createdOn: 1577338448,
            type: 'friend',
        },
        {
            name: 'guy ross',
            type: 'boyfriend',
            createdOn: 1577338448,
        }
    ],
    favorites: [
        {
            name: 'cabbage',
            createdOn: 1577338448,
            type: 'food'
        }
    ],
    locations: [
        {
            name: 'london',
            type: 'interest',
            createdOn: 1577338448,
        }
    ]
}

const schema = buildSchema(`
  type Query {
    account(id: String!): Account
    accounts(limit: Int!, offset: Int!): [Account]
    userRequestsPerMonth(id: String!): Int
    memoriesForUser(id: String!, startTime: Int!, endTime: Int!, limit: Int!, offSet: Int!): [Memory]
    skills(limit: Int!, offset: Int!): [Skill]
    getProfile(id: String!): UserProfile
  }
  type Mutation {
    createSkill(id: String!, endpoint: String!, accessLevel: Int!): CreationResponse
  }
  type Memory {
    uid: String
    did: String
    request: String
    response: String
  }
  type CreationResponse {
    didCreate: Boolean
  }
  type Device {
    id: String
  }
  type Account {
    accountDetails: AccountDetails
    devices: [Device]
  }
  type UserProfile {
    name: String
    birthday: String
    relationships: [ProfileItem]
    favorites: [ProfileItem]
    locations: [ProfileItem]
  }
  type ProfileItem {
    name: String
    createdOn: Int
    type: String
  }
  type AccountDetails {
    createdOn: Int
    role: Int
    name: String
    id: String
  }
  type Skill {
    id: String
    endpoint: String
    accessLevel: Int
  }
`);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        account: ({ id }) => accounts.find(a => a.id === id),
        accounts: ({ limit, offset }) => accounts.slice(offset, offset + limit),
        userRequestsPerMonth: ({ id }) => accounts.find(a => a.id === id).rpm,
        memoriesForUser: ({ id }) => memories.filter(a => a.uid === id),

        /*
        mutation{
            createSkill(id: "test", endpoint:"testendpount", accessLevel: 1) {
                didCreate
            }
        }
        */
        createSkill: (skill) => {
            skills.push(skill);
            return {
                didCreate: true,
            }
        },
        /*
        query{
            skills(offset: 0, limit: 10){
                id
                endpoint
            }
        }
        */
        skills: ({ limit, offset }) => skills.slice(offset, offset + limit),
        getProfile: () => exampleProfile,
    },
    graphiql: true,
}));

app.post('/auth', ({ body: { username, password } }, res) => {
    const ed = {
        [username === 'root' && password === 'root']: {
            username: 'root user',
            id: 'root_test_01',
            origin: 'stub',
            role: '4',
            ssid: '9570cb05-07d1-4edb-af9b-a7e38b4a537d',
            createdAt: Math.abs(Date.now() / 1000),
        },
        [username === 'dev' && password === 'dev']: {
            username: 'dev user',
            id: 'dev_test_01',
            origin: 'stub',
            role: '3',
            ssid: '9570cb05-07d1-4edb-af9b-a7e38b4a537d',
            createdAt: Math.abs(Date.now() / 1000),
        },
        [username === 'admin' && password === 'admin']: {
            username: 'admin user',
            id: 'admin_test_01',
            origin: 'stub',
            role: '2',
            ssid: '9570cb05-07d1-4edb-af9b-a7e38b4a537d',
            createdAt: Math.abs(Date.now() / 1000),
        },
    }.true 

    if(ed) {
        res.send(ed);
        return;
    }

    res.status(401);
    res.send({Error: 'Invalid Username or Password'});
});

app.post('/tango', ({ body: { userID } }, res) => {
    typeof userID === 'undefined' ? res.status(500) : res.status(200)
});

app.get('/requestsForRange', (req, res) => {
    res.send({
        count: '2',
        requests: [
            '9570cb05-07d1-4edb-af9b-a7e38b4a537d',
            '5985cb45-07d1-4edb-af9b-a7e38b4a547f'
        ]
    })
});

setInterval(() => {
    if (accounts.length < 25) {
        const did = uuid.v4();
        const id = uuid.v4();

        memories.push({
            did,
            id,
            request: 'some mock message',
            response: 'some mock response',
        })
        accounts.push({
            accountDetails: {
                createdOn: ~~(Math.abs(Date.now() / 1000)),
                role: 2,
                name: `test account - ${accounts.length}`,
                rpm: 312,
                id,
            },
            devices: [{ id: did }],
        });
    }
}, 2000);

const createTrace = () => {
    let totalDuration = 0; 

    const service = ['e1', 'e2', 'e3', 'e4'].map(s => {
        const duration = Math.random() * 500;
        totalDuration += duration;

        return {
            name: s,
            duration,
            timeStart: ~~(Date.now() / 1000),
            timeEnd: ~~(Date.now() / 1000) + (totalDuration / 1000),
            error: Math.random() * 50 > 50 ? "Error: Service Timeout" : undefined
        }
    })

    return {
        totalDuration,
        services: service,
    }
}

ws.on('connection', function (socket) {
    setInterval(() => {
        socket.emit('activeUsersCount', { count: Math.round(Math.random() * (10 - 20) + 10) });
        socket.emit('servicesErrorCount', {
            core: Math.round(Math.random() * (10 - 20) + 10),
            profile: Math.round(Math.random() * (10 - 20) + 10),
            memory: Math.round(Math.random() * (10 - 20) + 10),
            account: Math.round(Math.random() * (10 - 20) + 10),
            skill: Math.round(Math.random() * (10 - 20) + 10),
            speech: Math.round(Math.random() * (10 - 20) + 10),
        })
        socket.emit('accountsCount', { count: accounts.length });
    }, 1000);
 
    socket.on('subscribeToChat', ({ uid, did, request }) => {
        socket.emit(`chat-${uid}_${did}`, {
            message: `echo ${request}`,
            gphType: '',
            gph: '',
            trace: createTrace()
        });
    })
});

server.listen(PORT);

