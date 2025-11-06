import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "prosemirror-view/style/prosemirror.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorSchemeScript />
    <Provider store={store}>
      <MantineProvider defaultColorScheme="light">
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
