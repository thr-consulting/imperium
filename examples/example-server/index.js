import {runCluster} from '@imperium/cluster';
import {worker} from './dist/esm/index.js';

runCluster(worker);
