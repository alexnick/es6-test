import {readJsonFile} from './helpers';

export default class Store {
	constructor(callback) {
		const localStorage = window.localStorage;

		let parentData;
		let childrenData;

		this.getParentFromLocalStorage = () => {
      return parentData || JSON.parse(localStorage.getItem('parent') || '[]');
    };

		this.getChildrenFromLocalStorage = () => {
      return childrenData || JSON.parse(localStorage.getItem('children') || '[]');
		};

		this.setParentToLocalStorage = (data) => {
      localStorage.setItem('parent', JSON.stringify(parentData = data));
		};

    this.setChildrenToLocalStorage = (data) => {
      localStorage.setItem('children', JSON.stringify(childrenData = data));
    };

		const promiseArr = [];

		if (!localStorage.getItem('parent')){
      promiseArr.push(
        readJsonFile('./data/parent.json')
          .then(text => {
            this.setParentToLocalStorage(JSON.parse(text).offers);
          })
      );
		}

		if (!localStorage.getItem('children')) {
      promiseArr.push(
        readJsonFile('./data/child.json')
          .then(text => {
            this.setChildrenToLocalStorage(JSON.parse(text));
          })
      );
		}

    Promise.all(promiseArr)
			.then(() => {
        if (callback) {
          callback();
        }
			})
			.catch(e => {
				alert(`Error cant load data - ${e}`);
			});
	}

	getParentRecords() {
		return this.getParentFromLocalStorage();
	}

  getChildrenRecords(id) {
    const record = this.getChildrenFromLocalStorage();
		if (record.id === id) return record;
    return null;
  }
//don't understand why child json isn't array of objects and offers has no id's
  removeChild(parentId, childIdx, callback) {
   const childrenObj = this.getChildrenFromLocalStorage();
   if (childrenObj.offer && childrenObj.id === parentId){
    childrenObj.offer.splice(childIdx, 1);
    this.setChildrenToLocalStorage(childrenObj);
    callback(childrenObj);
   }
	}

  updateChild(parentId, childIdx, vals, callback) {
    const childrenObj = this.getChildrenFromLocalStorage();
    if (childrenObj.offer && childrenObj.id === parentId){
      childrenObj.offer[childIdx].properties = Object.assign(childrenObj.offer[childIdx].properties, vals);
      this.setChildrenToLocalStorage(childrenObj);
      callback(childrenObj);
    }
	}
}
