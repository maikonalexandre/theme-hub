import { Home } from "./pages/home/index.js";
import { Theme } from "./pages/theme/index.js"

const router = () => {
    const routes = [
        { path: '/', component: Home },
        { path: "/theme", component: Theme },
        { path: '/theme/:id', component: Theme }
    ];

    const rootDiv = document.getElementById('app');

    const renderComponent = () => {
        const currentPath = window.location.pathname;

        const route = routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            const currentPathSegments = currentPath.split('/').slice(1);

            if (routePathSegments.length !== currentPathSegments.length) {
                return false;
            }

            return routePathSegments.every((segment, i) => segment === currentPathSegments[i] || segment.startsWith(':'));
        });

        if (route) {
            rootDiv.innerHTML = '';
            const params = currentPath.split('/').slice(2);
            const component = new route.component(params);
            rootDiv.appendChild(component.render());
        }
    };

    window.addEventListener('popstate', renderComponent);
    renderComponent();
};

router();
