# Routing

Con las herramientas vistas hasta ahora podemos hacer todo tipo de componentes
con diversos comportamientos, pero nos vemos limitados a aplicaciones de una
sóla página. Para romper esta barrera, y crear aplicaciones más complejas,
necesitamos incorporar una herramienta de routing.

En React existen múltiples alternativas para llevar esto a cabo, pero sin duda
la más popular ha sido [React Router](https://reactrouter.com/), que acaba de
actualizarse recientemente a la v6.

## Cómo empezar

Para utilizar React Router, el primer paso es instalarlo mediante:

```sh
npm install react-router-dom@6
```

A continuación, en el `index.js`, importamos `<BrowserRouter>`, y lo utilizamos
para envolver nuestra `<App />`:

```jsx
import { BrowserRouter } from 'react-router-dom'
// [...]
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
```

Con estos pasos estamos listos para empezar.

## Manejando rutas

Las rutas se manejan mediante los componentes `<Routes>` y `<Route>`.

El componente `<Route>` puede verse como un "if" que mostrará el elemento que
le indiquemos solamente si la ruta actual del navegador coincide con la
especificada. El `path` puede contener variables con la misma sintaxis que
Express, y puede indicarse un `*` como comodín para que acepte cualquier
elemento.

Los `<Routes>` son packs de rutas. Dentro de este elemento sólo se pueden poner
elementos `<Route>`, y de entre todos los hijos se elegirá **tan solo uno** en
función de la ruta. Si ninguna encaja, no mostrará nada.

Veamos un ejemplo:

```jsx
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="personaje/:id" element={<Personaje />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  )
}
```

Es importante tener presente que podemos utilizar estos componentes en varios
lugares de nuestra aplicación, no sólo en `<App />`, pudiendo incluso anidarlos
si queremos definir partes del interfaz con distintos niveles de granularidad.

## Enlaces

Para navegar entre rutas, podríamos utilizar `<a href="...">` tradicionales,
pero provocarán recargas innecesarias, y empeorarán la experiencia de uso. En
su lugar, debemos utilizar `<Link to="...">`, que funciona del mismo modo, pero
evita estos problemas. Eso si: a la hora de estilarlo, un `<Link>` sigue siendo
un `<a>`.

En muchas ocasiones queremos resaltar un enlace si estamos ahora mismo en la
ruta a la que apunta. Esto es muy común en menús y barras de navegación. Para
este caso, tenemos la opción de utilizar `<NavLink>`, que funciona exactamente
igual que `<Link>`, pero adquiere la clase `active` si el navegador está en
su ruta actualmente. Existen más opciones que podemos utilizar con este
componente, pero es mejor consultarlas en la
[documentación](https://reactrouter.com/docs/en/v6/api#navlink).

## Leyendo datos de la URL

Cuando utilizamos una variable (como el `id` del primer ejemplo), podemos
acceder al valor actual mediante el hook `useParams`, que nos devuelve un
objeto con todas las variables de la ruta actual. Es frecuente capturarlos
mediante _destructuring_, y utilizarlo para lo que necesitemos.

```jsx
import { useParams } from 'react-router-dom'

function Personaje() {
  const { id } = useParams()
  const character = useFetch('https://rickandmortyapi.com/api/character/' + id)
  return <div>...</div>
}
```

Si decidimos utilizar _query parameters_ en nuestra ruta, también podemos
acceder a ellos mediante otro hook: `useSearchParams`, que funciona de forma
similar a `useState`, pero leyendo y escribiendo los datos directamente a la
ruta.

## Navegación programática

En muchas ocasiones querremos que el navegador sea redireccionado a otra ruta
de forma automática, debido a factores como estar o no logeado, o el resultado
de enviar un formulario. En estos casos tenemos dos alternativas de cómo
hacerlo:

- Si la redirección es debida al estado de la aplicación (por ejemplo: no estar
  logeado), lo más sencillo es devolver un `<Navigate to="...">` como resultado
  del render. Esto hará que el navegador navegue automáticamente a la ruta
  especificada.
- Si la redirección es debida al resultado de un fetch, como por ejemplo al
  enviar los datos de un formulario, no es necesario crear un estado para poder
  hacer el return, sino que podemos utilizar el hook `useNavigate` para obtener
  una función que podemos llamar en cualquier momento para navegar.

Ambos casos se entienden mejor con un ejemplo:

```jsx
// useNavigate:
function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  // Esto no hace nada en este instante, sino que nos devuelve la función que
  // podemos utilizar más adelante (en el callback) para navegar.

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('...', {
      method: 'POST',
      body: JSON.stringify({ username, password}),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (res.ok) {
      // TODO: Guardar data
      navigate('/') // Vamos a la portada
    } else {
      // TODO: Manejo de errores...
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={username} onChange={e => setUsername(e.target.value)} />
      <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Entrar</button>
    </form>
  )
}
```

```jsx
// Navigate:
function MyProfile() {
  const user = useUserInfo()

  if (!user) {
    // No está logeado: redir a Login
    return <Navigate to="/login" />
  }

  return <div>...</div>
}
```

## Para aprender más

React Router trae bastantes más herramientas, tanto componentes como hooks, y
los que hemos mencionado admiten en algunos casos otros parámetros y usos. Para
conocer todos los detalles, lo mejor es ver la
[documentación completa](https://reactrouter.com/docs/en/v6/api).

## A continuación...

Una vez hemos incorporado routing a nuesta aplicación, podemos hacerla crecer
tanto como necesitemos. Sin embargo, puede llegar un momento en el que el paso
de props manual no sea suficiente, y tengamos que empezar a utilizar el
[contexto](./10-context.md).
