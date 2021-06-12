# useAsyncEffekt

## Example

```tsx
import { useAsyncEffect, isMounted, unwrap } from "use-async-effekt";

const App = () => {
  const [user, setUser] = useState<null | User>(null);

  useAsyncEffect(async resolve => {
    const user = await resolve(loadUser());
    if (isMounted(user)) {
      setUser(unwrap(user));
    }
  }, []);

  if (user === null) {
    return <>LOADING</>;
  }

  return <>{user.displayName}</>;
};
```

## Installation

```cmd
# npm
npm i use-async-effekt

# yarn
yarn add use-async-effekt
```
