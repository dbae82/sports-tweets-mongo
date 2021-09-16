const http = require('http');
const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const needle = require('needle');
require('dotenv').config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

const rulesUrl = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamUrl = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id&tweet.fields=created_at,lang,conversation_id&user.fields=created_at,entities,profile_image_url';

const rules = [{ value: '#knicks', lang: 'en' }];

const getRules = async () => {
    const response = await needle('get', rulesUrl, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    })
    
    return response.body;
};

const setRules = async () => {
    const data = {
        add: rules,
    }
    
    const response = await needle('get', rulesUrl, data, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    })
    return response.body;
};

const deleteRules = async () => {
    if (!Array.isArray(rules.data)) {
        return null;
    };
    
    const ids = rules.data.map((rule) => rule.id);
    
    const data = {
        delete: {
            ids: ids,
        },
    }
    
    const response = await needle('post', rulesUrl, data, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    })

    return response.body;
};

function streamTweets(socket) {
    const stream = needle.get(streamUrl, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    })

    stream.on('data', (data) => {
        try {
            const json = JSON.parse(data);
            socket.emit('tweet', json);
        } catch (error) {}
    })

    return stream;
};

io.on('connection', async () => {
    console.log('Client connected...');

    let currentRules;

    try {
        currentRules = await getRules()
        await deleteRules(currentRules);
        await setRules()
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
    const filteredStream = streamTweets(io);
    
    let timeout = 0;
    filteredStream.on('timeout', () => {
        console.warn('A connection error occurred. Reconnecting...');
        setTimeout(() => {
            timeout++;
            streamTweets(io);
        }, 2 ** timeout)
        streamTweets(io);
    })
});

// module.exports = tweet;