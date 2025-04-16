import os from 'os';
import * as utils from '../../src/utils'
import {CpuInfo} from "node:os";

describe('CPU usage functions', () => {
    describe('Calculate_CPU_Usage_Core', () => {
        test('Calculate_CPU_Usage_Core should return two numbers (idle and total)', () => {
            //Use first CPU core to make this test work on every device
            const cpu:CpuInfo = os.cpus()[0];
            const result: utils.CPUUsageResult = utils.Calculate_CPU_Usage_Core(cpu);

            expect(result).not.toBeNull();
            expect(result).toEqual(expect.objectContaining({
                idle: expect.any(Number),
                total: expect.any(Number)
            }));

            expect(result.idle).not.toEqual(0);
            expect(result.total).not.toEqual(0);
            expect(result.idle.toString().length).toBeGreaterThanOrEqual(1);
            expect(result.total.toString().length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('Calculate_CPU_Usage', () => {
        describe('Core mode', () => {
            test('Calculate_CPU_Usage should return two numbers (idle and total) ' +
                'when mode is set to "core" and id is specified and in correct range', () => {
                //Pass CPU Core ID 0 to work on every machine
                const result: utils.CPUUsageResult = utils.Calculate_CPU_Usage('core', 0);

                expect(result).not.toBeNull();
                expect(result).toEqual(expect.objectContaining({
                    idle: expect.any(Number),
                    total: expect.any(Number)
                }));
                expect(result.idle).not.toEqual(0);
                expect(result.total).not.toEqual(0);
                expect(result.idle.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.total.toString().length).toBeGreaterThanOrEqual(1);
            });

            test('Calculate_CPU_Usage should throw error ' +
                'if mode is set to "core" and ID is specified and is negative', () => {
                expect(() => utils.Calculate_CPU_Usage('core', -5)).toThrow('Passed CPU Core is out of range.');
            });

            test('Calculate_CPU_Usage should throw error ' +
                'if mode is set to "core" and ID is specified and is above the CPU Core count', () => {
                expect(() => utils.Calculate_CPU_Usage('core', 50000)).toThrow('Passed CPU Core is out of range.');
            });

            test('Calculate_CPU_Usage should throw error ' +
                'if mode is set to "core" and ID is not specified', () => {
                expect(() => utils.Calculate_CPU_Usage('core')).toThrow('Set mode but didn\'t pass the CPU core.');
            });
        });

        describe('All mode', () => {
            test('Calculate_CPU_Usage should throw error ' +
                'if mode is set to all and id is specified', () => {
                expect(() => utils.Calculate_CPU_Usage('all', 5)).toThrow('Passed a CPU core ID when mode is set to \'all\'.');
            });

            test('Calculate_CPU_Usage should return two numbers (idle and total) ' +
                'when mode is set to all and id is not specified (calculates entire CPU)', () => {
                const result: utils.CPUUsageResult = utils.Calculate_CPU_Usage('all');

                expect(result).not.toBeNull();
                expect(result).toEqual(expect.objectContaining({
                    idle: expect.any(Number),
                    total: expect.any(Number)
                }));
                expect(result.idle).not.toEqual(0);
                expect(result.total).not.toEqual(0);
                expect(result.idle.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.total.toString().length).toBeGreaterThanOrEqual(1);
            });
        });
    });

    describe('CPU_Usage', () => {
        describe('Core mode', () => {
            test('CPU_Usage should throw an error if mode is set to "core" ' +
                'and id is not defined', async () => {
                await expect(utils.CPU_Usage('core')).rejects.toThrow('Requested usage of CPU Core that\'s out of range.');
            })

            test('CPU_Usage should throw an error if mode is set to "core" ' +
                'and id is negative', async () => {
                await expect(utils.CPU_Usage('core', -5)).rejects.toThrow('Requested usage of CPU Core that\'s out of range.');
            })

            test('CPU_Usage should throw an error if mode is set to "core"' +
                'and id is above the CPU Core count', async () => {
                await expect(utils.CPU_Usage('core', 50000)).rejects.toThrow('Requested usage of CPU Core that\'s out of range.');
            })

            test('CPU_Usage should return a single float number ' +
                'when mode is set to "core" and id is specified and in range', async () => {
                //Pass CPU Core # 0 to work on every machine
                const result: string = await utils.CPU_Usage('core', 0);

                expect(result).not.toBeNull();
                expect(typeof result).toBe('string');
                expect(result).toMatch(/^\d{1,3}(\.\d{1,2})?$/);
            });
        });

        describe('All mode', () => {
            test('', async () => {
                await expect(utils.CPU_Usage('all', 50000)).rejects.toThrow('Passed CPU Core ID when mode was set to "all".');
            });

            test('CPU_Usage should return a single float number ' +
                'when mode is set to "all" and id is not specified', async () => {
                //Pass CPU Core # 0 to work on every machine
                const result: string = await utils.CPU_Usage('all');

                expect(result).not.toBeNull();
                expect(typeof result).toBe('string');
                expect(result).toMatch(/^\d{1,3}(\.\d{1,2})?$/);
            });
        });
    });
});