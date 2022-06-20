# JSX

En este tema aprenderemos todo sobre JSX, el lenguaje en el que se escriben
los componentes en React. También veremos algunas cosas importantes
para poder escribir nuestro código.

## Qué es JSX

La mayoría de sistemas de plantillas mezclan HTML con etiquetas especiales para
añadir comportamiento, como hacía Handlebars en el ejemplo del anterior tema, o
PHP para el lado servidor. En React se trabaja con esta idea, mezclando HTML
con Javascript. Esta mezcla se denomina JSX. Sin embargo, aunque se parezca al
código HTML tradicional, es importante tener presente que el resultado es
código Javascript, y por tanto habrá algunas diferencias.

Veamos un ejemplo:

```jsx
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

## Reglas de JSX

A la hora de escribir JSX, debemos seguir estas reglas:

- **¿Dónde puedo escribir JSX?**\
  En cualquier lugar donde pueda ir un valor. Habitualmente va en el _return_
  de nuestros componentes, pero puede asignarse a una variable, o incluso
  pasarse como parámetro, aunque es poco común.

  ```jsx
  const Login = () => {
    const action = <button>Entrar</button>
    // ...
    return (
      <div id="login-widget">
        Ya tienes cuenta? {action}
      </div>
    )
  }
  ```

- **Valores dinámicos**\
  Simplemente van entre llaves `{}`, tanto si son contenido, como si son
  atributos. En este último caso, los atributos tiene que ser enteros texto
  estático entre comillas, o enteros un valor dinámico entre llaves. Si es
  necesario mezclar las dos cosas, puede fabricarse un string concatenando.

  ```jsx
  const status = 'active'
  const user = 'Alice'

  const Welcome = () => {
    return (
      <div id="welcome" className={'my-component ' + status}>
        ¡Hola, {user}!
      </div>
    )
  }
  ```

- **¿Por qué _className_?**\
  Porque _class_ es una palabra reservada en Javascript, y por tanto se decidió
  utilizar _className_ en su lugar.

  ¡Ojo a las mayúsculas! Todos los atributos se escriben obligatoriamente en
  _camelCase_.

- **Condicionales y bucles**\
  Dentro del JSX podemos utilizar cualquier _valor_ de Javascript, incluyendo
  variables, llamadas a funciones, etc., pero no podemos utilizar _sentencias_
  como `if` o `for`. Sin embargo, existen alternativas para ambos casos, como
  el _condicional ternario_ o la función _map_. Por ejemplo:

  ```jsx
  const isLoggedIn = true
  const username = 'Alice'

  function User() {
    return (
      <div id="user-panel">
        {isLoggedIn ? <span>Hi, {username}</span> : <button>Log in</button>}
      </div>
    )
  }


  const provinces = ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra']

  function Picker() {
    return (
      <div>
        Selecciona una provincia:
        <ul>
          {provinces.map(prov =>
            <li key={prov}>{prov}</li>
          )}
        </ul>
      </div>
    )
  }
  ```

  _Importante_: Siempre que utilizamos map, el elemento más exterior que se
  devuelve para cada iteración tiene que llevar obligatoriamente un atributo
  _key_ cuyo valor debe ser diferente para todos los elementos del map.
  Habitualmente se utiliza un id o un texto, o como último recurso, el índice
  del map.

  En lugar del ternario, también podemos utilizar `&&` cuando sólo queremos
  condicionar el mostrar algo a que se cumpla alguna condición, o `||` para
  proporcionar valores por defecto.

- **Sintaxis _diamante_**\
  Siempre que escribimos un bloque de JSX, tiene que haber una etiqueta que
  envuelva todo (como los `div` de los ejemplos anteriores). Pero en ocasiones
  queremos tener dos etiquetas "hermanas", una al lado de la otra, sin
  envolverlas en nada. Si lo intentamos sin más, nos va a dar un error. Para
  cubrir este caso, podemos envolver estas etiquetas en una etiqueta "vacía",
  que no generará ningún HTML, pero nos permite envolver otras etiquetas para
  que nuestro código sea válido.

  ```jsx
  // Esto no es válido: hay dos etiquetas hermanas no envueltas por otra.
  return (
    <span>Uno</span>
    <span>Uno</span>
  )

  // Esta es la forma legal. El diamante envuelve los dos span,
  // por lo que hay una única etiqueta raíz.
  return (
    <>
      <span>Uno</span>
      <span>Uno</span>
    </>
  )
  ```

- **El atributo _style_**\
  Este atributo es uno de los casos especiales cuyo comportamiento es diferente
  al resto. El _style_ en html es un texto que puede incluir múltiples reglas
  CSS, pero esto generaba problemas en React relacionados con el orden y la
  detección, por lo que se decidió que esas mismas reglas se especifiquen como
  un objeto. En dicho objeto los nombres de propiedades CSS se deben escribir
  en _camelCase_.

  Por ejemplo:
  ```jsx
  function Big() {
    const bigStyle = {
      fontSize: '40px',
      fontWeight: 'bold'
    }
    return <div style={bigStyle}>Big</div>
  }
  ```

## Temas relacionados

Cuando trabajamos con JSX, hay algunos temas que es importante conocer:

- **Utilizando CSS**\
  Existen varias alternativas para estilar nuestras aplicaciones React. Por
  ahora vamos a utilizar CSS, que todos conocemos, y es de las opciones más
  sencillas.

  Para aplicar un fichero CSS tan sólo es necesario importarlo:

  ```jsx
  import './Ejemplo.css'
  ```

  Esto hará que el contenido de `Ejemplo.css` se añada al CSS **global** de
  nuestra aplicación, y tendrá efecto en todas partes, no sólo en el fichero
  donde se ha importado. Por esto es importante tratar de utilizar clases
  suficientemente específicas para evitar colisiones.

- **Utilizando imágenes, estáticos, ...**\
  Cuando queramos utilizar un recurso estático desde nuestra aplicación, como
  podría ser una imagen, lo más aconsejable es importarlo mediante `import`, y
  utilizar el valor que obtenemos como ruta a la hora de referirnos a él. Por
  ejemplo:

  ```jsx
  import logo from './logo.png'

  function Header() {
    return (
      <header>
        <img className="logo" src={logo} />
      </header>
    )
  }
  ```

  El propio sistema de build montado por CRA se ocupará de copiar el fichero
  a su ubicación final, poner la ruta correcta en cada lugar, y gestionar la
  caché del navegador para que todos los usuarios vean siempre la última
  versión, pero se cachee de forma óptima.

## A continuación...

Una vez tenemos claro todo acerca de JSX, es hora de empezar a pensar en
[componentes](./04-components.md).
