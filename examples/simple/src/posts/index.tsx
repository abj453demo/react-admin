import { BookmarkIcon } from '@salt-ds/icons';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import PostList from './PostList';
import PostShow from './PostShow';

export default {
    list: PostList,
    create: PostCreate,
    edit: PostEdit,
    show: PostShow,
    icon: BookmarkIcon,
    recordRepresentation: 'title',
};
