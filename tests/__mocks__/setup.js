import * as fetch from 'jest-fetch-mock';
import config from './readthedocs-config.json' assert { type: 'json' };

fetch.mockResponseOnce(JSON.stringify(config));
fetch.enableFetchMocks();
