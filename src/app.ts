import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import os from 'os';
import
{
    CPU_Usage,
    Get_Disk_Usage
} from './utils';

const app: Express = express();

app.use(cors());

//Architecture
app.get('/architecture', async(_req: Request, res: Response): Promise<void> => {
    try
    {
        const response:string = os.machine();
        res.json(response);
    }
    catch (error) { res.status(500).json({ error: (error as Error).message }); }
});

app.get('/cpu-count', async(_req: Request, res: Response): Promise<void> => {
    try
    {
        const cpuCount:number = os.cpus().length;
        if(cpuCount > 0) res.json(cpuCount);
        else res.status(400).json({ error: 'Couldn\'t get the cpu count.'});
    }
    catch(error) { res.status(500).json({ error: (error as Error).message }); }
});

app.get('/cpu-usage', async(_req: Request, res: Response): Promise<void> => {
    try
    {
        const usage: string = await CPU_Usage('all');
        const usageNumber: number = parseFloat(usage);
        if(isNaN(usageNumber))
        {
            res.status(500).json({ error: 'Invalid CPU usage value' });
            return;
        }
        res.json(Number(usageNumber));
    }
    catch(error) { res.status(500).json({ error: (error as Error).message }); }
});

app.get('/cpu-core-usage', async(_req: Request, res: Response): Promise<void> => {
    res.status(400).json({ error: 'CPU Core not specified.' });
});

export default app;