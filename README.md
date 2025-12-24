# React SPA Challenge (React + TS + Redux + Axios + Router + MUI)

## Requisitos cubiertos
- Login fake (200 OK + token-fake).
- Home privada que consume API pública y muestra **2000** elementos, con paginación.
- Logout limpia sesión y retorna al login.
- SPA con React Router.
- Redux Toolkit + persistencia (sessionStorage) para token.
- Axios con configuración centralizada + envío de token en requests.
- Objeto JSON para rutas (API y app routes).
- Hook `useDebounce` para filtros de columnas.
- Carpeta `hoc/` (HOC) y carpeta `ui/` (componentes sin state).

## Stack
- React + TypeScript (Vite)
- Redux Toolkit + redux-persist
- React Router
- Axios + axios-mock-adapter
- MUI + MUI X DataGrid

## Cómo correr
```bash
npm install
npm run dev
```

Abrir: http://localhost:5173

## Login
- Cualquier correo y contraseña (fake).
- El login se mockea con `axios-mock-adapter` en `src/services/api/mockAuth.ts`.

## API pública
- PokeAPI: `/pokemon?limit=2000`

## Arquitectura público/privado
- `AppRouter` cambia entre `PublicFlow` y `PrivateFlow` dependiendo de `auth.token`.
- `PublicFlow`: sólo habilita `/login`.
- `PrivateFlow`: habilita `/home`.

## Axios
- `apiRoutes.ts` define índices (`login`, `list_items`).
- `request(configKey, payload?)` usa esos índices y ejecuta la llamada.
- `setupAxiosInterceptors(getToken)` agrega `Authorization: Bearer <token>`.

## Lista de 2000 items: por qué DataGrid
MUI DataGrid aplica virtualización para renderizar sólo lo visible, evitando problemas de rendimiento por DOM grande en web y móvil.

## Logout
- `clearSession()` + `persistor.purge()` para limpiar estado y persistencia.
- El flujo vuelve automáticamente a `PublicFlow` (login).

## test
Solo alcance a hacer la configuración inicial y un par de test
- npm run test
- npm run test:coverage

## debug
- el proyecto tiene un midleware para hacer debug de las acciones del store por consola

Solo pude trabajar un dia en la prueba tecnica, agrego lista de elementos por mejorar
1. Ampliacion de los test a un 100% del coverage
2. Conmfigurar algunos inputs de test con data-testid


