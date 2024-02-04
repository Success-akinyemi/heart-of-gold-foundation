import { getUser } from "../helpers/api";

const menuData = [
    {title: 'Homes', link: '/'},
    {title: 'About', link: '/about'},
    {title: 'Campaigns/Blogs', link: '/campaign'},
    {title: 'Gallery', link: '/gallery'},
    {title: 'Events/News', link: '/events'},
    {title: 'Join Us', link: '/login'},
]

const user = localStorage.getItem('authToken')
if (user) {
    menuData.push({ title: 'My Profile', link: '/profile' });
}

export default menuData