import app from '../../src/app';
import os from 'os';
import request from 'supertest';
import * as utils from '../../src/utils';

describe('System Info API', () => {
    describe('Architecture', () => {
        test('/architecture should return error if an error occurs', async () => {
            jest.spyOn(os, 'machine').mockImplementationOnce(() => {
                throw new Error('Mocked failure');
            });

            const response = await request(app).get('/architecture');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Mocked failure' });
        });
    });

    describe('CPU', () => {
        describe('/cpu-count', () => {
            test('/cpu-count should return error if returned value is less or equal 0', async () => {
                jest.spyOn(os, 'cpus').mockReturnValueOnce([]);

                const response = await request(app).get('/cpu-count');
                expect(response.status).toBe(400);
                expect(response.body).toEqual({ error: 'Couldn\'t get the cpu count.' });
            });
        });

        describe('/cpu-count', () => {
            test('/cpu-count should return error if an error occurs', async () => {
                jest.spyOn(os, 'cpus').mockImplementationOnce(() => {
                    throw new Error('Mocked failure');
                });

                const response = await request(app).get('/cpu-count');
                expect(response.status).toBe(500);
                expect(response.body).toEqual({ error: 'Mocked failure' });
            });
        });

        describe('/cpu-usage', () => {
            test('/cpu-usage should return error if value returned by CPU_Usage is not a number', async () => {
                jest.spyOn(utils, 'CPU_Usage').mockImplementationOnce(async () => {
                    return Promise.resolve("test");
                });

                const response = await request(app).get('/cpu-usage');
                expect(response.status).toBe(500);
                expect(response.body).toEqual({ error: 'Invalid CPU usage value' });

            });

            test('/cpu-usage should return error if an error occurs', async () => {
                jest.spyOn(os, 'cpus').mockImplementationOnce(() => {
                    throw new Error('Mocked failure');
                });

                const response = await request(app).get('/cpu-usage');
                expect(response.status).toBe(500);
                expect(response.body).toEqual({ error: 'Error calculating CPU usage:Mocked failure' });
            });
        });
    });
});