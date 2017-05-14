import {qs, $delegate} from './helpers';
const _itemId = element => element.getAttribute('data-id');

export default class View {
  constructor(template) {
    this.template = template;
    this.$parentList = qs('.parent-list');
  }

  showItems(items) {
    this.$parentList.innerHTML = this.template.itemList(items);
  }

  showChildren(children, id) {
    const target = qs(`.parent-item-wrapper[data-id="${id}"]`);
    const parentContainer = qs('.parent-container', target);
    parentContainer.innerHTML = this.template.childrenList(children, id);
  }

  bindDeleteChild(target, id, handler) {
    const parentContainer = qs('.parent-container', target);
    $delegate(parentContainer, `.child-item-wrapper[data-id="${id}"] .delete-button`, 'click', ({target}) => {
      handler(id, _itemId(target));
    });
  }

  bindEditChild(parentWrapper, id, handler) {
    const parentContainer = qs('.parent-container', parentWrapper);
    $delegate(parentContainer, `.child-item-wrapper[data-id="${id}"] .save-button`, 'click', ({target}) => {
      handler(id, _itemId(target));
    });
  }

  getChildValues(id, childIdx) {
    const parentWrapper = document.querySelectorAll(`.child-item-wrapper[data-id="${id}"]`)[childIdx];
    const name = qs('.child-name', parentWrapper).value;
    const category = qs('.child-category', parentWrapper).value;
    const description = qs('.child-description', parentWrapper).value.trim();
    const productName = qs('.child-product-name', parentWrapper).value;
    const retailerUrl = qs('.child-url', parentWrapper).value;
    const productBrand = qs('.child-brand', parentWrapper).value;
    const reducedPrice = qs('.child-reduced-price', parentWrapper).value;
    const originalPrice = qs('.child-original-price', parentWrapper).value;
    return { name, category, description, productName, retailerUrl, productBrand,
      reducedPrice : {
        amount: reducedPrice
    },
      originalPrice: {
        amount: originalPrice
      }};
  }

  showEmptyChild(id) {
    const target = qs(`.parent-item-wrapper[data-id="${id}"]`);
    const parentContainer = qs('.parent-container', target);
    parentContainer.innerHTML = this.template.emptyChild();
  }

  bindExpandItem(handler) {
    $delegate(this.$parentList, '.parent-list > .parent-item-wrapper > button', 'click', ({target}) => {
      const parentItemWrapper = target.parentElement;
      handler(_itemId(parentItemWrapper), parentItemWrapper);
    });
  }
}
