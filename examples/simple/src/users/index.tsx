import { UserGroupIcon } from '@salt-ds/icons';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserList from './UserList';
import UserShow from './UserShow';

export default {
    list: UserList,
    create: UserCreate,
    edit: UserEdit,
    show: UserShow,
    icon: UserGroupIcon,
    recordRepresentation: record => `${record.name} (${record.role})`,
};
