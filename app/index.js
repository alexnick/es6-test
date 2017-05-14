'use strict';
import Store from './store';
import Template from './template';
import View from './view';
import Controller from './controller';
import './style.scss';

const store = new Store(() => {
  const template = new Template();
  const view = new View(template);
  const controller = new Controller(store, view);
});

