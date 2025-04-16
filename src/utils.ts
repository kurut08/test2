// noinspection ExceptionCaughtLocallyJS

import os from 'os';
import { execSync } from 'child_process';

type CPUMode = 'core' | 'all';

export interface CPUUsageResult
{
    idle: number;
    total: number;
}

interface WindowsDiskUsage
{
    total: number;
    free: number;
}

interface UnixDiskUsage
{
    total: number;
    available: number;
}

export type DiskUsage = WindowsDiskUsage | UnixDiskUsage;

export function CPU_Usage(mode: CPUMode, id?: number): Promise<string>
{
    return new Promise((resolve, reject) => {
        try
        {
            if(mode === 'core')
            {
                if(id === undefined || id < 0 || id >= os.cpus().length)
                {
                    throw new Error('Requested usage of CPU Core that\'s out of range.');
                }
            }
            else if(id !== undefined)
            {
                throw new Error('Passed CPU Core ID when mode was set to "all".');
            }
            const startUsage: CPUUsageResult = Calculate_CPU_Usage(mode, id);

            setTimeout(() => {
                const endUsage: CPUUsageResult = Calculate_CPU_Usage(mode, id);

                const idleDifference: number = endUsage.idle - startUsage.idle;
                const totalDifference: number = endUsage.total - startUsage.total;

                const cpuUsagePercentage: number = ((totalDifference - idleDifference) / totalDifference) * 100;
                resolve(cpuUsagePercentage.toFixed(2));
            }, 100);
        }
        catch(error)
        {
            reject(new Error('Error calculating CPU usage:' + (error as Error).message));
        }
    });
}

export function Calculate_CPU_Usage(mode: CPUMode, id?: number): CPUUsageResult
{
    const cpus: os.CpuInfo[] = os.cpus();

    if(mode === 'core')
    {
        if(id !== undefined)
        {
            if(id < 0 || id >= cpus.length) { throw new Error('Passed CPU Core is out of range.'); }
            else { return Calculate_CPU_Usage_Core(cpus[id]); }
        }
        else
        {
            throw new Error('Set mode but didn\'t pass the CPU core.');
        }
    }
    else
    {
        if(id !== undefined) { throw new Error('Passed a CPU core ID when mode is set to \'all\'.'); }
        else
        {
            let idle: number = 0;
            let total: number = 0;

            for(const cpu of cpus)
            {
                const result: CPUUsageResult = Calculate_CPU_Usage_Core(cpu);
                idle += result.idle;
                total += result.total;
            }

            return {
                idle,
                total
            };
        }
    }
}

export function Calculate_CPU_Usage_Core(cpu: os.CpuInfo): CPUUsageResult
{
    const { user, nice, sys, idle, irq } = cpu.times;
    const total: number = user + nice + sys + idle + irq;

    return {
        idle,
        total
    };
}

export function Get_Disk_Usage(): DiskUsage
{
    try
    {
        if(os.platform() === 'win32')
        {
            const output: string = execSync('wmic localdisk where "DeviceID=\'C:\'| get FreeSpace, Size / format:list',
                { encoding: 'utf8' }
            );
            const matches = output.match(/FreeSpace=(\d+)\r?\nSize=(\d+)/);

            if(matches)
            {
                return {
                    free: parseInt(matches[1], 10),
                    total: parseInt(matches[2], 10)
                };
            }
            else
            {
                throw new Error('Returned value didn\'t match the comparison pattern.');
            }
        }
        else
        {
            const output: string = execSync('df -k /', { encoding: 'utf8'});
            const lines: string[] = output.trim().split('\n');
            const values: string[] = lines[1].split(/\s+/);

            return {
                total: parseInt(values[1], 10) * 1024,
                available: parseInt(values[3], 10) * 1024
            };
        }
    }
    catch (error) { throw new Error('Unable to get disk space. Error: ' + (error as Error).message); }
}