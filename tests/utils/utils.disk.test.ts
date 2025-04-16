import { execSync } from 'child_process';
import os from 'os';
import
{
    DiskUsage,
    Get_Disk_Usage
} from '../../src/utils';

jest.mock('child_process');

describe('Disk usage function', () => {
    describe('When platform is win32', () => {
        test('Get_Disk_Usage should return two number values (free and total)', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('win32');
            (execSync as jest.Mock).mockReturnValue("FreeSpace=1234567890\r\nSize=2345678901\r\n");

            const result: DiskUsage = Get_Disk_Usage();
            expect(result).not.toBeNull();
            expect(result).toEqual(expect.objectContaining({
                free: expect.any(Number),
                total: expect.any(Number)
            }));

            if('free' in result)
            {
                expect(result.free.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.total.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.free).not.toEqual(0);
                expect(result.total).not.toEqual(0);
                expect(result.free).toEqual(1234567890);
                expect(result.total).toEqual(2345678901);
            }
            platformMock.mockRestore();
        });

        test('Get_Disk_Usage should throw error if an error occurs', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('win32');
            (execSync as jest.Mock).mockImplementation(() => {
                throw new Error('Command failed');
            });

            expect(() => Get_Disk_Usage()).toThrow('Unable to get disk space. Error: Command failed');
            platformMock.mockRestore();
        });

        test('Get_Disk_Usage should throw if an error occurred (incorrect function return)', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('win32');
            (execSync as jest.Mock).mockReturnValue('Unrelated string');

            expect(() => Get_Disk_Usage()).toThrow('Unable to get disk space. Error: Returned value didn\'t match the comparison pattern.');
            platformMock.mockRestore();
        });
    });

    describe('When platform is darwin', () => {
        test('Get_Disk_Usage should return two number values (available and total)', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('darwin');
            (execSync as jest.Mock).mockReturnValue("Filesystem     1024-blocks      Used Available Capacity iused     ifree %iused  Mounted on\n" +
                "/dev/disk3s1s1   239362496  10980004  20527872    35%  424967 205278720    0%   /");

            const result: DiskUsage = Get_Disk_Usage();
            expect(result).not.toBeNull();
            expect(result).toEqual(expect.objectContaining({
                available: expect.any(Number),
                total: expect.any(Number)
            }));

            if('available' in result)
            {
                expect(result.available).not.toEqual(0);
                expect(result.total).not.toEqual(0);
                expect(result.available.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.total.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.available).toEqual(20527872 * 1024);
                expect(result.total).toEqual(239362496 * 1024);
            }
            platformMock.mockRestore();
        });

        test('Get_Disk_Usage should throw error if an error occurs', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('darwin');
            (execSync as jest.Mock).mockImplementation(() => {
                throw new Error('Command failed');
            });

            expect(() => Get_Disk_Usage()).toThrow('Unable to get disk space. Error: Command failed');
            platformMock.mockRestore();
        });

        test('Get_Disk_Usage should throw if an error occurred (incorrect function return)', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('darwin');
            (execSync as jest.Mock).mockReturnValue('Unrelated string');

            expect(() => Get_Disk_Usage()).toThrow('Unable to get disk space. Error: Cannot read properties of undefined (reading \'split\')');
            platformMock.mockRestore();
        });
    });

    describe('When platform is linux', () => {
        test('Get_Disk_Usage should return two number values (available and total)', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('linux');
            (execSync as jest.Mock).mockReturnValue("Filesystem     1024-blocks      Used Available Capacity iused     ifree %iused  Mounted on\n" +
                "/dev/disk3s1s1   239362496  10980004  20527872    35%  424967 205278720    0%   /");

            const result: DiskUsage = Get_Disk_Usage();
            expect(result).not.toBeNull();
            expect(result).toEqual(expect.objectContaining({
                available: expect.any(Number),
                total: expect.any(Number)
            }));

            if('available' in result)
            {
                expect(result.available).not.toEqual(0);
                expect(result.total).not.toEqual(0);
                expect(result.available.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.total.toString().length).toBeGreaterThanOrEqual(1);
                expect(result.available).toEqual(20527872 * 1024);
                expect(result.total).toEqual(239362496 * 1024);
            }
            platformMock.mockRestore();
        });

        test('Get_Disk_Usage should throw error if an error occurs', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('linux');
            (execSync as jest.Mock).mockImplementation(() => {
                throw new Error('Command failed');
            });

            expect(() => Get_Disk_Usage()).toThrow('Unable to get disk space. Error: Command failed');
            platformMock.mockRestore();
        });

        test('Get_Disk_Usage should throw if an error occurred (incorrect function return)', () => {
            const platformMock = jest.spyOn(os, 'platform').mockReturnValue('linux');
            (execSync as jest.Mock).mockReturnValue('Unrelated string');

            expect(() => Get_Disk_Usage()).toThrow('Unable to get disk space. Error: Cannot read properties of undefined (reading \'split\')');
            platformMock.mockRestore();
        });
    });
});
