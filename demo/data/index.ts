import { data, IData } from './data';
import { getTreeData } from './utils';

export const treeData = getTreeData<IData>(100, 3, 3, data);
