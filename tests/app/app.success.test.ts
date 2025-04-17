import app from '../../src/app';
import os from 'os';
import request from 'supertest';

describe('System Info API', () => {
    describe('Architecture', () => {
        test('/architecture should return machine type', async () => {
            const response = await request(app).get('/architecture');
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(typeof response.body).toBe('string');
        });
    });

    describe('CPU', () => {
        describe('/cpu-count', () => {
            test('/cpu-count should return CPU count as a number', async () => {
                const response = await request(app).get('/cpu-count');
                expect(response.statusCode).toBe(200);
                expect(typeof response.body).toBe('number');
                expect(response.body).toBeGreaterThan(0);
            });
        });

        describe('/cpu-usage', () => {
            test('/cpu-usage should return total CPU usage as a number (percentage, float)', async () => {
                const response = await request(app).get('/cpu-usage');
                expect(response.statusCode).toBe(200);
                expect(typeof response.body).toBe('number');
                expect(response.body).toBeGreaterThan(0);
                expect(response.body).toBeLessThanOrEqual(100);
                expect(response.body.toString()).toMatch(/^\d{1,3}(\.\d{1,2})?$/);
            });
        });

        describe('/cpu-core-usage', () => {
            test('/cpu-core-usage should return a text message if ID is not specified', async () => {
                const response = await request(app).get('/cpu-core-usage');
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual({ error: 'CPU Core not specified.' });
            });
        });
    });
});