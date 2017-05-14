export default class Controller {
  constructor(store, view) {
    this.store = store;
    this.view = view;
    this.renderParent(this.store.getParentRecords());
    view.bindExpandItem(this.expandParent.bind(this));
  }

  renderParent(data) {
    this.view.showItems(data);
  }

  expandParent(id, target) {
    const children = this.store.getChildrenRecords(id);
    if (!children || children.offer.length < 1) {
      this.view.showEmptyChild(id);
      return;
    }
    this.view.showChildren(children.offer, id);
    this.view.bindDeleteChild(target, id, this.removeItem.bind(this));
    this.view.bindEditChild(target, id, this.editItem.bind(this));
  }

  removeItem(id, childIdx) {
    this.store.removeChild(id, childIdx, children => {
      if (children.offer.length < 1){
        this.view.showEmptyChild(id);
        return;
      }
      this.view.showChildren(children.offer, id);
    });
  }

  editItem(id, childIdx) {
    const vals = this.view.getChildValues(id, childIdx);
    this.store.updateChild(id, childIdx, vals, children => {
      this.view.showChildren(children.offer, id);
    });
  }
}
